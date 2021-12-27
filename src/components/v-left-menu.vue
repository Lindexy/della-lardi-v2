<template>
<div class="v-left-menu">
    <div class="v-left-menu_all-cards">
        Всі заявки
    </div>
    <div class="v-left-menu_added-cards">
        Добавлені заявки
    </div>
    <div class="v-left-menu_filtered-cards">
        Відфільтровані заявки
    </div>
    <div class="v-left-menu_closed-cards">
        Закриті заявки
    </div> 
</div>
    
</template>

<script>
export default {
    name: 'v-left-menu'
}
</script>

<style scoped>
    .v-left-menu {
        width: 256px;
        min-height: 300px;
        flex-shrink: 0;
        border-right: solid 1px rgb(226, 226, 226);
    }
    .v-left-menu div {
        padding: 11px 30px;
        border-radius: 0 20px 20px 0;
        cursor: pointer;
      
    }
    .v-left-menu div:hover {
        background-color: rgb(226, 226, 226);
    }
</style>