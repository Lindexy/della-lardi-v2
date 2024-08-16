const Card = require("../models/card");
const getPageContent = require("./scraper/puppeteer");
const LardiRequester = require("./lardi-service");

async function updateData() {
  try {
    // Видаляємо всі опубліковані і закриті заявки
    let CardsToDelete = await Card.find({ published: true });
    CardsToDelete.forEach((item) => {
      if (item.closed || !item.agreedPub) {
        LardiRequester.delete(item);
      }
    });

    // Відправляємо заявки на Ларді
    let CardsToPublish = await Card.find({
      needToUpdate: true,
      agreedPub: true,
      published: false,
    });
    CardsToPublish.forEach((item) => {
      LardiRequester.add(item);
    });

    // Оновлюємо заявки
    let CardsToUpdate = await Card.find({
      needToUpdate: true,
      agreedPub: true,
      published: true,
    });
    CardsToUpdate.forEach((item) => {
      LardiRequester.update(item);
    });
    
    // Всі не закриті заявки відправляємо на перевірку актуальності
    let CardsToCheck = await Card.find({ closed: false });    
    await checkUpdates(CardsToCheck);

    // Повтор заявок на Ларді
    LardiRequester.repeat();
  } catch (error) {
    console.log(error);
  }
}

async function checkUpdates(orders) {
    // Получаємо інфу з Делли
    let result = await getPageContent();
    // console.log(result);
    
    if (!result) {
      console.log("no data from della");
      return;
    }

    orders.forEach(async (order) => {
      const currentCard = result.find(
        (item) => item.idDella === order.idDella
      );
      
      if (currentCard) {
        // заявка є, пробуємо її обновити в БД
        const res = await Card.updateOne(
          { idDella: currentCard.idDella },
          currentCard
        );
        // якщо є зміни, і заявка опублікована вказуємо що треба обновити
        if (res.modifiedCount > 0 && order.published) {
          await Card.updateOne(
            { idDella: order.idDella },
            { needToUpdate: true }
          );
          console.log("Card updated: " + order.idDella);
        }
      } else {
        // заявки нема на Деллі, позначаємо в БД як закриту
        await Card.updateOne(
          { idDella: order.idDella },
          { closed: true }
        );
        console.log("Deleted, mark as closed " + order.idDella);
      }
    });
  
}

module.exports = updateData;
