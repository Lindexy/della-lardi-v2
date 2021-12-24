<template>
    <div class="v-catalog-item">
        {{ card_data.name }}
    </div>
</template>

<script>
export default {
    name: 'v-catalog-item',
    props: {
        card_data: {
            type: Object,
            default() {
                return {}
            }
        }
    }
}
</script>

<style scoped>
.v-catalog-item {
    width: 500px;
    height: 100px;
    border: solid 1px rgb(226, 226, 226);
    border-radius: 5px;
    margin: 5px;
}
</style>