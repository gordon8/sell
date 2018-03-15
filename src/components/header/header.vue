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
      <div @click="showDetail" v-if="seller.supports && seller.supports.length > 0" class="support-count">
        {{seller.supports.length}}个
        <i class="iconfont icon-previewright"></i>
      </div>
    </div>
    <div @click="showDetail" class="bulletin-wrap">
      <span class="icon bulletin"></span>
      <span class="text">{{seller.bulletin}}</span>
      <i class="iconfont icon-previewright"></i>
    </div>
    <div class="background" :style="{backgroundImage: 'url('+ seller.avatar + ')'}"></div>
    <transition name="fade">
      <div v-show="detailShow" class="detail">
        <div class="detail-wrap">
          <div class="detial-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrap">
              <v-star :size="48" :score="seller.score"></v-star>
            </div>
            <div class="supports-wrap">
              <div class="title">
                <div class="line"></div>
                <div class="text">优惠信息</div>
                <div class="line"></div>
              </div>
              <ul class="supports-list">
                <li v-for="item in seller.supports" class="item" :key="item.type">
                  <span :class="['icon',supportClassArr[item.type]]"></span>
                  <span class="desc">{{item.description}}</span>
                </li>
              </ul>
            </div>
            <div class="bulletin">
              <div class="title">
                <div class="line"></div>
                <div class="text">商家公告</div>
                <div class="line"></div>
              </div>
              <div class="content">{{seller.bulletin}}</div>
            </div>

          </div>

        </div>
        <div @click="hideDetail" class="detail-close">
          <i class="iconfont icon-close"></i>
        </div>


      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from "@/components/star/star";

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
        ],
        detailShow: false
      }
    },
    methods: {
      showDetail() {
        this.detailShow = true;
      },
      hideDetail() {
        this.detailShow = false;
      }
    },
    components: {
      'v-star': star
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
            padding-top: 2px;
            font-size: 10px;
            line-height: 10px;
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
        padding: 64px 36px;
        box-sizing: border-box;
        .name {
          text-align: center;
          font-size: 16px;
          font-weight: 700;
        }
        .star-wrap {
          margin-top: 16px;
          .star {
            text-align: center;
          }
        }
        .supports-wrap {
          margin-top: 28px;
          .supports-list {
            margin-top: 22px;
            padding: 0 12px;
            .item {
              font-size: 0;
              margin-bottom: 6px;
              .icon {
                display: inline-block;
                width: 16px;
                height: 16px;
                margin-right: 6px;
                vertical-align: top;
                &.decrease {
                  @include bg-image(decrease_1);
                }
                &.discount {
                  @include bg-image(discount_1);
                }
                &.guarantee {
                  @include bg-image(guarantee_1);
                }
                &.invoice {
                  @include bg-image(invoice_1);
                }
                &.special {
                  @include bg-image(special_1);
                }
              }
              .desc {
                display: inline-block;
                font-size: 12px;
                line-height: 16px;
              }
            }
          }
        }
        .title {
          display: flex;
          .line {
            position: relative;
            top: -6px;
            flex: 1;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          }
          .text {
            padding: 0 12px;
            font-weight: 700;
            font-size: 14px;
          }
        }
        .bulletin {
          margin-top: 26px;
          .content {
            margin-top: 24px;
            padding: 0 12px;
            font-size: 12px;
            line-height: 2;
          }
        }
      }
      .detail-close {
        position: relative;
        margin: -64px auto 0;
        text-align: center;
        .iconfont {
          font-size: 32px;
          color: rgba(255, 255, 255, 0.5);
        }
      }
    }

    .fade-enter-active, .fade-leave-active {
      transition: all .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
    }

  }

  .avatar {
    border-radius: 4px;
  }
</style>
