<template>
  <section class="page-way">
    <ul class="list">
      <li class="item" @click="handleItem('airplane')">
        <div class="inner">
          <i class="icon iconfont icon-feiji"></i>
          <span>在飞机上</span>
        </div>
      </li>
      <li class="item">
        <div class="inner">
          <i class="icon iconfont icon-huoche"></i>
          <span>在火车上</span>
        </div>
      </li>
      <li class="item">
        <div class="inner">
          <i class="icon iconfont icon-lunchuan"></i>
          <span>在轮船上</span>
        </div>
      </li>
      <li class="item">
        <div class="inner">
          <i class="icon iconfont icon-gongjiaoche"></i>
          <span>在大巴上</span>
        </div>
      </li>
      <li class="item">
        <div class="inner">
          <i class="icon iconfont icon-shizhong"></i>
          <span>在徒步中</span>
        </div>
      </li>
      <li class="item">
        <div class="inner">
          <i class="icon iconfont icon-dangdi"></i>
          <span>已到目的地</span>
        </div> 
      </li>
    </ul>
    <div v-transfer-dom>
      <x-dialog v-model="dialog" class="dialog">
        <div class="hd">填写信息</div>
        <div class="bd">
          <template v-if="curWay === 'airplane'">
            <group title="航班号">
              <x-input title="航班号"></x-input>
            </group>
          </template>
        </div>
        <div class="ft">
          <span @click="dialog = false">关 闭</span>
          <span>确 认</span>
        </div>
      </x-dialog>
    </div>
  </section>
</template>

<script>
  import { XDialog, Group, XInput, TransferDomDirective as TransferDom } from 'vux'

  export default {
    directives: {
      TransferDom
    },
    components: {
      XDialog,
      Group,
      XInput
    },
    data () {
      return {
        dialog: false,
        curWay: '',
        test: 1
      }
    },
    methods: {
      handleItem (way) {
        this.curWay = way
        this.dialog = true
      }
    }
  }
</script>

<style lang="less" scoped>
@import '~vux/src/styles/close';
  .dialog {
    .weui-dialog{
      border-radius: 8px;
      padding-bottom: 8px;
    }
    .hd {
      line-height: 40px;
      color: #666;
    }
    .bd {
    }
    .ft {
      display: flex;
      justify-content: center;
      line-height: 40px;
      color: #666;
    }
    .ft span {
      width: 50%;
    }
    .ft span:first-child {
      border-right: 1px solid #D9D9D9
    }
  }
</style>

<style lang="stylus">
  .page-way
    height: 100%
    background-color #fff
    .list
      display flex
      height 100%
      flex-direction column
    .item
      flex 1
      padding 10px
    .inner
      display flex
      justify-content center
      align-items center
      height 100%
      background-color #7e57c2
      border-radius 4px
      span
        font-size 24px
        color #fff
      &:active
        background-color rgba(126,87,194,.8)
    .iconfont
      margin-right 10px
      font-size 24px
      color #fff
</style>
