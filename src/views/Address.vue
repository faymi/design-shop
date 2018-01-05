<template>
  <div class="address-wrap">
    <div class="address-list">
      <ul>
        <li v-for="(item, index) in addressList" :key="index">
          <div class="user">{{item.consignee}}  {{item.phone}}</div>
          <div class="address">
            <span>{{item.address}}</span>
            <button class="del-btn" @click="deleteAddress(item.addressId)">删除</button>
          </div>
          <div class="postcode">{{item.postcode}}</div>
        </li> 
      </ul>
    </div>
    <div class="add-address">
      <router-link to="/add-address">
        <button>添加收货地址</button>
      </router-link>
    </div>
    <div class="bottom-btn">
      <router-link to="/pay">
        <button>确认下单</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import api from '@/api/fetch'
import * as _ from '@/util/tool'

export default {
  name: 'Address',
  data () {
    return {
      addressList: []
    }
  },
  methods: {
    // 获取地址列表
    getAddressData () {
      let params = {
        customerId: 'linzhanhong'
      }
      api.getOrderAddress(params)
      .then(res => {
        // console.log(res)
        this.addressList = res.body
      })
    },
    // 删除地址
    deleteAddress (addressId) {
      let params = {
        addressId: addressId
      }
      api.deleteAddress(params)
      .then(res => {
        if (res.code === 0) {
          this.getAddressData()
          _.alert('删除成功！')
        } else {
          _.alert('删除失败！')
        }
      })
    }
  },
  mounted () {
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
    margin-top: px2rem(20px);
    ul > li{
      border-top: px2rem(2px) solid #e6e6e6;
      border-bottom: px2rem(2px) solid #e6e6e6;   
      margin-top: px2rem(20px);   
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
          .del-btn {
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