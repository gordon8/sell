<template>
  <div class="cart-wrap">
    <div class="content">
      <div class="content-left">
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
          <div class="ball">
            <div class="inner"></div>
          </div>
        </transition>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  export default {
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
        dropBalls: []
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
        console.log('before:',el);
      },
      dropping() {

      },
      afterDrop() {

      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss" type="text/scss">
  @import "../../common/css/iconfont.css";

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
        transition: all 0.4s linear;
        .inner {
          width: 16px;
          height: 16px;
          background-color: #00a0dc;
          border-radius: 50%;
          transition: all 0.4s linear;
        }
      }
    }
  }
</style>
