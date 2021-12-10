const App = {
    data() {
        return {
            search: '',
            serverSettings: {},
            cards: [],
            shownCards: [],
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
        async updateAllCards() {
            let data = await request('api/cards');
            for (let i = 0; i < data.length; i++) {
                if (this.cards.some(item => item.idDella === data[i].idDella)) {
                } else {
                    
                    this.cards.push(data[i]);
                    
                }
            }
            console.log('updeted');
        },
        async updateAllCardsV2() {
            this.cards = await request('api/cards');
        },
        async deleteAllCards() {
            let test = JSON.stringify(this.cards[0])
            console.log(test)
        },
        parseWaypoint(arr) {
            let result = ''
            for (let i = 0; i < arr.length; i++) {
                result += arr[i].townName + '   '
            }
            return result
        }
    },
    computed: {
        filteredCards() {
            let self = this
            const filtered = this.cards.filter(function(card) {
                return JSON.stringify(card).toLowerCase().indexOf(self.search.toLowerCase()) > -1
            })
            return filtered
        }
    },
    async mounted() {
        this.updateAllCardsV2()
        const timer = setInterval(() => {
            this.updateAllCardsV2();
          }, 10000);

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