<template>
  <div class="select">
    <div class="select-type">
      <span @click="select(2)" class="type positive" :class="{'active': selectedType === 2}">{{desc.all}}<span v-if="ratings" class="num">{{ratings.length}}</span></span>
      <span @click="select(0)" class="type positive" :class="{'active': selectedType === 0}">{{desc.positive}}<span v-if="ratings" class="num">{{positive.length}}</span></span>
      <span @click="select(1)" class="type negative" :class="{'active': selectedType === 1}">{{desc.negative}}<span v-if="ratings" class="num">{{negative.length}}</span></span>
    </div>
    <div @click="toggleContent" class="only" :class="{'active': onlyContent}">
      <i class="iconfont icon-right-f"></i>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const ALL = 2;
  const POSITIVE = 0;
  const NEGATIVE = 1;
  export default {
    name: "ratingselest",
    props: {
      desc: {
        type: Object,
        default() {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          }
        }
      },
      ratings: {
        type: Array
      },
      selectedType: {
        type: Number
      },
      onlyContent: {
        type: Boolean
      }
    },
    computed: {
      positive() {
        return this.ratings.filter((item) => {
          return item.rateType === POSITIVE;
        });
      },
      negative() {
        return this.ratings.filter((item) => {
          return item.rateType === NEGATIVE;
        });
      }
    },
    methods: {
      select(type) {
        this.$emit('select', type);
      },
      toggleContent() {
        this.$emit('toggle');
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss" type="text/scss">
  @import "../../common/css/iconfont.css";
  @import "../../common/css/mixin";

  .select {
    .select-type {
      font-size: 0;
      padding-bottom: 18px;
      @include border-1px(rgba(7, 17, 27, 0.1));
      .type {
        display: inline-block;
        margin-right: 8px;
        padding: 0 12px;
        font-size: 12px;
        line-height: 28px;
        color: rgb(77, 85, 93);
        &.negative {
          background-color: rgba(77, 85, 93, 0.2);
          &.active {
            color: #fff;
            background-color: rgb(77, 85, 93);
          }
        }
        &.positive {
          background: rgba(0, 160, 220, 0.2);
          &.active {
            color: #fff;
            background-color: rgb(0, 160, 220);
          }
        }
      }
    }
    .only {
      padding: 12px 0;
      font-size: 0;
      line-height: 24px;
      color: rgb(147, 153, 159);
      .iconfont {
        display: inline-block;
        margin-right: 4px;
        vertical-align: top;
        font-size: 24px;
      }
      .text {
        display: inline-block;
        vertical-align: top;
        font-size: 12px;
      }
      &.active {
        .iconfont {
          color: #00c850;
        }
      }
    }
  }
</style>
