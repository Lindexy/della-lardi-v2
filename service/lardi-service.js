const axios = require('axios');

async function lardiRequest(currentCard, type) {
    const preparedCard = preparepreparedCard(currentCard);

    let headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": process.env.LARDI_KEY
    }

    switch (type) {
        case 'add':
            await axios.post('https://api.lardi-trans.com/v2/proposals/my/add/cargo', JSON.stringify(preparedCard), { headers })
                .then(result => card.updateOne({ idDella: currentCard.idDella }, { needToUpdate: false, published: true, idLardi: result.data.id }))
                .catch(res => console.log(res.response, preparedCard))
            break;
        case 'change':
            console.log('try to update card...');
            await axios.put('https://api.lardi-trans.com/v2/proposals/my/cargo/published/' + currentCard.idLardi, JSON.stringify(preparedCard), { headers })
                .then(res => card.updateOne({ idDella: currentCard.idDella }, { needToUpdate: false }))
                .catch(res => console.log(res.response.data, preparedCard))
            break;
        case 'delete':
            await axios.post('https://api.lardi-trans.com/v2/proposals/my/basket/throw', JSON.stringify({ cargoIds: [currentCard.idLardi] }), { headers })
                .then(res => card.updateOne({ idDella: currentCard.idDella }, { needToUpdate: false, published: false, idLardi: '' }))
                .catch(res => console.log(res.response.data, currentCard.idLardi))
    }
}

function preparepreparedCard(currentCard) {
    const preparedCard = {
        dateFrom: currentCard.dateFrom,
        contentName: currentCard.contentName,
        waypointListSource: currentCard.waypointListSource,
        waypointListTarget: currentCard.waypointListTarget,
    }

    if (currentCard.dateTo) { preparedCard.dateTo = currentCard.dateTo }
    else { preparedCard.dateTo = currentCard.dateFrom }
    if (currentCard.sizeMassTo) { preparedCard.sizeMassTo = currentCard.sizeMassTo }
    if (currentCard.sizeMassFrom) { preparedCard.sizeMassFrom = currentCard.sizeMassFrom }
    if (currentCard.sizeVolumeTo) { preparedCard.sizeVolumeTo = currentCard.sizeVolumeTo }
    if (currentCard.sizeVolumeFrom) { preparedCard.sizeVolumeFrom = currentCard.sizeVolumeFrom }
    if (currentCard.paymentPrice) { preparedCard.paymentPrice = currentCard.paymentPrice }
    if (currentCard.paymentCurrencyId) { preparedCard.paymentCurrencyId = currentCard.paymentCurrencyId }

    if (currentCard.note) { preparedCard.note = currentCard.note.substring(0, 40); }

    if (currentCard.loadTypes) {
        preparedCard.loadTypes = [];
        if (currentCard.loadTypes.includes('Зверху')) {
            preparedCard.loadTypes.push(24)
        }
        if (currentCard.loadTypes.includes('Збоку')) {
            preparedCard.loadTypes.push(25)
        }
        if (currentCard.loadTypes.includes('Задня')) {
            preparedCard.loadTypes.push(26)
        }
    }

    if (currentCard.payment) {
        if (currentCard.payment.includes('При розвантаженні')) {
            preparedCard.paymentMomentId = '4';
        } else if (currentCard.payment.includes('При завантаженні')) {
            preparedCard.paymentMomentId = '2';
        }
        if (currentCard.payment.includes('На картку')) {
            preparedCard.paymentTypeId = '10';
        } else if (currentCard.payment.includes('Б/г')) {
            preparedCard.paymentTypeId = '4';
        } else if (currentCard.payment.includes('Готівка')) {
            preparedCard.paymentTypeId = '2';
        } else if (currentCard.payment.includes('Софт')) {
            preparedCard.paymentTypeId = '10';
        }
    }


    let carTypes = {
        'тент': '34',
        'рефрижератор': '32',
        'тагач': '70',
        'ізотерм': '25',
        'цільнометал.': '36',
        'автовоз': '20',
        'бортова': '63',
        'зерновоз': '26',
        'контейнеровіз': '28',
        'лісовоз': '42',
        'негабарит': '30',
        'платформа': '64',
        'самоскид': '33',
        'трал': '30',
        'мікроавтобус': '57',
        'контейнер пустий': '27',
        'металовіз (ломовіз)': '69',
        'щеповіз': '26',
        'скловіз': '58'
    }
    switch (currentCard.bodyTypeId) {
        case 'будь-яка':
            preparedCard.bodyGroupId = '1';
            break;
        case 'крита':
            preparedCard.bodyGroupId = '1';
            break;
        case 'відкрита':
            preparedCard.bodyGroupId = '2';
            break;
        default:
            for (let key in carTypes) {
                if (key === carType) {
                    preparedCard.bodyTypeId = carTypes[key];
                    break;
                }
            }
    }

    return preparedCard
}

module.exports = lardiRequest;