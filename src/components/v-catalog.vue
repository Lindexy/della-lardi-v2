<template>
    <div class="v-catalog">
        <v-filters/>
        <div class="v-catalog_cards">
            <v-catalog-item
            v-for="card in cards"
            :key="card.name"
            v-bind:card_data="card"
            />
        </div>
        
    </div>
</template>
<script>
import VCatalogItem from './v-catalog-item.vue'
import VFilters from './v-filters.vue'
export default {
    name: 'v-catalog',
    components: {
        VCatalogItem,
        VFilters,

    },
    data() {
        return {
            cards: [
                {
                    name: 'qqww',
                    price: '123'
                },
                {
                    name: 'ert',
                    price: '12533'
                }
            ]
        }
    }
}
</script>
<style>
.v-catalog {
    width: 100%;
}
.v-catalog_cards {
    display: flex;
}
</style>