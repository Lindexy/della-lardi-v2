const App = {
    data() {
        return {
            search: '',
            serverSettings: {},
            cards: [],
        }
    },
    methods: {
        async serverSettingsChek() {
            this.serverSettings = await request('api/settings')
        },
        async serverSettingsUpdate() {
            let response = await request('api/settings', 'POST', this.serverSettings)
        },
        async updateCard(i) {
            this.cards[i].agreedPub = !this.cards[i].agreedPub;
            let response = await request('api/cards/update', 'POST', this.cards[i])
        },
        async deleteAllCards() {
            console.log('function not done')
        },
    },
    async mounted() {
        this.cards = await request('api/cards');
        this.serverSettingsChek();

        
    }
}

Vue.createApp(App).mount('#app')

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