import { createStore } from 'vuex'
import cards from './modules/cards.js';

const store = createStore({
    modules: {
        cards
    }
});

export default store;