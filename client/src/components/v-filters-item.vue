<template>
  <div class="v-filters-item">
    <select name="" id="">
      <option value="qq">qq</option>
      <option value="22">ww</option>
    </select>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style scoped>
.v-filters-item {
  display: flex;
  padding: 11px;
  border-radius: 5px;
}
.v-filters-item:hover {
  background-color: rgb(226, 226, 226);
  cursor: pointer;
}
select {
  padding: 5px;
  border: 0;
  border-radius: 5px;
  background-image: linear-gradient(45deg, transparent 50%, gray 50%);
  /* background: url(../assets/arrow.png) no-repeat right #ddd; */
  /* -webkit-appearance: none; */
  /* background-color: rgb(226, 226, 226); */
  background-position-x: 244px;
}
</style>