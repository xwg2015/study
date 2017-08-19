<template>
  <footer class="mod-footer">
    <tabbar v-model="index" class="tabbar">
      <tabbar-item link="/check">
        <img slot="icon" src="../../assets/icon-check.png">
        <img slot="icon-active" src="../../assets/icon-check-active.png">
        <span slot="label">检查</span>
      </tabbar-item>
      <tabbar-item link="/summary">
        <img slot="icon" src="../../assets/icon-summary.png">
        <img slot="icon-active" src="../../assets/icon-summary-active.png">
        <span slot="label">汇总</span>
      </tabbar-item>
    </tabbar>
  </footer>
</template>

<script>
  import { Tabbar, TabbarItem } from 'vux'

  export default {
    name: 'footer',
    components: {
      Tabbar,
      TabbarItem
    },
    data () {
      return {
        index: 0
      }
    },
    created () {
      if (this.$route.name === 'check') {
        this.index = 0
      } else {
        this.index = 1
      }
    }
  }
</script>

<style lang="less">
  .tabbar {
    .weui-tabbar__label {
      font-size: 14px;
    }
  }
</style>
