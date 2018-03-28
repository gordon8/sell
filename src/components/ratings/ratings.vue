<template>
  <div class="ratings">
    <div class="overview">
      <div class="overview-left">
        <h2 class="score">3.9</h2>
        <h3 class="tltle">综合评分</h3>
        <p class="percent">高于周边商家69.2%</p>
      </div>
      <div class="overview-right">
        <div class="score-wrap">
          <span class="title">服务态度</span>
          <star class="star" :size="36" :score="3.9"></star>
          <span class="score">3.9</span>
        </div>
        <div class="score-wrap">
          <span class="title">商品评分</span>
          <star :size="36" :score="4.0"></star>
          <span class="score">4.0</span>
        </div>
        <div class="delivery">
          <span class="title">送达时间</span>
          <span class="delivery-time">44分钟</span>
        </div>
      </div>
    </div>
    <split></split>
    <ratingselect :food="selectedFood" :selectedType="selectedType" :onlyContent="onlyContent" :desc="desc" @select="selectType" @toggle="toggleContent"></ratingselect>
  </div>
</template>

<script>
  import star from '@/components/star/star';
  import split from '@/components/split/split';
  import ratingselect from '@/components/ratingselect/ratingselect';

  const ALL = 2;

  export default {
    data() {
      return {
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
          console.log(response);
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
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss" type="text/scss">
  .ratings {

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
  }
</style>
