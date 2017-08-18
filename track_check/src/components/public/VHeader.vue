<template>
  <header class="mod-header" v-if="isLogin">
    <x-header class="header" :left-options="{showBack: false}" v-if="pathName === 'check'" key="check">
      {{title}}
      <a slot="right" href="javascript:;" @click="openDialog">切换</a>
    </x-header>
    <x-header class="header" :left-options="{showBack: false}" v-if="pathName === 'summary'" key="summary">
      所有检查项目汇总
    </x-header>
    <div v-transfer-dom>
      <x-dialog v-model="dialogSwitch" class="dialog" hide-on-blur>
        <div class="bd">
          <picker :data="trackList" :columns=2 v-model="trackChoose"></picker>
        </div>
        <div class="ft">
          <grid :rows="2">
            <grid-item>
              <span class="close" @click="closeDialog">关闭</span>
            </grid-item>
            <grid-item>
              <span class="confirm" @click="handleConfirm">确认</span>
            </grid-item>
          </grid>
        </div>
      </x-dialog>
    </div>
  </header>
</template>

<script>
  import { XHeader, XDialog, TransferDomDirective as TransferDom, Picker, Grid, GridItem } from 'vux'
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'header',
    directives: {
      TransferDom
    },
    components: {
      XHeader,
      XDialog,
      Picker,
      Grid,
      GridItem
    },
    prop: {
    },
    data () {
      return {
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
    computed: {
      ...mapState({
        isLogin: state => state.isLogin,
        dialogSwitch: state => state.dialog.switch,
        title: state => state.title,
        pathName: state => state.pathName
      })
    },
    watch: {
      $route (to, from) {
        this.changeTitle(to.name)
        this.ChangePathName(to.name)
      }
    },
    mounted () {
      this.ChangePathName(this.$route.name)
      this.changeTitle(this.$route.name)
    },
    methods: {
      ...mapActions([
        'ChangeTitle',
        'ChangePathName',
        'ChangeDialogSwitch'
      ]),
      openDialog () {
        this.ChangeDialogSwitch(true)
      },
      closeDialog () {
        this.ChangeDialogSwitch(false)
      },
      changeTitle (pathName) {
        if (pathName === 'check') {
          this.ChangeTitle(this.trackChoose[0])
        }
      },
      handleConfirm () {
      }
    }
  }
</script>
