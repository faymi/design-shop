<template>
  <div class="address-wrap">
    <div class="address-list">
      <ul>
        <li v-for="(item, index) in addressList" :key="index" class="activeTouch">
          <div class='radio'>
            <input type='radio' :id="'radio'+index" name='radio[]' :value="item.addressId" v-model="seletedRadio">
            <label :for="'radio'+index" :id="'label_'+index" @click="showDelete(index)" class="activeTouch">
              <div class="user"><b>{{item.consignee}}</b> &nbsp;&nbsp; {{item.phone}}</div>
              <div class="address">
                <span>{{item.address}}</span>
              </div>
              <div class="postcode">{{item.postcode}}</div>
            </label>
            <button class="del-btn" v-if="currentIndex == index" @click="deleteAddress(item.addressId)">删除</button>
          </div>
        </li> 
      </ul>
    </div>
    <div class="add-address">
      <router-link to="/add-address">
        <button>添加收货地址</button>
      </router-link>
    </div>
    <div class="bottom-btn" v-if="nosign">
      <button @click="toPay">确认下单</button>
    </div>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui'
import { mapGetters } from 'vuex'
import api from '@/api/fetch'
import * as _ from '@/util/tool'

export default {
  name: 'Address',
  data () {
    return {
      seletedRadio: '',
      addressList: [],
      nosign: false, // 隐藏确认下单按钮
      currentIndex: 0
    }
  },
  methods: {
    // 删除按钮显隐
    showDelete (index) {
      this.currentIndex = index
    },
    // 获取地址列表
    getAddressData () {
      this.$store.dispatch('showLoading', true)
      let params = {
        customerId: this.customerId
      }
      api.getOrderAddress(params)
      .then(res => {
        this.$store.dispatch('showLoading', false)
        if (res.body.length === 0) {
          this.$router.replace('/add-address')
        }
        this.addressList = res.body
        // 默然选中第一个收货地址
        this.$nextTick(function () {
          let item = document.getElementById('label_0')
          item.click()
        })
      })
    },
    // 删除地址
    deleteAddress (addressId) {
      let params = {
        addressId: addressId
      }
      MessageBox.confirm('确定删除?').then(action => {
        api.deleteAddress(params)
        .then(res => {
          if (res.code === 0) {
            this.getAddressData()
            _.alert('删除成功！')
          } else {
            _.alert('删除失败！')
          }
        })
      })
    },
    // 下单
    toPay () {
      if (this.seletedRadio === '') {
        _.alert('请选中收货地址')
      } else {
        if (!this.$route.query.name || !this.$route.query.name === 'shopcartOrder') { // 直接下单
          let params = {
            addressId: this.seletedRadio,
            customerId: this.customerId,
            ...this.singleOrderData,
            insertTime: this.moment().format('YYYY-MM-DD hh:mm:ss')
          }
          this.$store.dispatch('showLoading', true)
          api.addSingleOrder(params)
          .then(res => {
            if (res.code === 0) {
              this.$store.dispatch('showLoading', false)
              let orderId = res.body
              this.$router.push({path: '/pay', query: { orderId: orderId }})
            }
            if (res.code === 1) {
              this.$store.dispatch('showLoading', false)
              this.$toast(res.msg)
              this.$router.push({path: '/total'})
            }
          })
        } else {
          // 购物车下单
          this.shopCartOrder()
        }
      }
    },
    shopCartOrder () {
      let params = {
        shopCartId: this.shopCartId,
        addressId: this.seletedRadio
      }
      this.$store.dispatch('showLoading', true)
      api.addMultiOrder(params)
      .then(res => {
        if (res.code === 0) {
          this.$store.dispatch('showLoading', false)
          let orderId = res.body
          this.$router.push({path: '/pay', query: { orderId: orderId }})
        }
      })
    }
  },
  computed: {
    ...mapGetters({
      singleOrderData: 'singleOrderData',
      customerId: 'customerId',
      shopCartId: 'shopCartId'
    })
  },
  mounted () {
    if (this.$route.query.nosign && this.$route.query.nosign === '1') {
      this.nosign = false
    } else {
      this.nosign = true
    }
    this.getAddressData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../assets/css/function';
.address-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .address-list {
    width: 100%;
    // margin-top: px2rem(20px);
    ul > li{
      border-bottom: px2rem(2px) solid #e6e6e6; 
      .radio {
        position: relative;
        height: px2rem(170px);
        input[type='radio'] {
          position: absolute;
          left: px2rem(20px);
          top: px2rem(50px);
          opacity: 0;
          width: px2rem(40px);
          height: px2rem(40px);
        }
        label {
          position: absolute;
          // top: px2rem(-10px);
          top: 0;
          left: px2rem(50px);
          right: 0;
          bottom: 0;
          &:before {
            content: ' ';
            position: absolute;
            left: px2rem(-30px);
            top: px2rem(70px);
            width: px2rem(40px);
            height: px2rem(40px);
            border: px2rem(2px) solid #ddd;
            border-radius: 50%;
            transition: all .3s ease;
            -webkit-transition: all .3s ease;
            -moz-transition: all .3s ease;
          }
          &:after {
            content: ' ';
            position: absolute;
            left: px2rem(-14px);
            top: px2rem(74px);
            width: px2rem(12px);
            height: px2rem(24px);
            border: 0;
            border-right: px2rem(2px) solid #fff;
            border-bottom: px2rem(2px) solid #fff;
            background: #fff;
            transform: rotate(45deg);
            -webkit-transform: rotate(45deg); 
            -moz-transform: rotate(45deg); 
            -ms-transform: rotate(45deg);
            transition: all 0.3s ease; 
            -webkit-transition: all 0.3s ease; 
            -moz-transition: all 0.3s ease;
          }
          div {
            margin: px2rem(20px);
            height: px2rem(40px);        
            text-align: left;
            &.address {
              display: flex;
              justify-content: space-between;
              span {
                display: inline-block;
              }
            }
          }
          div.user {
            b {
              font-weight: bold;
              font-size:14px;
            }
          }
        }
        input[type='radio']:checked + label:before { 
          background: #578ffe; 
          border-color: #578ffe; 
        }
        input[type='radio']:checked + label:after { 
          background: #578ffe;
        }
        .del-btn {
          position: absolute;
          top: px2rem(60px);
          right: px2rem(20px);
          width: px2rem(100px);
          height: px2rem(40px);
          display: inline-block;
          line-height: px2rem(40px);
          border: none;
          border-radius: px2rem(20px);
          background-color: $btn-del-color;
          color: $btn-font-color;
          font-size: $btn-font-size;
        }
      }
    }
  }
  .add-address {
    width: 100%;
    height: px2rem(110px);
    line-height: px2rem(110px);    
    margin-top: px2rem(20px);
    button {
      width: 100%;
      height: 100%;
      border: none;
      background-color: #fe6c00;
      color: $btn-font-color;
      font-size: 16px;
    }
  }
}
</style>