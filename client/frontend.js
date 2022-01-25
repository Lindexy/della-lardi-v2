const App = {
    data() {
        return {
            search: '',
            exclusion: '',
            serverSettings: {},
            cards: [],
            showAddedCards: false,
            filters: {
                PDV: false,
                BG: false,
                komb: false,
                minPrice: 0
            }
        }
    },
    methods: {
        async serverSettingsChek() {
            this.serverSettings = await request('api/settings')
        },
        async serverSettingsUpdate() {
            await request('api/settings', 'POST', this.serverSettings)
        },
        async updateCard(i) {
            for (let item of this.cards) {
                if (item._id == this.filteredCards[i]._id) {
                    item.agreedPub = !item.agreedPub;
                    await request('api/cards/update', 'POST', item);
                    break;
                }
            }
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
        async deleteClosedCards() {
            await request('api/cards/delete');
            updateAllCards();
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
            let filtered = this.cards.filter(function (card) {
                return JSON.stringify(card).toLowerCase().indexOf(self.search.toLowerCase()) > -1
            })
            if (this.showAddedCards) {
                filtered = filtered.filter(e => e.agreedPub)
            } else {
                if (!this.filters.PDV) {
                    filtered = filtered.filter(e => !e.payment.includes('ПДВ'))
                }
                if (!this.filters.BG) {
                    filtered = filtered.filter(e => !e.payment.includes('Б/г'))
                }
                if (!this.filters.komb) {
                    filtered = filtered.filter(e => !e.payment.includes('Комбінов'))
                }
                if (this.exclusion) {
                    let arr = this.exclusion.split(', ')
                    for (let i = 0; i < arr.length; i++) {
                        filtered = filtered.filter(e => !e.contentName.includes(arr[i]))
                    }
                }
                filtered = filtered.filter(e => +e.paymentPrice > this.filters.minPrice)
            }


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