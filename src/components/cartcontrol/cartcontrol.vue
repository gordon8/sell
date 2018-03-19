<template>
  <div class="cart-control">
    <transition name="move">
      <div class="cart-decrease">
        <i @click="removeCount" v-if="food.count > 0" class="inner iconfont icon-removecircle"></i>
      </div>
    </transition>
    <span v-if="food.count > 0" class="add-num">{{food.count}}</span>
    <i @click="addCount" class="iconfont icon-addcircle"></i>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  export default {
    name: "cartcontrol",
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCount: function () {
        if (this.food.count) {
          this.food.count++;
        } else {
          Vue.set(this.food, 'count', 1);
        }
      },
      removeCount: function () {
        this.food.count--;
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss" type="text/scss">
  @import "../../common/css/iconfont.css";

  .cart-control {
    position: absolute;
    right: 0;
    bottom: 6px;
    font-size: 0;
    .add-num {
      display: inline-block;
      padding-top: 6px;
      width: 12px;
      text-align: center;
      font-size: 10px;
      line-height: 24px;
      vertical-align: top;
      color: rgb(147, 153, 159);
    }
    .cart-decrease {
      display: inline-block;
      padding: 6px;
      &.move-enter-active, &.move-leave-active {
        transition: all 0.4s linear;
      }
      .inner {
        transform: rotate(0);
        transition: all 0.4s linear;
        transform: rotate(0);
      }
      .iconfont {
        padding: 0;
      }
      &.move-enter, &.move-leave-to {
        transform: translate3d(24px, 0, 0);
        opacity: 0;
        .inner {
          transform: rotate(180deg);
        }
      }
    }


    .iconfont {
      display: inline-block;
      padding: 6px;
      font-size: 24px;
      line-height: 24px;
      color: rgb(0, 160, 220);
    }
  }
</style>
