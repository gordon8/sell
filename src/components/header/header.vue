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
      <div v-if="seller.supports && seller.supports.length > 0" class="support-count">
        {{seller.supports.length}}个
        <i class="iconfont icon-previewright"></i>
      </div>
    </div>
    <div class="bulletin-wrap">
      <span class="icon bulletin"></span>
      <span class="text">{{seller.bulletin}}</span>
      <i class="iconfont icon-previewright"></i>
    </div>
    <div class="background" :style="{backgroundImage: 'url('+ seller.avatar + ')'}"></div>
    <transition name="fade">
      <div class="detail">
        <div class="detail-wrap">
          <div class="title">{{seller.name}}</div>
        </div>
        <div class="detail-close">guan</div>

      </div>
    </transition>
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
  @import "../../common/css/iconfont.css";

  .header {
    position: relative;
    font-weight: 200;
    overflow: hidden;
    color: #fff;

    .con-wrap {
      position: relative;
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
      .support-count {
        position: absolute;
        right: 12px;
        bottom: 15px;
        padding: 0 10px;
        height: 24px;
        font-size: 10px;
        line-height: 24px;
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 12px;
        .iconfont {
          font-size: 10px;
        }
      }
    }

    .bulletin-wrap {
      position: relative;
      height: 28px;
      padding: 0 22px 0 12px;
      color: #fff;
      background-color: rgba(7, 17, 27, 0.2);
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      .icon.bulletin {
        display: inline-block;
        margin-top: 8px;
        width: 22px;
        height: 12px;
        vertical-align: top;
        @include bg-image(bulletin)
      }
      .text {
        margin: 0 4px;
        font-size: 10px;
        line-height: 28px;
      }
      .icon-previewright {
        position: absolute;
        right: 12px;
        top: 8px;
        font-size: 12px;
      }
    }

    .background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      filter: blur(10px);
    }

    .detail {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      background-color: rgba(7, 17, 27, 0.8);
      z-index: 10;
      .detail-wrap {
        width: 100%;
        min-height: 100%;
        padding-top: 64px;
        padding-bottom: 64px;
      }
      .detail-close {
        position: relative;
        margin: -64px auto 0;
      }
    }

  }

  .avatar {
    border-radius: 4px;
  }
</style>
