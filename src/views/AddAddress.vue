<template>
  <div class="add-wrap">
    <div class="list-wrap">
      <div class="addlist">
        <p>收件人</p>
        <input type="text" v-model="consignee">
      </div>
      <div class="addlist">
        <p>联系电话</p>
        <input type="text" v-model="phone">
      </div>
      <div class="addlist">
        <p>收货地址</p>
        <input type="text" v-model="address">
      </div>
      <div class="addlist">
        <p>邮政编码</p>
        <input type="text" v-model="postcode">
      </div>
      <div class="bottom-btn">
        <button @click="addAddress">添加地址</button>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/fetch'
import * as _ from '@/util/tool'

export default {
  name: 'AdddAddress',
  data () {
    return {
      consignee: '',
      phone: '',
      address: '',
      postcode: ''
    }
  },
  methods: {
    addAddress () {
      let _this = this
      if (this.consignee === '') {
        _.alert('请输入收件人')
        return
      }
      if (this.consignee === '') {
        _.alert('请输入联系电话')
        return
      }
      if (this.consignee === '') {
        _.alert('请输入收货地址')
        return
      }
      if (this.consignee === '') {
        _.alert('请输入邮政编码')
        return
      }
      let params = {
        consignee: this.consignee,
        phone: this.phone,
        address: this.address,
        postcode: this.postcode,
        customerId: 'linzhanhong',
        insertTime: '2018-01-05 22:56:33'
      }
      api.addOrderAddress(params)
      .then(res => {
        // console.log(res)
        if (res.code === 0) {
          _.alert('添加成功！')
          setTimeout(function () {
            _this.$router.push('/address')
          }, 1500)
        } else {
          _.alert('添加失败！')
        }
      })
    }
  },
  mounted () {
    var windheight = window.innerHeight
    var bottomx = document.getElementsByClassName('bottom-btn')
    console.log(windheight, bottomx)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../assets/css/function';
.add-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .list-wrap {
    width: 96%;
    display: flex;
    flex-direction: column;
    margin-top: px2rem(20px); 
    .addlist {
      height: px2rem(140px);
      margin: px2rem(10px);
      text-align: center;
      input, p {
        margin: px2rem(10px);
        text-align: left;
        font-size: 16px;      
      }
      input {
        width: 100%;
        height: px2rem(70px);
        border: px2rem(2px) solid #ececec;
      }
    }
  }
}
</style>