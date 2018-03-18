<template>
  <div class="cart-wrap">
    <div class="content">
      <div class="content-left">
        <span class="logo-wrap">
          <span class="logo">
            <i class="iconfont icon-cart"></i>
          </span>
        </span>
        <span class="total">¥20</span>
        <span class="delivery">另需配送费{{deliveryPrice}}元</span>
      </div>
      <div class="content-right">
        <div class="pay">¥{{minPrice}}元起送</div>
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
    z-index: 100;
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
          color: rgba(0,0,0, 0.4);
        }
      }
    }
  }
</style>
