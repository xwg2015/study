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
      }
    },
    computed: {
      ...mapState({
        isLogin: state => state.isLogin,
        dialogSwitchCache: state => state.dialog.switch,
        title: state => state.title,
        pathName: state => state.pathName,
        trackList: state => state.trackList,
        trackChooseCache: state => state.trackChoose
      }),
      dialogSwitch: {
        get () {
          return this.dialogSwitchCache
        },
        set (val) {
          this.ChangeDialogSwitch(val)
        }
      },
      trackChoose: {
        get () {
          return this.trackChooseCache
        },
        set (val) {
          this.ChangeTrackChoose(val)
        }
      }
    },
    watch: {
      $route (to, from) {
        this.ChangePathName(to.name)
      }
    },
    mounted () {
      this.ChangePathName(this.$route.name)
      this.GetTrackList()
    },
    methods: {
      ...mapActions([
        'ChangeTitle',
        'ChangePathName',
        'ChangeDialogSwitch',
        'GetTrackList',
        'GetCheckList',
        'ChangeTrackChoose'
      ]),
      openDialog () {
        this.ChangeDialogSwitch(true)
      },
      closeDialog () {
        this.ChangeDialogSwitch(false)
      },
      handleConfirm () {
        let data = {
          table: this.trackChoose[1],
          order: this.order
        }
        this.GetCheckList(data)
      }
    }
  }
</script>

<style lang="less">
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
      color: #999
    }
    .confirm {
      color: #09BB07
    }
  }
</style>
