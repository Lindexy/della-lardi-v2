<template>
  <div class="v-filters">
    <v-filters-item v-for="filter in allFilters" :key="filter.id" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import VFiltersItem from "./v-filters-item.vue";
export default {
  name: "v-filters",
  computed: mapGetters(["allCards", "allFilters"]),
  methods: mapActions(["fetchCards"]),
  async mounted() {
    this.fetchCards();
    this.allFilters();
  },
  components: {
    VFiltersItem,
  },
};
</script>

<style scoped>
.v-filters {
  padding: 5px;
  display: flex;
  border-bottom: solid 1px rgb(226, 226, 226);
}
</style>