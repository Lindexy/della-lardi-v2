import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.esm.browser.js'

async function getCards() {
    let myFistCard = await request('/api/cards');
    console.log(myFistCard);
}
getCards()


var app4 = new Vue({
    el: '#app-4',
    data() {
        return {
            cards: []
        }
    },
    async mounted() {
        this.loading = true
        this.cards = await request('/api/cards')
        this.loading = false
      }
})


async function request(url, method = 'GET', data = null) {
    try {
        const headers = {}
        let body

        if (data) {
        headers['Content-Type'] = 'application/json'
        body = JSON.stringify(data)
        }

        const response = await fetch(url, {
        method,
        headers,
        body
        })
        return await response.json()
    } catch (e) {
        console.warn('Error:', e.message)
    }
}