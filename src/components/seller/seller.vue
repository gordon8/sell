<template>
  <div class="seller" ref="seller">
    <div class="seller-wrap">
      <div class="overview">
        <div class="name-wrap">
          <h2 class="name">{{seller.name}}</h2>
          <div class="rating-wrap">
            <star :size="36" :score="seller.foodScore" class="star-wrap"></star>
            <span class="rating-num">({{seller.ratingCount}})</span>
            <span class="sell-num">月售{{seller.sellCount}}单</span>
          </div>
        </div>
        <div class="base-wrap">
          <div class="base">
            <h3 class="title">起送价</h3>
            <p class="con">
              <strong class="num">{{seller.minPrice}}</strong>元
            </p>
          </div>
          <div class="base">
            <h3 class="title">商家配送</h3>
            <p class="con">
              <strong class="num">{{seller.deliveryPrice}}</strong>元
            </p>
          </div>
          <div class="base">
            <h3 class="title">平均配送时间</h3>
            <p class="con">
              <strong class="num">{{seller.deliveryTime}}</strong>分钟
            </p>
          </div>
        </div>
        <div @click="toggleFavorite" class="favorite-wrap">
          <i class="iconfont icon-favorite" :class="{'active': seller.favorite}"></i>
          <p class="text">{{favoriteText}}</p>
        </div>
      </div>
      <split></split>
      <div class="activity-wrap">
        <div class="note-wrap">
          <h2 class="title">公告与活动</h2>
          <p class="text">{{seller.bulletin}}</p>
        </div>
        <ul class="supports">
          <li v-for="item in seller.supports" :key="item.type" class="support-item">
            <span v-if="supportClassArr[item.type]" :class="['icon', supportClassArr[item.type]]"></span><span
            class="name">{{item.name}}</span>
            <span class="text">
              {{item.description}}
            </span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics-wrap">
        <h2 class="title">商家实景</h2>
        <div class="pic-wrap" ref="pics">
          <ul class="pic-list" ref="picList">
            <li v-for="(item, index) in seller.pics" :key="index" class="pic-item">
              <img class="pic" width="120" height="90" :src="item" alt="实景">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info-wrap">
        <h2 class="title">商家信息</h2>
        <ul class="info-list">
          <li v-for="(item, index) in seller.infos" :key="index" class="info-item">
            {{item}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from "better-scroll";
  import Vue from "vue";
  import star from "@/components/star/star";
  import split from "@/components/split/split";
  import {saveToLocal,getFromLocal} from "../../common/js/store";

  export default {
    props: {
      seller: {
        type: Object
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
      }
    },
    watch: {
      seller() {
        // this.initScroll();
      }
    },
    computed: {
      favoriteText() {
        let text = '';
        if (this.seller.favorite) {
          text = '已收藏';
        } else {
          text = '收藏';
        }
        return text;
      }
    },
    mounted() {
      this.seller.favorite = getFromLocal(this.seller.id, 'favorite', false);
      this.initScroll();
    },
    methods: {
      toggleFavorite() {
        if (this.seller.favorite) {
          Vue.set(this.seller, 'favorite', false);
          saveToLocal(this.seller.id, 'favorite', false);
          // this.seller.favorite = false;
        } else {
          Vue.set(this.seller, 'favorite', true);
          saveToLocal(this.seller.id, 'favorite', true);
        }

      },
      initScroll() {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.seller, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
        if (this.seller.pics) {
          let width = 120;
          let margin = 6;
          let widthTotal = this.seller.pics.length * (width + margin) - margin;
          this.$refs.picList.style.width = widthTotal + 'px';
          this.$nextTick(() => {
            if (!this.picScroll) {
              this.picScroll = new BScroll(this.$refs.pics, {
                scrollX: true,
                eventPassthrough: 'vertical'
              });
            } else {
              this.picScroll.refresh();
            }
          });
        }

      }
    },
    components: {
      star,
      split
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss" type="text/scss">
  @import "../../common/css/iconfont.css";
  @import "../../common/css/mixin";

  .seller {
    position: absolute;
    top: 174px;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    .overview {
      position: relative;
      padding: 18px;
      .name-wrap {
        padding-bottom: 18px;
        @include border-1px(rgba(7, 17, 27, 0.1))
        .name {
          font-size: 14px;
          line-height: 14px;
          color: rgb(7, 17, 27);
        }
        .rating-wrap {
          margin-top: 8px;
          font-size: 0;
          color: rgb(77, 85, 93);
          .star-wrap {
            display: inline-block;
            height: 18px;
            vertical-align: top;
          }
          .rating-num, .sell-num {
            display: inline-block;
            margin-left: 2px;
            font-size: 10px;
            line-height: 18px;
            vertical-align: top;
          }
          .sell-num {
            margin-left: 12px;
          }
        }
      }
      .base-wrap {
        display: flex;
        margin-top: 18px;
        text-align: center;
        .base {
          flex: 1;
          border-right: 1px solid rgba(7, 17, 27, 0.1);
          .title {
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
          .con {
            margin-top: 4px;
            font-size: 10px;
            line-height: 24px;
            font-weight: 200;
            color: rgb(7, 17, 27);
            .num {
              display: inline-block;
              font-size: 24px;
            }
          }
          &:last-of-type {
            border-right: none;
          }
        }
      }
      .favorite-wrap {
        position: absolute;
        top: 18px;
        right: 10px;
        width: 50px;
        text-align: center;
        .iconfont {
          font-size: 24px;
          line-height: 24px;
          color: #d4d6d9;
          &.active {
            color: rgb(240,20,20);
          }
        }
        .text {
          margin-top: 4px;
          font-size: 10px;
          line-height: 10px;
          color: rgb(77,85,93);
        }
      }
    }
    .activity-wrap {
      padding: 18px 18px 0;
      .note-wrap {
        padding-bottom: 16px;
        @include border-1px(rgba(7, 17, 27, 0.1));
        .title {
          font-size: 14px;
          line-height: 14px;
          color: rgb(7, 17, 27);
        }
        .text {
          margin-top: 8px;
          padding: 0 12px;
          font-size: 12px;
          line-height: 24px;
          color: rgb(240, 20, 20);
        }
      }
      .supports {
        .support-item {
          padding: 16px 12px;
          font-size: 0;
          @include border-1px(rgba(7, 17, 27, 0.1));
          .icon {
            display: inline-block;
            width: 16px;
            height: 16px;
            margin-right: 6px;
            vertical-align: top;
            &.decrease {
              @include bg-image(decrease_3);
            }
            &.discount {
              @include bg-image(discount_3);
            }
            &.guarantee {
              @include bg-image(guarantee_3);
            }
            &.invoice {
              @include bg-image(invoice_3);
            }
            &.special {
              @include bg-image(special_3);
            }
          }
          .text {
            font-size: 12px;
            line-height: 16px;
            font-weight: 200;
            color: rgb(7, 17, 27);
          }
          &:last-of-type {
            @include border-none;
          }
        }
      }
    }
    .pics-wrap {
      padding: 18px 0 18px 18px;
      .title {
        margin-bottom: 12px;
        font-size: 14px;
        line-height: 14px;
        color: rgb(7, 17, 27);
      }
      .pic-wrap {
        width: 100%;
        height: 90px;
        overflow: hidden;
        .pic-list {
          font-size: 0;
          white-space: nowrap;
          .pic-item {
            display: inline-block;
            margin-right: 6px;
            &.last-of-type {
              margin: 0;
            }
          }
        }
      }
    }
    .info-wrap {
      padding: 18px 18px 0 18px;
      .title {
        padding-bottom: 12px;
        font-size: 14px;
        line-height: 14px;
        color: rgb(7, 17, 27);
        @include border-1px(rgba(7,17,27,0.1));
      }
      .info-list{
        .info-item {
          padding: 16px 12px;
          font-size: 12px;
          line-height: 16px;
          font-size: 200;
          color: rgb(7,17,27);
          @include border-1px(rgba(7,17,27,0.1));
          &:last-of-type {
            @include border-none();
          }
        }
      }

    }
  }
</style>
