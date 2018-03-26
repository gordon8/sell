<template>
  <div class="select">
    <div class="select-type">
      <span @click="select(2)" class="type positive">{{desc.all}}</span>
      <span class="type positive">{{desc.positive}}</span>
      <span class="type negative">{{desc.negative}}</span>
    </div>
    <div class="only">
      <i class="iconfont icon-choseline"></i>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
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
      }
    },
    methods: {
      select(type) {
        this.$emit('select', type);
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