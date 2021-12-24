<template>
    <div class="v-main-wrapper">
        <v-nav/>
        <div class="main">
            <v-left-menu/>
            <v-catalog/>
        </div>
    </div>
</template>

<script>
import vCatalog from './v-catalog.vue'
import VLeftMenu from './v-left-menu.vue'
import vNav from './v-nav.vue'

export default {
    components: { vCatalog, vNav, VLeftMenu },
    name: 'v-main-wrapper',
    data() {
        return {
            message: 'qq owj'
        }
    }
}
</script>

<style>
body {
    margin: 0px;
    color: #5f6368;
}
.main {
    display: flex;
    justify-content: flex-start
}
.v-main-wrapper {
    margin: 0 auto;
}
h1 {
    color: red;
}
</style>