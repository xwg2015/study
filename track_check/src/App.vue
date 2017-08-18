<template>
  <div id="app" style="height: 100%;">
    <VHeader></VHeader>
    <transition :name="className">
      <router-view :class="isLogin ? 'login-main' : 'unlogin-main'"></router-view>
    </transition>
    <tabbar v-model="index" v-if="isLogin" class="tabbar">
      <tabbar-item link="/check">
        <img slot="icon" src="./assets/icon-check.png">
        <img slot="icon-active" src="./assets/icon-check-active.png">
        <span slot="label">检查</span>
      </tabbar-item>
      <tabbar-item link="/summary">
        <img slot="icon" src="./assets/icon-summary.png">
        <img slot="icon-active" src="./assets/icon-summary-active.png">
        <span slot="label">汇总</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vux'
import { mapState, mapActions } from 'vuex'
import VHeader from './components/public/VHeader'

export default {
  name: 'app',
  components: {
    Tabbar,
    TabbarItem,
    VHeader
  },
  data () {
    return {
      index: 0,
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
  mounted () {
    // this.ChangeLocation(this.trackChoose[1])
    // this.scrollFix(document.querySelector('.login-main'))
  },
  computed: {
    ...mapState({
      isLogin: state => state.isLogin
    })
  },
  methods: {
    ...mapActions([
      'ChangeLocation'
    ]),
    handleConfirm () {
      this.title = `${this.trackChoose[0]}`
      this.dialog = false
    },
    scrollFix (elem) {
      var startTopScroll
      if (!elem) {
        return
      }
      elem.addEventListener('touchstart', function (event) {
        startTopScroll = elem.scrollTop
        if (startTopScroll <= 0) {
          elem.scrollTop = 1
        }
        if (startTopScroll + elem.offsetHeight >= elem.scrollHeight) {
          elem.scrollTop = elem.scrollHeight - elem.offsetHeight - 1
        }
      }, false)
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import './style/all.less';

@theme-color: #09BB07;
@font-color: #999;

html, body {
  height: 100%;
  width: 100%;
  font-size: 14px;
  color: @font-color;
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

.dialog {
  .weui-dialog {
    min-width: 300px;
    max-width: 80%;
  }
  .weui-grid {
    padding: 10px
  }
  .close, .confirm {
    display: block;
    width: 100%;
    height: 100%;
  }
  .close {
    color: @font-color
  }
  .confirm {
    color: @theme-color
  }
}

.tabbar {
  .weui-tabbar__label {
    font-size: 14px;
  }
}

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
