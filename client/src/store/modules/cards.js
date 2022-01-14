export default {
    actions: {
        async fetchCards(ctx) {
            const res = await fetch(
                'https://jsonplaceholder.typicode.com/posts?_limit=3'
            );
            const cards = await res.json();

            ctx.commit('updateCards', cards)
        }
    },
    mutations: {
        updateCards(state, cards) {
            state.cards = cards
        }
    },
    state: {
        cards: [],
        filters: [
            {
                id: '1',
                values: [
                    'Всі',
                    'Видалені'
                ],
                currentValue: 'Всі'
            }
        ]
    },
    getters: {
        allCards(state) {
            return state.cards
        },
        allFilters(state) {
            return state.filters
        }
    },


}