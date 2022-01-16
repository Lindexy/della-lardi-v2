const card = require('../models/card');
const getPageContent = require('./scraper/puppeteer');

async function updateData() {
    console.log('updating...')
    let data = await card.find({ closed: false });

    for (let i = 0; i < data.length / 200; i++) {
        let arr = data.slice(i * 200, (i * 200) + 200);
        let arr2 = [];
        for (let j = 0; j < arr.length; j++) {
            arr2.push(arr[j].idDella)
        }

        let result = await getPageContent('https://della.com.ua/my/selected/', arr2);
        for (let k = 0; k < arr.length; k++) {
            let currentCard = result.find(item => item.idDella === arr[k].idDella);
            if (currentCard !== undefined) { // карта є на Деллі
                let response1 = await card.updateOne({ idDella: currentCard.idDella }, currentCard)
                if (response1.modifiedCount > 0 && arr[k].published) {
                    await card.updateOne({ idDella: arr[k].idDella }, { needToUpdate: true })
                    console.log('card updated: ' + arr[k].idDella)
                }
            } else { //карти нема на Деллі
                await card.updateOne({ idDella: arr[k].idDella }, { closed: true });

                console.log('Deleted, mark as closed ' + arr[k].idDella)
            }
        }
    }
    console.log('updaiting end!')
}

module.exports = updateData;

