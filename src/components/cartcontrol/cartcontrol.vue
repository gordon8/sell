<template>
  <div class="cart-control">
    <i class="iconfont icon-removecircle"></i>
    <span class="add-num">1</span>
    <i class="iconfont icon-addcircle"></i>
  </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "cartcontrol",
      props: {

      },
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss" type="text/scss">
  @import "../../common/css/iconfont.css";
  .cart-control {
    position: absolute;
    right: 0;
    bottom: 12px;
    font-size: 0;
    .add-num {
      display: inline-block;
      padding: 0 3px;
      font-size: 10px;
      line-height: 24px;
      vertical-align: top;
      color: rgb(147, 153, 159);
    }
    .iconfont {
      display: inline-block;
      font-size: 24px;
      line-height: 24px;
      color: rgb(0, 160, 220);
    }
  }
</style>
