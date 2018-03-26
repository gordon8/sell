<template>
  <transition name="move">
    <div v-show="foodShow" class="food-wrap">
      <div class="food">
        <div class="cover-wrap">
          <img :src="selectedFood.image" alt="" class="cover">
        </div>
        <div class="info-wrap">
          <h3 class="name">{{selectedFood.name}}</h3>
          <p class="desc">
            <span class="sell-count">月售{{selectedFood.sellCount}}份</span><span class="rating">好评率{{selectedFood.rating}}%</span>
          </p>
          <p class="price">
            <span class="new">¥{{selectedFood.price}}</span><span v-if="selectedFood.oldPrice" class="old">¥{{selectedFood.oldPrice}}</span>
          </p>
          <div class="control-wrap">
            <cartcontrol @add="addFood" :food="selectedFood"></cartcontrol>
          </div>
          <div v-show="!selectedFood.count || selectedFood.count === 0" @click="addFirst" class="buy">加入购物车</div>

        </div>
      </div>


    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  import cartcontrol from '@/components/cartcontrol/cartcontrol';

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
      addFirst(event) {
        this.$emit('add', event.target);
        Vue.set(this.selectedFood, 'count', 1);
      },
      addFood(target) {
        this.$emit('add', target);
        // this.$refs.shopcart.drop(target);
      },
      show() {
        this.foodShow = true;
      }
    },
    components: {
      cartcontrol
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
    .cover-wrap {
      position: relative;
      width: 100%;
      padding-bottom: 100%;
      .cover {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
    .info-wrap {
      position: relative;
      padding: 18px;
      .name {
        font-size: 14px;
        font-weight: 700;
        color: rgb(7,17,27);
      }
      .desc {
        margin-top: 8px;
        font-size: 10px;
        color: rgb(147,153,159);
        .sell-count {
          margin-right: 12px;
        }
      }
      .price {
        margin-top: 18px;
        line-height: 24px;
        .new {
          margin-right: 12px;
          font-size: 14px;
          font-weight: 700;
          color: rgb(240,20,20);
        }
        .old {
          font-size: 10px;
          text-decoration: line-through;
          color: rgb(147,153,159);
        }

      }
      .control-wrap {
        position: absolute;
        right: 12px;
        bottom: 12px;
      }
      .buy {
        position: absolute;
        right: 18px;
        bottom: 18px;
        width: 74px;
        height: 24px;
        font-size: 10px;
        line-height: 24px;
        text-align: center;
        color: #fff;
        background-color: rgb(0,160,220);
        border-radius: 12px;
        box-sizing: border-box;
      }

    }
  }
</style>
