<template>
  <div class="header">
    <div class="con-wrap">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <div class="content">
        <h2 class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </h2>
        <div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
        <div v-if="seller.supports && seller.supports.length > 0" class="support">
          <span :class="['icon', supportClassArr[seller.supports[0].type]]"></span>
          <span class="desc">{{seller.supports[0].description}}</span>
        </div>
      </div>
    </div>
    <div class="notice-wrap"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      seller: {
        type: Object,
      }
    },
    data() {
      return {
        supportClassArr: [
          'decrease',
          'discount',
          'guarantee',
          'invoice',
          'special'
        ]
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss" type="text/scss">
  @import "../../common/css/mixin";
  .header {
    position: relative;
    font-weight: 200;
    /*overflow: hidden;*/
    color: #fff;

    .con-wrap {
      padding: 24px 12px 18px 24px;
      font-size: 0;
      background-color: rgba(0, 0, 0, 0.6);

      .avatar {
        display: inline-block;
        border-radius: 2px;
        vertical-align: top;
        overflow: hidden;
      }

      .content {
        display: inline-block;
        margin-left: 16px;
        .title {
          margin-top: 2px;
          height: 18px;
          font-size: 0;
          .brand {
            display: inline-block;
            width: 30px;
            height: 18px;
            vertical-align: top;
            @include bg-image(brand);
          }
          .name {
            margin-left: 6px;
            font-size: 16px;
            font-weight: 700;
            line-height: 18px;
          }

        }
        .description {
          margin-top: 8px;
          font-size: 12px;
        }
        .support {
          margin-top: 10px;
          .icon {
            display: inline-block;
            width: 12px;
            height: 12px;
            vertical-align: top;
            &.decrease {
              @include bg-image(decrease_1)
            }
          }
          .desc {
            display: inline-block;
            margin-left: 4px;
            font-size: 10px;
            line-height: 12px;
          }
        }
      }
    }

  }

  .avatar {
    border-radius: 4px;
  }
</style>
