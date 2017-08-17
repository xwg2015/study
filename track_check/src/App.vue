<template>
  <div id="app" style="height: 100%;">
    <x-header class="header" :left-options="{showBack: false}" v-if="isLogin">
      {{title}}
      <a slot="right" href="javascript:;" @click="dialog = true">切换</a></x-header>
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
    <div v-transfer-dom>
      <x-dialog v-model="dialog" class="dialog" hide-on-blur>
        <div class="bd">
          <picker :data="trackList" :columns=2 v-model="trackChoose"></picker>
        </div>
        <div class="ft">
          <grid :rows="2">
            <grid-item>
              <span class="close" @click="dialog = false">关闭</span>
            </grid-item>
            <grid-item>
              <span class="confirm" @click="handleConfirm">确认</span>
            </grid-item>
          </grid>
        </div>
      </x-dialog>
    </div>
  </div>
</template>

<script>
import { XHeader, Tabbar, TabbarItem, XDialog, TransferDomDirective as TransferDom, Picker, Grid, GridItem } from 'vux'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'app',
  directives: {
    TransferDom
  },
  components: {
    XHeader,
    Tabbar,
    TabbarItem,
    XDialog,
    Picker,
    Grid,
    GridItem
  },
  data () {
    return {
      index: 0,
      title: '',
      dialog: false,
      className: 'left-silde',
      trackChoose: ['鹰潭北线路车间', '区间线路结构检查'],
      trackList: [
        {
          name: '萍乡东线路车间',
          value: '萍乡东线路车间',
          parent: 0
        },
        {
          name: '萍乡西线路车间',
          value: '萍乡西线路车间',
          parent: 0
        },
        {
          name: '萍乡南线路车间',
          value: '萍乡南线路车间',
          parent: 0
        },
        {
          name: '萍乡北线路车间',
          value: '萍乡北线路车间',
          parent: 0
        },
        {
          name: '区间线路结构检查',
          value: '区间线路结构检查',
          parent: '萍乡东线路车间'
        },
        {
          name: '区间线路仪检',
          value: '区间线路仪检',
          parent: '萍乡东线路车间'
        },
        {
          name: '区间岔道仪检',
          value: '区间岔道仪检',
          parent: '萍乡东线路车间'
        },
        {
          name: '站内胶X绝缘接口电气化性能检查',
          value: '站内胶X绝缘接口电气化性能检查',
          parent: '萍乡东线路车间'
        },
        {
          name: '南线路检查',
          value: '南线路检查',
          parent: '萍乡南线路车间'
        },
        {
          name: '西线路检查',
          value: '西线路检查',
          parent: '萍乡西线路车间'
        },
        {
          name: '北线路检查',
          value: '北线路检查',
          parent: '萍乡北线路车间'
        }
      ]
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
    this.title = this.trackChoose[0]
    this.ChangeLocation(this.trackChoose[1])
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
      console.log(this.trackChoose)
      this.title = `${this.trackChoose[0]}`
      this.dialog = false
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
  -webkit-tap-highlight-color: rgba(0,0,0);
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
