<template>
    <div class="v-filters" v-for="card in allCards" :key="card.id">
        <div class="v-filters_item" >
        </div>
        <div class="v-filters_item">
            Filter 2
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
    name: 'v-filters',
    computed: mapGetters(['allCards']),
    methods: mapActions(['fetchCards']),
    async mounted() {
        this.fetchCards
    }
}
    
</script>

<style scoped>
.v-filters {
    height: 46px;
    display: flex;
    border-bottom: solid 1px rgb(226, 226, 226);
}
.v-filters_item {
    padding: 14px;
    margin: 0 20px;
}
</style>