<template>
  <div class="add-wrap">
    <div class="list-wrap">
      <!-- 绑定删除按钮 => :addressInfo = "{id: addressInfo.id} -->
      <van-address-edit
        show-postal
        show-delete
        show-search-result
        :is-saving="isSave"
        :area-list="areaList"
        :search-result="searchResult"
        @save="onSave"
        @delete="onDelete"
        @change-detail="onChangeDetail"
      />
      <!-- <div class="addlist">
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
      </div> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import api from '@/api/fetch'
import * as _ from '@/util/tool'
import areaList from '@/assets/area.json'

export default {
  name: 'AdddAddress',
  data () {
    return {
      consignee: '',
      phone: '',
      address: '',
      postcode: '',
      areaList,
      searchResult: [],
      isSave: false
    }
  },
  computed: {
    ...mapGetters({
      customerId: 'customerId'
    })
  },
  methods: {
    // 保存地址
    onSave (content) {
      let _this = this
      let params = {
        consignee: content.name,
        phone: content.tel,
        address: content.province + content.city + content.county + content.address_detail,
        postcode: content.postal_code,
        customerId: this.customerId,
        insertTime: this.moment().format('YYYY-MM-DD hh:mm:ss')
      }
      this.isSave = true
      api.addOrderAddress(params)
      .then(res => {
        if (res.code === 0) {
          this.isSave = false
          this.$toast('添加成功！')
          setTimeout(function () {
            _this.$router.back()
          }, 1500)
        } else {
          this.$toast('添加失败！')
        }
      })
    },
    onDelete () {
      this.$toast('delete')
    },
    onChangeDetail (val) {
      // if (val) {
      //   this.searchResult = [{
      //     name: '黄龙万科中心',
      //     address: '杭州市西湖区'
      //   }]
      // } else {
      //   this.searchResult = []
      // }
    },
    addAddress () {
      let _this = this
      if (this.consignee === '') {
        _.alert('请输入收件人')
        return
      }
      if (this.phone === '') {
        _.alert('请输入联系电话')
        return
      }
      if (this.address === '') {
        _.alert('请输入收货地址')
        return
      }
      if (this.postcode === '') {
        _.alert('请输入邮政编码')
        return
      }
      let params = {
        consignee: this.consignee,
        phone: this.phone,
        address: this.address,
        postcode: this.postcode,
        customerId: this.customerId,
        insertTime: this.moment().format('YYYY-MM-DD hh:mm:ss')
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
    width: 100%;
    // display: flex;
    // flex-direction: column;
    margin: 0 auto;
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