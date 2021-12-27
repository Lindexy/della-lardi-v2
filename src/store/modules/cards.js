export default {
    actions:{
        async fetchCards(ctx) {
            const res = await fetch(
                'https://jsonplaceholder.typicode.com/posts?_limit=3'
            );
            const cards = await res.json();
            
            ctx.commit('updateCards', cards)
        }
    },
    mutations:{
        updateCards(state, cards) {
            state.cards = cards
        }
    },
    state:{
        testvalue: 'qqww',
        cards: ['1', '2', '3']
    },
    getters:{
        allCards(state) {
            return state.cards
        }
    },
    
    
}