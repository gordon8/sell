<template>
  <div class="star">
    <span v-for="item in itemClass" :class="['star-item', item]"></span>
  </div>
</template>

<script>
  export default {
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      starType() {
        return 'star-' + this.size;
      },
      itemClass() {
        let result = [];
        let

        return result;
      }
    }
  }
</script>

<style scoped>

</style>
