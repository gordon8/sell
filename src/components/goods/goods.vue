<template>
  <div class="goods-wrap">
    <div class="menu-wrap">
      <ul class="menu-list">
        <li v-for="(item, index) in goods" class="menu-item" :key="index">
          <div class="name-wrap">
            <span :class="['icon', supportClassArr[item.type]]"></span><span class="name">{{item.name}}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="foods-wrap">
      <ul class="foods-list">
        <li v-for="(items, index) in goods" class="foods-items" :key="index">
          <h2 class="title">{{items.name}}</h2>
          <ul>
            <li v-if="items" v-for="item in items.foods" class="foods-item" :key="item.name">
              <div class="cover-wrap">
                <img :src="item.image" :alt="item.name">
              </div>
              <div class="detail-wrap">
                <h3 class="name">{{item.name}}</h3>
                <p class="desc">{{item.description}}</p>
                <p>
                  <span class="sell-count">月售{{item.sellCount}}份</span><span class="rating">好评率{{item.rating}}%</span>
                </p>
                <p class="price">
                  <span class="new">￥{{item.price}}</span><span v-if="item.oldPrice" class="old">￥{{item.oldPrice}}</span>
                </p>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const ERR_OK = 0;
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        supportClassArr: [
          'decrease',
          'discount',
          'guarantee',
          'invoice',
          'special'
        ],
      }
    },
    created() {
      this.init();
    },
    methods: {
      init() {
        this.$http.get('/api/goods').then(response => {
          // get body data
          if (response.body.errno === 0) {
            this.goods = response.body.data;
          }

        }, response => {
          // error
        })
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss" type="text/scss">
  @import "../../common/css/mixin";
  .goods-wrap {
    position: absolute;
    top: 174px;
    bottom: 46px;
    display: flex;
    overflow: hidden;
    .menu-wrap {
      flex: 0 0 80px;
      width: 80px;
      background: #f3f5f7;
      .menu-item {
        display: table;
        padding: 0 12px;
        width: 56px;
        height: 54px;
        font-size: 12px;
        line-height: 14px;
        .name-wrap {
          display: table-cell;
          vertical-align: middle;
          @include border-1px(rgba(7, 17, 27, 0.1));
          .icon {
            display: inline-block;
            width: 12px;
            height: 12px;
            margin-top: 1px;
            margin-right: 2px;
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
        }
      }
    }
    .foods-wrap {

    }

  }
</style>
