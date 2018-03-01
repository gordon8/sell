<template>
  <div class="tab ">
    <div class="tab-item border-1px">
      <router-link to="/goods">商品</router-link>
    </div>
    <div class="tab-item">
      <router-link to="/ratings">评论</router-link>
    </div>
    <div class="tab-item">
      <router-link to="/seller">商家</router-link>
    </div>
  </div>
</template>

<script>

    export default {}
</script>

<style lang="scss" type="text/css" scoped>
  /*@import '@/commom/css/common'*/

  @media (-webkit-min-device-pixel-ratio: 1.5),(min-device-pixel-ratio: 1.5) {
    .border-1px {
  &::after {
     -webkit-transform: scaleY(0.7);
     transform: scaleY(0.7);
   }
  }
  }
  @media (-webkit-min-device-pixel-ratio: 2),(min-device-pixel-ratio: 2)  {
    .border-1px {
  &::after {
     -webkit-transform: scaleY(0.5);
     transform: scaleY(0.5);
   }
  }
  }
  @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3)  {
    .border-1px {
  &::after {
     -webkit-transform: scaleY(0.33);
     transform: scaleY(0.33);
   }
  }
  }

  @mixin border-1px($color) {
    position: relative;
  &::after {
     display: block;
     position: absolute;
     bottom: 0;
     left: 0;
     content: '';
     width: 100%;
     border-top: 1px solid $color;
   }
  }
  .tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    @include border-1px(rgba(7, 17, 27, 0.1));
    /*border-bottom: 1px solid rgba(7, 17, 27, 0.1);*/
    .tab-item {
      flex: 1;
      text-align: center;
      a {
        display: block;
        font-size: 14px;
        color: rgb(77, 85, 93);
        &.active {
           color: rgb(240, 20, 20);
         }
      }
    }
  }
</style>
