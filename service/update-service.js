const card = require("../models/card");
const getPageContent = require("./scraper/puppeteer");
const LardiRequester = require("./lardi-service");

async function updateData() {
  try {
    // Видаляємо всі опубліковані і закриті заявки
    let cardsToDelete = await card.find({ published: true });
    cardsToDelete.forEach((item) => {
      if (item.closed || !item.agreedPub) {
        LardiRequester.delete(item);
      }
    });

    // Відправляємо заявки на Ларді
    let cardsToPublish = await card.find({
      needToUpdate: true,
      agreedPub: true,
      published: false,
    });
    cardsToPublish.forEach((item) => {
      LardiRequester.add(item);
    });

    // Оновлюємо заявки
    let cardsToUpdate = await card.find({
      needToUpdate: true,
      agreedPub: true,
      published: true,
    });
    cardsToUpdate.forEach((item) => {
      LardiRequester.update(item);
    });

    // Всі не закриті заявки відправляємо на перевірку актуальності
    let cardsToCheck = await card.find({ closed: false });
    for (let i = 0; i < cardsToCheck.length / 200; i++) {
      // Ділимо на куски по 200 (обмеження Делли)
      let bunch = cardsToCheck.slice(i * 200, i * 200 + 200);
      let ids = bunch.map((item) => item.idDella);

      // Получаємо інфу з Делли
      let result = await getPageContent(
        "https://della.com.ua/my/selected/",
        ids
      );
      if (!result) {
        console.log("no data from della");
        return;
      }

      bunch.forEach(async (bunchItem) => {
        const currentCard = result.find(
          (item) => item.idDella === bunchItem.idDella
        );
        if (currentCard) {
          // заявка є, пробуємо її обновити в БД
          const res = await card.updateOne(
            { idDella: currentCard.idDella },
            currentCard
          );
          // якщо є зміни, і заявка опублікована вказуємо що треба обновити
          if (res.modifiedCount > 0 && bunchItem.published) {
            await card.updateOne(
              { idDella: bunchItem.idDella },
              { needToUpdate: true }
            );
            console.log("card updated: " + bunchItem.idDella);
          }
        } else {
          // заявки нема на Деллі, позначаємо в БД як закриту
          await card.updateOne(
            { idDella: bunchItem.idDella },
            { closed: true }
          );
          console.log("Deleted, mark as closed " + bunchItem.idDella);
        }
      });
    }

    // Повтор заявок на Ларді
    LardiRequester.repeat();
  } catch (error) {
    console.log(error);
  }
}

module.exports = updateData;
