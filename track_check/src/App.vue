<template>
  <div id="app" style="height: 100%;">
    <VHeader v-if="isLogin"></VHeader>
    <transition :name="className">
      <router-view :class="isLogin ? 'login-main' : 'unlogin-main'"></router-view>
    </transition>
    <VFooter v-if="isLogin"></VFooter>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import VHeader from './components/public/VHeader'
import VFooter from './components/public/VFooter'

export default {
  name: 'app',
  components: {
    VHeader,
    VFooter
  },
  data () {
    return {
      className: 'left-silde'
    }
  },
  watch: {
    $route (to, from) {
      if (to.meta.index > from.meta.index) {
        this.className = 'left-silde'
      } else {
        this.className = 'right-silde'
      }
    }
  },
  created () {
    this.GetTrackList(this.$route.name)
  },
  computed: {
    ...mapState({
      isLogin: state => state.isLogin
    })
  },
  methods: {
    ...mapActions([
      'GetTrackList'
    ])
  }
}
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  @import './style/all.less';

  html, body {
    height: 100%;
    width: 100%;
    font-size: 14px;
    color: #999;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }

  .unlogin-main {
    height: 100%;
  }

  .login-main {
    position: absolute;
    left: 0;
    right: 0;
    top: 46px;
    bottom: 53px;
    width: 100%;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }

  .v-enter { opacity: 0; }
  .v-enter-to { opacity: 1; }
  .v-enter-active { transition: 0.5s;}

  .v-leave { opacity: 1; }
  .v-leave-to { opacity: 0; }
  .v-leave-active { transition: 0.5s;}


  .left-silde-enter {
    transform: translateX(100%)
  }
  .left-silde-enter-active, .left-silde-leave-active {
    transition: 0.5s;
  }
  .left-silde-leave-to {
    transform: translateX(-100%)
  }

  .right-silde-enter {
    transform: translateX(-100%)
  }
  .right-silde-enter-active, .right-silde-leave-active {
    transition: 0.5s;
  }
  .right-silde-leave-to {
    transform: translateX(100%)
  }
</style>
