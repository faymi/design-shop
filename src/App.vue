<template>
  <div id="app">
    <v-alert v-show="showAlert"></v-alert>
    <v-loading v-show="showLoading"></v-loading>
    <div class="container">
      <transition :name="transitionName" mode="out-in">
        <router-view class="child-view"></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import alert from '@/components/Alert'
import loading from '@/components/Loading'
import { mapGetters } from 'vuex'
export default {
  name: 'app',
  components: {
    'v-alert': alert,
    'v-loading': loading
  },
  data () {
    return {
      transitionName: 'slide-left'
    }
  },
  computed: {
    ...mapGetters([
      'showAlert',
      'showLoading'
    ])
  },
  mounted () {
  },
  watch: {
    '$route' (to, from) {
      const list = ['list', 'goods-detail', 'customized', 'total', 'add-to-cart', 'address', 'add-address', 'shop-cart', 'pay', 'pay-success', 'user', 'phone-call']
      const toDepth = to.path.split('/')
      const fromDepth = from.path.split('/')
      this.transitionName = list.indexOf(toDepth[1]) < list.indexOf(fromDepth[1]) ? 'slide-right' : 'slide-left'
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  .container {
		flex: 1;
		overflow: auto;
		overflow-x: hidden;
  }
  /* 上面是为了保证滑动的时候不出现抖动情况 */
  .child-view {
    position: absolute;
    left:0;
    top: 0;
    height: 100%;
    width: 100%;
    transition: all .5s cubic-bezier(.55,0,.1,1);
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  /* 当child-view的内容过多时会撑开child-view使得内部能够滚动 */
  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
    // transition-delay: .5s;
    // -webkit-transition-delay: .5s;
  }
  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-100%, 0);
    transform: translate(-100%, 0);
    // transition-delay: .5s;
    // -webkit-transition-delay: .5s;
  }
  .slide-enter-active {
    -webkit-transition: all .3s ease;
    transition: all .3s ease;
  }
  .slide-leave-active {
    -webkit-transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
}
</style>
