<template>
  <div :class="['star', starType]">
    <span v-for="(item, index) in itemClass" :class="['star-item', item]" :key="index"></span>
  </div>
</template>

<script type="text/ecmascript-6">
  const CLS_ON = 'on';
  const CLS_OFF = 'off';
  const CLS_HALF = 'half';
  const LENGTH = 5;
  export default {
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      starType() {
        return 'star-' + this.size;
      },
      itemClass() {
        let result = [];
        let integer = Math.floor(this.score);
        let hasHalf = this.score % 1 ? true : false;
        for (let i = 0; i < integer; i++) {
          result.push(CLS_ON);
        }
        if (hasHalf) {
          result.push(CLS_HALF);
        }

        while (result.length < LENGTH) {
          result.push(CLS_OFF);
        }


        return result;
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss" type="text/scss">
  @import "../../common/css/mixin";

  .star {
    &.star-48 {
      .star-item {
        display: inline-block;
        width: 20px;
        height: 20px;
        margin-right: 22px;
        &.on {
          @include bg-image(star48_on);
        }
        &.half {
          @include bg-image(star48_half);
        }
        &.off {
          @include bg-image(star48_off);
        }
      }
    }
    &.star-36 {
      .star-item {
        display: inline-block;
        width: 15px;
        height: 15px;
        margin-right: 6px;
        &.on {
          @include bg-image(star36_on);
        }
        &.half {
          @include bg-image(star36_half);
        }
        &.off {
          @include bg-image(star36_off);
        }
      }
    }
    &.star-24 {
      .star-item {
        display: inline-block;
        width: 10px;
        height: 10px;
        margin-right: 3px;
        &.on {
          @include bg-image(star24_on);
        }
        &.half {
          @include bg-image(star24_half);
        }
        &.off {
          @include bg-image(star24_off);
        }
      }
    }

  }
</style>
