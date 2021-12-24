<template>
    <div class="v-catalog">
        <div class="v-catalog_test-filters">
            
        </div>
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
export default {
    name: 'v-catalog',
    components: {
        VCatalogItem

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
.v-catalog_test-filters {
    height: 46px;
    border-bottom: solid 1px rgb(226, 226, 226);
}
</style>