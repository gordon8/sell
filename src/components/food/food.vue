<template>
  <transition name="move">
    <div v-show="foodShow" class="food-wrap">
      food

    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "food",
    props: {
      selectedFood: {
        type: Object
      }
    },
    data() {
      return {
        foodShow: false,
      }
    },
    methods: {
      show() {
        this.foodShow = true;
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss" type="text/scss">
  .food-wrap {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 48px;
    display: block;
    background-color: #fff;
    z-index: 50;
    transform: translate3d(0, 0, 0);
    &.move-enter-active, &.move-leave-active {
      transition: all 0.3s linear;
    }
    &.move-enter, &.move-leave-to {
      transform: translate3d(100%, 0, 0);
    }
  }
</style>