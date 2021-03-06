<template>
  <transition name="move">
    <div v-show="foodShow" class="food-wrap" ref="food">
      <div class="food">
        <div @click="hideFood" class="back">
          <i class="iconfont icon-previewleft"></i>
        </div>
        <div class="cover-wrap">
          <img :src="selectedFood.image" alt="" class="cover">
        </div>
        <div class="info-wrap">
          <h3 class="name">{{selectedFood.name}}</h3>
          <p class="desc">
            <span class="sell-count">月售{{selectedFood.sellCount}}份</span><span class="rating">好评率{{selectedFood.rating}}%</span>
          </p>
          <p class="price">
            <span class="new">¥{{selectedFood.price}}</span><span v-if="selectedFood.oldPrice" class="old">¥{{selectedFood.oldPrice}}</span>
          </p>
          <div class="control-wrap">
            <cartcontrol @add="addFood" :food="selectedFood"></cartcontrol>
          </div>
          <div v-show="!selectedFood.count || selectedFood.count === 0" @click="addFirst" class="buy">加入购物车</div>
        </div>
        <split></split>
        <div v-show="selectedFood.info" class="intro-wrap">
          <h3 class="title">商品介绍</h3>
          <p class="con">{{selectedFood.info}}</p>
        </div>
        <split v-show="selectedFood.info"></split>
        <div class="rating">
          <h3 class="title">商品评价</h3>
          <div class="select-wrap">
            <ratingselect :ratings="selectedFood.ratings" :selectedType="selectedType" :onlyContent="onlyContent" :desc="desc" @select="selectType" @toggle="toggleContent"></ratingselect>
          </div>
          <ul class="rating-list">
            <li v-for="item in selectedFood.ratings" class="rating-item" :key="item.rateTime" v-show="needShow(item.rateType, item.text)">
              <p class="time">{{item.rateTime | formatDate}}</p>
              <p class="msg">
                <i v-show="item.rateType === 0" class="iconfont icon-dianzan positive"></i>
                <i v-show="item.rateType === 1" class="iconfont icon-cai negative"></i>
                <span class="text">{{item.text}}</span>
              </p>
              <div class="user">
                <span class="name">{{item.username}}</span>
                <img :src="item.avatar" alt="头像" width="12" height="12" class="face">
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import Vue from 'vue';
  import {formatDate} from "../../common/js/date";
  import cartcontrol from '@/components/cartcontrol/cartcontrol';
  import split from '@/components/split/split';
  import ratingselect from '@/components/ratingselect/ratingselect';

  const ALL = 2;

  export default {
    name: "food",
    props: {
      selectedFood: {
        type: Object
      }
    },
    data() {
      return {
        foodShow: false,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        },
        selectedType: ALL,
        onlyContent: true
      }
    },
    methods: {
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
      },
      addFirst(event) {
        this.$emit('add', event.target);
        Vue.set(this.selectedFood, 'count', 1);
      },
      addFood(target) {
        this.$emit('add', target);
      },
      show() {
        this.foodShow = true;
        this.selectedType = ALL;
        this.onlyContent = true;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click:true
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      hideFood() {
        this.foodShow = false;
      }
    },
    components: {
      cartcontrol,
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
  .food-wrap {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 48px;
    display: block;
    background-color: #fff;
    z-index: 50;
    transform: translate3d(0, 0, 0);
    .back {
      position: fixed;
      top:10px;
      z-index: 1;
      .iconfont {
        display: inline-block;
        padding: 10px;
        font-size: 30px;
        color: #fff;
      }
    }
    &.move-enter-active, &.move-leave-active {
      transition: all 0.3s linear;
    }
    &.move-enter, &.move-leave-to {
      transform: translate3d(100%, 0, 0);
    }
    .cover-wrap {
      position: relative;
      width: 100%;
      padding-bottom: 100%;
      .cover {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
    .info-wrap {
      position: relative;
      padding: 18px;
      .name {
        font-size: 14px;
        font-weight: 700;
        color: rgb(7, 17, 27);
      }
      .desc {
        margin-top: 8px;
        font-size: 10px;
        color: rgb(147, 153, 159);
        .sell-count {
          margin-right: 12px;
        }
      }
      .price {
        margin-top: 18px;
        line-height: 24px;
        .new {
          margin-right: 12px;
          font-size: 14px;
          font-weight: 700;
          color: rgb(240, 20, 20);
        }
        .old {
          font-size: 10px;
          text-decoration: line-through;
          color: rgb(147, 153, 159);
        }

      }
      .control-wrap {
        position: absolute;
        right: 12px;
        bottom: 12px;
      }
      .buy {
        position: absolute;
        right: 18px;
        bottom: 18px;
        padding: 0 12px;
        height: 24px;
        font-size: 10px;
        line-height: 24px;
        text-align: center;
        color: #fff;
        background-color: rgb(0, 160, 220);
        border-radius: 12px;
        box-sizing: border-box;
      }

    }
    .intro-wrap {
      padding: 18px;
      .title {
        font-size: 14px;
        color: rgb(7, 17, 27);
      }
      .con {
        margin-top: 6px;
        padding: 0 8px;
        font-size: 12px;
        line-height: 24px;
        color: rgb(77, 85, 93);
      }

    }
    .rating {
      .title {
        padding: 18px ;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }
      .select-wrap {
        padding: 0 18px;
      }
      .rating-list{
        border-top: 1px solid rgba(7,17,27,0.1);
        .rating-item {
          position: relative;
          margin: 0 18px;
          padding: 16px 0;
          @include border-1px(rgba(7,17,27,0.1));
          .time {
            font-size: 10px;
            color: rgb(147,153,159);
          }
          .msg {
            margin-top: 6px;
            font-size: 0;
            .iconfont {
              display: inline-block;
              font-size: 12px;
              margin-right: 4px;
              &.positive {
                color: rgb(0,160,220);
              }
              &.negative {
                color: rgb(147,153,159);
              }
            }
            .text {
              display: inline-block;
              font-size: 12px;
              color: rgb(7,17,27);
            }
          }
          .user {
            position: absolute;
            right: 0;
            top: 16px;
            font-size: 0;
            .name {
              display: inline-block;
              margin-right: 6px;
              font-size: 10px;
              line-height: 12px;
              color: rgb(147,153,159);
            }
            .face {
              vertical-align: top;
              border-radius: 50%;
            }
          }
        }
      }
    }

  }
</style>
