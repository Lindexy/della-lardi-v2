const axios = require("axios");
const card = require("../models/card");

class LardiRequester {
  async add(currentCard) {
    try {
      const cardInfo = prepareCard(currentCard);
      const result = await axios.post(
        "https://api.lardi-trans.com/v2/proposals/my/add/cargo",
        JSON.stringify(cardInfo),
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: process.env.LARDI_KEY,
          },
        }
      );
      await card.updateOne(
        { idDella: currentCard.idDella },
        { needToUpdate: false, published: true, idLardi: result.data.id }
      );
    } catch (errors) {
      console.log(errors.response.data);
      if (errors.response) {
        console.log(errors + ": " + currentCard.idDella);
      } else {
        console.log(errors);
      }
    }
  }
  async update(currentCard) {
    try {
      const cardInfo = prepareCard(currentCard);
      const result = await axios.put(
        "https://api.lardi-trans.com/v2/proposals/my/cargo/published/" + currentCard.idLardi,
        JSON.stringify(cardInfo),
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: process.env.LARDI_KEY,
          },
        }
      );
      await card.updateOne(
        { idDella: currentCard.idDella },
        { needToUpdate: false, published: true, idLardi: result.data.id }
      );
    } catch (errors) {
      if (errors.response) {
        console.log(errors.response.data.message + ": " + currentCard.idDella);
      } else {
        console.log(errors);
      }
    }
  }
  async delete(currentCard) {
    try {
      const result = await axios.post(
        "https://api.lardi-trans.com/v2/proposals/my/basket/throw",
        JSON.stringify({ cargoIds: [currentCard.idLardi] }),
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: process.env.LARDI_KEY,
          },
        }
      );
      await card.updateOne(
        { idDella: currentCard.idDella },
        { needToUpdate: false, agreedPub: false, published: false, idLardi: "" }
      );
    } catch (errors) {
      if (errors.response) {
        console.log(errors.response.data.message + ": " + currentCard.idDella);
      } else {
        console.log(errors);
      }
    }
  }
  async repeat() {
    try {
      const result = await axios.get("https://api.lardi-trans.com/v2/proposals/my/cargoes/published", {
        headers: { Accept: "application/json", Authorization: process.env.LARDI_KEY },
      });
      const ids = [];
      result.data.content.forEach((element) => {
        if (Date.now() - element.dateRepeat > 3600000) {
          ids.push(element.id);
        }
      });
      if (ids.length > 0) {
        await axios.post("https://api.lardi-trans.com/v2/proposals/my/repeat", JSON.stringify({ cargoIds: ids }), {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: process.env.LARDI_KEY,
          },
        });
      }
    } catch (errors) {
      if (errors.response) {
        console.log(errors.response.data);
      } else {
        console.log(errors);
      }
    }
  }
}

function prepareCard(currentCard) {
  const preparedCard = {
    dateFrom: currentCard.dateFrom,
    contentName: currentCard.contentName,
    waypointListSource: currentCard.waypointListSource,
    waypointListTarget: currentCard.waypointListTarget,
  };

  if (currentCard.dateTo) {
    preparedCard.dateTo = currentCard.dateTo;
  } else {
    preparedCard.dateTo = currentCard.dateFrom;
  }
  if (currentCard.sizeMassTo) {
    preparedCard.sizeMassTo = currentCard.sizeMassTo;
  }
  if (currentCard.sizeMassFrom) {
    preparedCard.sizeMassFrom = currentCard.sizeMassFrom;
  }
  if (currentCard.sizeVolumeTo) {
    preparedCard.sizeVolumeTo = currentCard.sizeVolumeTo;
  }
  if (currentCard.sizeVolumeFrom) {
    preparedCard.sizeVolumeFrom = currentCard.sizeVolumeFrom;
  }
  if (currentCard.paymentPrice) {
    preparedCard.paymentPrice = currentCard.paymentPrice;
  }
  if (currentCard.paymentCurrencyId) {
    preparedCard.paymentCurrencyId = currentCard.paymentCurrencyId;
  }
  if (currentCard.sizeLength) {
    preparedCard.sizeLength = currentCard.sizeLength;
  }
  if (currentCard.sizeWidth) {
    preparedCard.sizeWidth = currentCard.sizeWidth;
  }
  if (currentCard.sizeHeight) {
    preparedCard.sizeHeight = currentCard.sizeHeight;
  }

  if (currentCard.note) {
    preparedCard.note = currentCard.note.substring(0, 40);
  }

  if (currentCard.loadTypes) {
    preparedCard.loadTypes = [];
    if (currentCard.loadTypes.includes("Зверху")) {
      preparedCard.loadTypes.push(24);
    }
    if (currentCard.loadTypes.includes("Збоку")) {
      preparedCard.loadTypes.push(25);
    }
    if (currentCard.loadTypes.includes("Задня")) {
      preparedCard.loadTypes.push(26);
    }
  }

  if (currentCard.payment) {
    const params = {};

    if (currentCard.payment.includes("При розвантаженні")) {
      preparedCard.paymentMomentId = "4";
    } else if (currentCard.payment.includes("При завантаженні")) {
      preparedCard.paymentMomentId = "2";
    }
    if (currentCard.payment.includes("ПДВ")) {
      params.vat = true;
    }
    if (currentCard.payment.includes("На картку")) {
      params.id = "10";
    } else if (currentCard.payment.includes("Безготівковий")) {
      params.id = "4";
    } else if (currentCard.payment.includes("Готівка")) {
      params.id = "2";
    } else if (currentCard.payment.includes("Софт")) {
      params.id = "10";
    }
    else if (currentCard.payment.includes("Комбінов.")) {
      // params.id = "10";
    }

    preparedCard.paymentForms = [params];
  }

  let carTypes = {
    тент: ["34"],
    бус: ["23"],
    рефрижератор: ["32"],
    тагач: ["70"],
    ізотерм: ["25"],
    "цільнометал.": ["36"],
    автовоз: ["20"],
    бортова: ["63"],
    зерновоз: ["26"],
    контейнеровіз: ["28"],
    лісовоз: ["42"],
    негабарит: ["30"],
    платформа: ["64"],
    самоскид: ["33"],
    трал: ["30"],
    мікроавтобус: ["57"],
    "контейнер пустий": ["27"],
    "металовіз (ломовіз)": ["69"],
    щеповіз: ["26"],
    скловіз: ["58"],
    мебльовіз: ["34"],
    крита: ["34", "25"],
    відкрита: ["63", "64"],
    "будь-яка": ["34", "25", "36", "28", "23"],
  };
  for (let key in carTypes) {
    if (key === currentCard.bodyTypeId) {
      preparedCard.cargoBodyTypeIds = carTypes[key];
      break;
    }
  }
  // switch (currentCard.bodyTypeId) {
  //   case "будь-яка":
  //     preparedCard.bodyGroupId = "1";
  //     break;
  //   case "крита":
  //     preparedCard.bodyGroupId = "1";
  //     break;
  //   case "відкрита":
  //     preparedCard.bodyGroupId = "2";
  //     break;
  //   default:
  //     for (let key in carTypes) {
  //       if (key === currentCard.bodyTypeId) {
  //         cargoBodyTypeIds = carTypes[key];
  //         break;
  //       }
  //     }
  // }

  return preparedCard;
}

module.exports = new LardiRequester();
