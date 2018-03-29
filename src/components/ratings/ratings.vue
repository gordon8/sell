<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h2 class="score">{{seller.score}}</h2>
          <h3 class="tltle">综合评分</h3>
          <p class="percent">高于周边商家{{seller.rankRate}}%</p>
        </div>
        <div class="overview-right">
          <div class="score-wrap">
            <span class="title">服务态度</span>
            <star class="star" :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrap">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery">
            <span class="title">送达时间</span>
            <span class="delivery-time">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect class="rating-select" :ratings="ratings" :selectedType="selectedType" :onlyContent="onlyContent" :desc="desc" @select="selectType" @toggle="toggleContent"></ratingselect>
      <ul class="rating-list">
        <li v-show="needShow(item.rateType, item.text)" v-for="item in ratings" class="rating-item" :key="item.rateTime">
          <div class="avatar-wrap">
            <img :src="item.avatar" alt="头像" width="28" height="28" class="avatar">
          </div>
          <div class="con-wrap">
            <p class="name">{{item.username}}</p>
            <div class="score-wrap">
              <star class="star-wrap" :size="24" :score="item.score"></star>
              <span class="delivery">{{item.deliveryTime}}分钟送达</span>
            </div>
            <div class="text">{{item.text}}</div>
            <div v-show="item.recommend.length > 0" class="recommend-wrap">
              <i class="iconfont icon-dianzan"></i>
              <span v-for="recommend in item.recommend" :key="recommend" class="recommend">{{recommend}}</span>
            </div>
            <div class="time">{{item.rateTime | formatDate}}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {formatDate} from "../../common/js/date";
  import BScroll from "better-scroll";
  import star from '@/components/star/star';
  import split from '@/components/split/split';
  import ratingselect from '@/components/ratingselect/ratingselect';

  const ALL = 2;
  const ERR_OK = 0;

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        ratings: [],
        desc: {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        },
        selectedType: ALL,
        onlyContent: true
      }
    },
    created() {
      this.init();
    },
    methods: {
      init() {
        this.$http.get('/api/ratings').then((response)=> {
          if (response.body.errno === ERR_OK) {
            this.ratings = response.body.data;
            this.$nextTick(() => {
              this.scroll = new BScroll(this.$refs.ratings, {
                click: true
              });
            });
          }
        });
      },
      needShow(type, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectedType === ALL) {
          return true;
        } else if (this.selectedType === type) {
          return true;
        }
      },
      selectType(type) {
        this.selectedType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      toggleContent() {
        this.onlyContent = !this.onlyContent;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      }
    },
    components: {
      star,
      split,
      ratingselect
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'YYYY-MM-DD hh:mm');
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss" type="text/scss">
  @import "../../common/css/iconfont.css";
  @import "../../common/css/mixin";
  .ratings {
    position: absolute;
    top: 174px;
    bottom: 0;
    overflow: hidden;
    .overview {
      display: flex;
      margin: 18px 0;
      .overview-left {
        padding: 6px 0;
        flex: 0 0 137px;
        width: 137px;
        text-align: center;
        border-right: 1px solid rgba(7, 17, 27, 0.1);
        @media screen and (max-device-width: 320px) {
          flex: 0 0 120px;
          width: 120px;
        }
        .score {
          font-size: 24px;
          line-height: 28px;
          color: rgb(255, 153, 0);
        }
        .title {
          margin-top: 6px;
          font-size: 12px;
          color: rgb(7, 17, 27);
        }
        .percent {
          margin-top: 8px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
      }
      .overview-right {
        flex: 1;
        margin-left: 24px;
        padding: 6px 0;
        @media screen and (max-device-width: 320px) {
          margin-left: 6px;
        }
        .score-wrap {
          margin-bottom: 8px;
          font-size: 0;
          .title {
            display: inline-block;
            margin-right: 12px;
            font-size: 12px;
            line-height: 18px;
            vertical-align: top;
            color: rgb(7, 17, 27);
            @media screen and (max-device-width: 320px) {
              margin-right: 6px;
            }
          }
          .star {
            display: inline-block;
            margin-right: 12px;
            vertical-align: top;
            @media screen and (max-device-width: 320px) {
              margin-right: 6px;
            }
          }
          .score {
            display: inline-block;
            font-size: 12px;
            line-height: 18px;
            vertical-align: top;
            color: rgb(255, 153, 0);
          }
        }
        .delivery {
          font-size: 0;
          .title {
            display: inline-block;
            margin-right: 12px;
            font-size: 12px;
            line-height: 18px;
            vertical-align: top;
            color: rgb(7, 17, 27);
            @media screen and (max-device-width: 320px) {
              margin-right: 6px;
            }
          }
          .delivery-time {
            font-size: 12px;
            line-height: 18px;
            color: rgb(147,153,159);

          }
        }

      }
    }
    .rating-select {
      padding: 18px 18px 0;
    }
    .rating-list {
      padding: 0 18px;
      border-top: 1px solid rgba(7,17,27,0.1);
      .rating-item {
        display: flex;
        padding: 18px 0;
        @include border-1px(rgba(7,17,27,0.1));
        .avatar-wrap {
          flex: 0 0 28px;
          width: 28px;
          .avatar {
            border-radius: 50%;
          }
        }
        .con-wrap {
          position: relative;
          flex: 1;
          margin-left: 12px;
          .name {
            font-size: 10px;
            line-height: 12px;
            color: rgb(7,17,27);
          }
          .score-wrap {
            margin-top: 4px;
            font-size: 0;
            .star-wrap {
              display: inline-block;
              height: 12px;
              vertical-align: top;
            }
            .delivery {
              margin-left: 6px;
              font-size: 10px;
              line-height: 12px;
              color: rgb(147,153,159);
            }
          }
          .text {
            margin-top: 6px;
            font-size: 12px;
            line-height: 18px;
            color: rgb(7,17,27);
          }
          .recommend-wrap {
            margin-top: 8px;
            font-size: 0;
            .iconfont {
              display: inline-block;
              margin-right: 8px;
              font-size: 12px;
              line-height: 16px;
              color: rgb(0,160,220);
            }
            .recommend {
              display: inline-block;
              margin-right: 8px;
              margin-bottom: 6px;
              padding: 0 6px;
              font-size: 9px;
              line-height: 14px;
              color: rgb(147,153,159);
              border: 1px solid rgba(7,17,27,0.1);
              border-radius: 1px;
              box-sizing: border-box;
            }
          }
          .time {
            position: absolute;
            right: 0;
            top: 0;
            font-size: 10px;
            line-height: 12px;
            color: rgb(147,153,159);
          }
        }
      }
    }

  }
</style>
