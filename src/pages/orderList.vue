<template>
    <div class="order-list">
        <order-header title="订单支付">
          <template v-slot:tip>
            <span>请谨防钓鱼链接或诈骗电话，了解更多</span>
          </template>
        </order-header>
        <div class="wrapper">
        <div class="container">
          <div class="order-box">
            <loding v-if="loding"></loding>
            <div class="order" v-for="(order, index) in list" :key="index">
              <div class="order-title">
                <div class="item-info fl">
                  {{order.createTime}}
                  <span>|</span>
                  {{order.receiverName}}
                  <span>|</span>
                  订单号：{{order.orderNo}}
                  <span>|</span>
                  {{order.paymentTypeDesc}}
                </div>
                <div class="item-money fr">
                  <span>应付金额：</span>
                  <span class="money">{{order.payment}}</span>
                  <span>元</span>
                </div>
              </div>
              <div class="order-content clearfix">
                <div class="good-box fl">
                  <div class="good-list" v-for="(item,i) in order.orderItemVoList" :key="i">
                    <div class="good-img">
                      <img v-lazy="item.productImage" alt="">
                    </div>
                    <div class="good-name">
                      <div class="p-name">{{item.productName}}</div>
                      <div class="p-money">{{item.totalPrice + 'X' + item.quantity}}元</div>
                    </div>
                  </div>
                </div>
                <div class="good-state fr" v-if="order.status === 20">
                  <a href="javascript:;">{{order.statusDesc}}</a>
                </div>
                <div class="good-state fr" v-else>
                  <a href="javascript:;" @click="goPay(order.orderNo)">{{order.statusDesc}}</a>
                </div>
              </div>
            </div>
            <!-- 第一种方法：分页器 -->
            <el-pagination
            class="pagination"
              background
              layout="prev, pager, next"
              @current-change="handleChange"
              :pageSize = 'pageSize'
              :total="total">
            </el-pagination>
            <!-- 第二种方法：加载更多按钮 -->
            <div class="load-more"  v-if="false">
              <el-button type="primary" :loding="loding" @click="loadMore">加载更多</el-button>
          </div>
            <!-- 第三种方式 滚动加载，通过npm插件实现 -->
           <div class="scroll-more"
            v-infinite-scroll="scrollMore"
            infinite-scroll-disabled="true"
            infinite-scroll-distance="410"
            v-if="false"
          >
            <img src="../../static/imgs/loading-svg/loading-spinning-bubbles.svg" alt="" v-show="loding">
          </div>
            <no-data v-if="!loding && list.length == 0 "></no-data>
          </div>
        </div>
      </div>
    </div>
</template>
<script>

import OrderHeader from './../components/OrderHeader'
import Loding from './../components/Loding'
import NoData from './../components/NoData'
import { Pagination, Button } from 'element-ui'
import infiniteScroll from 'vue-infinite-scroll'
export default {
  name: 'OrderList',
  components: {
    OrderHeader,
    Loding,
    NoData,
    [Pagination.name]: Pagination,
    [Button.name]: Button
  },
  directives: {
    infiniteScroll
  },
  data () {
    return {
      loding: false,
      list: [],
      pageSize: 10,
      pageNum: 1,
      total: 0,
      showNextPage: true, // 加载更多：是否显示按钮
      busy: false // 滚动加载，是否触发
    }
  },
  methods: {
    getOrderList () {
      this.loding = true
      this.axios.get('/orders', {
        params: {
          pageSize: 10,
          pageNum: this.pageNum
        }
      }).then((res) => {
        this.list = this.list.concat(res.list)
        this.loding = false
        this.total = res.total
        this.showNextPage = res.hasNextPage
        this.busy = true
        if (res.hasNextPage) {
          this.busy = true
        } else {
          this.busy = false
        }
      }).catch(() => {
        this.loding = false
      })
    },
    goPay (orderNo) {
      // 路由跳转三种方式
      // this.$router.push('/order/pay')
      // this.$router.push({
      //   name: 'order-pay',
      //   query: {
      //     order
      //   }
      // })
      this.$router.push({
        path: '/order/pay',
        query: {
          orderNo
        }
      })
    },
    // 第一种方法：分页器
    handleChange (pageNum) {
      this.pageNum = pageNum
      this.getOrderList()
    },
    // 第二种方法：加载更多按钮
    loadMore () {
      this.pageNum++
      this.getOrderList()
    },
    // 第三种方法：滚动加载，通过npm插件实现
    scrollMore () {
      this.busy = true
      setTimeout(() => {
        this.pageNum++
        this.getOrderList()
      }, 500)
    }
  },
  mounted () {
    this.getOrderList()
  }
}
</script>
<style lang="scss">
  @import './../assets/scss/config.scss';
  @import './../assets/scss/mixin.scss';
  @import './../assets/scss/base.scss';
  .order-list{
    .wrapper{
      background-color:$colorJ;
      padding-top:33px;
      padding-bottom:110px;
      .order-box{
        .order{
          @include border();
          background-color:$colorG;
          margin-bottom:31px;
          &:last-child{
            margin-bottom:0;
          }
          .order-title{
            @include height(74px);
            background-color:$colorK;
            padding:0 43px;
            font-size:16px;
            color:$colorC;
            .item-info{
              span{
                margin:0 9px;
              }
            }
            .money{
              font-size:26px;
              color:$colorB;
            }
          }
          .order-content{
            padding:0 43px;
            .good-box{
              width:88%;
              .good-list{
                display: flex;
                align-items: center;
                height:145px;
                .good-img{
                  width:112px;
                  img{
                    width:100%;
                  }
                }
                .good-name{
                  font-size:20px;
                  color:$colorB;
                }
              }
            }
            .good-state{
              @include height(145px);
              font-size: 20px;
              color:$colorA;
              a{
                color:$colorA;
              }
            }
          }
        }
        .pagination{
          text-align:right;
        }
        .el-pagination.is-background .el-pager li:not(.disabled).active{
          background-color: #FF6600;
        }
        .el-button--primary{
          background-color: #FF6600;
          border-color: #FF6600;
        }
        .load-more,.scroll-more{
          text-align:center;
        }
      }
    }
  }
</style>
