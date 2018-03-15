<template>
  <div class="goods-wrap">
    <div class="menu-wrap" ref="menuWrap">
      <ul class="menu-list">
        <li v-for="(item, index) in goods" class="menu-item" :key="index">
          <div class="name-wrap">
            <span v-if="supportClassArr[item.type]" :class="['icon', supportClassArr[item.type]]"></span><span class="name">{{item.name}}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="foods-wrap" ref="foodsWrap">
      <ul class="foods-list">
        <li v-for="(items, index) in goods" class="foods-items" :key="index">
          <h2 class="title">{{items.name}}</h2>
          <ul>
            <li v-if="items" v-for="item in items.foods" class="foods-item" :key="item.name">
              <div class="cover-wrap">
                <img :src="item.image" :alt="item.name" width="57" height="57">
              </div>
              <div class="detail-wrap">
                <h3 class="name">{{item.name}}</h3>
                <p v-if="item.description" class="desc">{{item.description}}</p>
                <p class="desc">
                  <span class="sell-count">月售{{item.sellCount}}份</span><span class="rating">好评率{{item.rating}}%</span>
                </p>
                <p class="price">
                  <span class="new">¥{{item.price}}</span><span class="old">¥20</span><span v-if="item.oldPrice" class="old">¥{{item.oldPrice}}</span>
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
  import BScroll from 'better-scroll';


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
            this.$nextTick(() => {
              this.initScroll();
            });
          }

        }, response => {
          // error
        })
      },
      initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuWrap, {});
        this.foodsScroll = new BScroll(this.$refs.foodsWrap, {});
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
      .foods-items {
        .title {
          height: 26px;
          padding-left: 14px;
          line-height: 26px;
          font-size: 12px;
          color: rgb(147, 153, 159);
          background-color: #f3f5f7;
          border-left: 2px solid #d9dde1;
        }
        .foods-item {
          position: relative;
          display: flex;
          margin: 0 18px;
          padding: 18px 0;
          &:last-of-type {
            @include border-none;
          }
          @include border-1px(rgba(7, 17, 27, 0.1));
          .cover-wrap {
            flex: 0 0 57px;
            width: 57px;
            margin-right: 10px;
          }
          .detail-wrap {
            flex: 1;
            .name {
              margin-top: 2px;
              font-size: 14px;
              line-height: 14px;
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
              margin-top: 8px;
              .new {
                margin-right: 8px;
                font-size: 12px;
                /*vertical-align: middle;*/
                line-height: 12px;
                font-weight: 700;
                color: #f01414;
              }
              .old {
                font-size: 9px;
                /*vertical-align: middle;*/
                color: rgb(147, 153, 159);
                text-decoration: line-through;
              }
            }
          }
        }
      }
    }

  }
</style>
