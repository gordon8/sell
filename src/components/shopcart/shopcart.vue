<template>
  <div>
    <div class="cart-wrap">
      <div class="content">
        <div @click="toggleFold" class="content-left">
          <span class="logo-wrap">
          <span class="logo" :class="{'has' : selectFoodList.length > 0}">
            <i class="iconfont icon-cart"></i>
            <span v-if="selectFoodList.length > 0" class="num">{{totalCount}}</span>
          </span>
        </span>
          <span class="total" :class="{'has' : selectFoodList.length > 0}">¥{{total}}</span>
          <span class="delivery">另需配送费{{deliveryPrice}}元</span>
        </div>
        <div class="content-right">
          <div class="pay" :class="[total >= minPrice ? 'enough': 'not-enough']">{{payContent}}</div>
        </div>
      </div>
      <div class="balls-wrap">
        <div v-for="(ball, index) in balls" :key="index">
          <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
            <div v-show="ball.show" class="ball">
              <div class="inner inner-hook"></div>
            </div>
          </transition>
        </div>
      </div>
      <transition name="fold">
        <div v-show="listShow" class="selected-wrap">
          <h2 class="selected-header">
            <div class="title">购物车</div>
            <span @click="emptyCart" class="empty">清空</span>
          </h2>
          <div class="list-content"  ref="listContent">
            <ul>
              <li v-for="item in selectFoodList" :key="item.name" class="selected-item">
                <div class="name">{{item.name}}</div>
                <div class="price">¥{{item.price}}</div>
                <div class="control-wrap">
                  <cartcontrol @add="addFood" :food="item"></cartcontrol>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="list-mask" v-show="listShow"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import Cartcontrol from "@/components/cartcontrol/cartcontrol";

  export default {
    components: {Cartcontrol},
    name: "shopcart",
    props: {
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      },
      selectFoodList: {
        type: Array
      }
    },
    data() {
      return {
        balls: [
          {show: false},
          {show: false},
          {show: false},
          {show: false},
          {show: false}
        ],
        dropBalls: [],
        fold: true
      }
    },
    computed: {
      total() {
        let total = 0;
        this.selectFoodList.forEach((item) => {
          total += item.price * item.count;
        })
        return total;
      },
      listShow() {
        if (!this.totalCount) {
          this.fold = true;
          return false;
        }
        let show = !this.fold;
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          });
        }
        return show;
      },
      totalCount() {
        let totalCount = 0;
        this.selectFoodList.forEach((item) => {
          totalCount += item.count;
        })
        return totalCount;
      },
      payContent() {
        let con = '';
        if (this.total === 0) {
          con = `¥${this.minPrice}元起送`;
        } else if (this.total > 0 && this.total < this.minPrice) {
          con = `还差¥${this.minPrice - this.total}起送`;
        } else if (this.total >= this.minPrice) {
          con = '去结算';
        }
        return con;
      }
    },
    methods: {
      toggleFold() {
        if (!this.totalCount) {
          return;
        }
        this.fold = !this.fold;
      },
      emptyCart() {
        this.selectFoodList.forEach((item) => {
          item.count = 0;
        });
      },
      addFood(target) {
        this.drop(target);
      },
      drop(el) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) {
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            return;
          }
        }
      },
      beforeDrop(el) {
        // console.log('before:',el);
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect();
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22);
            el.style.display = '';
            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
            el.style.transform = `transition3d(0, ${y}px, 0)`;
            let innerEl = el.getElementsByClassName('inner-hook')[0];
            innerEl.style.webkitTransform = `translate3d(${x}px,0,0)`;
            innerEl.style.transform = `transition3d(${x}px, 0, 0)`;
          }
        }
      },
      dropping(el, done) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight; //触发浏览器重绘
        this.$nextTick(function () {
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'transition3d(0, 0, 0)';
          let innerEl = el.getElementsByClassName('inner-hook')[0];
          innerEl.style.webkitTransform = 'translate3d(0,0,0)';
          innerEl.style.transform = 'translate3d(0, 0, 0,)';
          el.addEventListener('transitionend', done);
        });
      },
      afterDrop(el) {
        let ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      }
    },
    components: {
      Cartcontrol
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss" type="text/scss">
  @import "../../common/css/iconfont.css";
  @import "../../common/css/mixin";

  .cart-wrap {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 48px;
    z-index: 99;
    .content {
      display: flex;
      font-size: 0;
      color: rgba(255, 255, 255, 0.4);
      background-color: #141d27;
      .content-left {
        flex: 1;
        .logo-wrap {
          display: inline-block;
          margin: 0 12px;
          margin-top: -10px;
          width: 56px;
          height: 56px;
          padding: 6px;
          box-sizing: border-box;
          background-color: #141d27;
          border-radius: 50%;
          .logo {
            position: relative;
            display: inline-block;
            width: 100%;
            height: 100%;
            text-align: center;
            background-color: #2b343c;
            border-radius: 50%;
            .icon-cart {
              font-size: 24px;
              line-height: 44px;
              color: rgba(255, 255, 255, 0.4);
            }
            &.has {
              background-color: #00a0dc;
              .icon-cart {
                color: #fff;
              }
            }
            .num {
              position: absolute;
              left: 32px;
              top: -6px;
              padding: 3px 6px;
              font-size: 9px;
              color: #fff;
              background-color: rgb(240, 20, 20);
              border-radius: 8px;
            }
          }
        }
        .total {
          display: inline-block;
          margin-top: 12px;
          height: 24px;
          padding-right: 12px;
          font-size: 16px;
          vertical-align: top;
          line-height: 24px;
          border-right: 1px solid rgba(255, 255, 255, 0.1);
          &.has {
            color: #fff;
          }
        }
        .delivery {
          display: inline-block;
          margin-left: 12px;
          font-size: 12px;
          line-height: 48px;
        }
      }
      .content-right {
        flex: 0 0 105px;
        width: 105px;
        text-align: center;
        .pay {
          height: 48px;
          line-height: 48px;
          font-size: 12px;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.4);
          background-color: #2b333b;
          &.enough {
            color: #fff;
            background-color: #00b43c;
          }
        }
      }
    }
    .balls-wrap {
      .ball {
        position: fixed;
        left: 32px;
        bottom: 22px;
        z-index: 100;
        transition: all 0.4s cubic-bezier(.49, -0.27, .89, .63);
        .inner {
          width: 16px;
          height: 16px;
          background-color: #00a0dc;
          border-radius: 50%;
          transition: all 0.4s linear;
        }
      }
    }
    .selected-wrap {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      background-color: #fff;
      transform: translate3d(0, -100%, 0);
      z-index: -1;
      .selected-header {
        height: 40px;
        padding: 0 18px;
        line-height: 40px;
        background-color: #f3f5f7;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        .title {
          float: left;
          font-size: 14px;
          font-weight: 200;
          color: rgb(7, 17, 27);
        }
        .empty {
          float: right;
          font-size: 12px;
          color: rgb(0, 160, 220);
        }
      }
      .list-content {
        padding: 0 18px;
        max-height: 217px;
        overflow: hidden;
        .selected-item {
          position: relative;
          padding: 12px 0;
          height: 48px;
          box-sizing: border-box;
          @include border-1px(rgba(7, 17, 27, 0.1));
          .name {
            display: inline-block;
            line-height: 24px;
            font-size: 14px;
            color: rgb(7, 17, 27);
          }
          .price {
            position: absolute;
            right: 90px;
            bottom: 12px;
            font-size: 14px;
            line-height: 24px;
            font-weight: 700;
            color: rgb(240, 20, 20);
          }
          .control-wrap {
            position: absolute;
            right: 0;
            bottom: 6px;
          }

        }
      }
      &.fold-enter-active, &.fold-leave-active {
        transition: all 0.5s ease;
      }
      &.fold-enter, &.fold-leave-to{
        transform: translate3d(0,0,0);
      }
    }
  }

  .list-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    background-color: rgba(7, 17, 27, 0.6);
    &.fade-enter-active, &.fade-leave-active {
      transition: all 0.5s ease;
    }
    &.fade-enter, &.fade-leave-to {
      opacity: 0;
    }
  }
</style>
