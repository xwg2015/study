<template>
  <section class="page-way">
    <ul class="list">
      <li class="item" @click="handleItem('Airplane')">
        <div class="inner">
          <i class="icon iconfont icon-feiji"></i>
          <span>在飞机上</span>
        </div>
      </li>
      <li class="item" @click="handleItem('Train')">
        <div class="inner">
          <i class="icon iconfont icon-huoche"></i>
          <span>在火车上</span>
        </div>
      </li>
      <li class="item" @click="handleItem('Ship')">
        <div class="inner">
          <i class="icon iconfont icon-lunchuan"></i>
          <span>在轮船上</span>
        </div>
      </li>
      <li class="item" @click="handleItem('Bus')">
        <div class="inner">
          <i class="icon iconfont icon-gongjiaoche"></i>
          <span>在大巴上</span>
        </div>
      </li>
      <li class="item" @click="handleItem('Foot')">
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
          <template v-if="curWay === 'Airplane'">
            <group>
              <x-input v-model="flight" title="航班" placeholder="测试提示：CZ3544"></x-input>
            </group>
          </template>
          <template v-if="curWay === 'Train'">
            <group>
              <x-input v-model="flight" title="车次" placeholder="测试提示：CZ3544"></x-input>
            </group>
          </template>
          <template v-if="curWay === 'Ship'">
            <group>
              <x-input v-model="flight" title="航次" placeholder="测试提示：CZ3544"></x-input>
            </group>
          </template>
          <template v-if="curWay === 'Bus'">
            <group>
              <x-input v-model="flight" title="巴士型号" placeholder="测试提示：CZ3544"></x-input>
            </group>
          </template>
          <template v-if="curWay === 'Foot'">
            地图定位
          </template>
        </div>
        <div class="ft">
          <span class="close" @click="dialog = false">关 闭</span>
          <span class="confirm" @click="confirm">确 认</span>
        </div>
      </x-dialog>
    </div>
    <router-view></router-view>  
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
        flight: ''
      }
    },
    methods: {
      handleItem (way) {
        this.curWay = way
        this.dialog = true
      },
      confirm () {
        if (this.flight === 'CZ3544') {
          this.$router.push({
            name: this.curWay
          })
        } else {
          this.flight = ''
          this.$vux.toast.show({
            type: 'text',
            text: '查无该航班',
            position: 'middle'
          })
        }
      }
    }
  }
</script>

<style lang="less">
  .dialog {
    .weui-dialog{
      border-radius: 4px;
    }
    .weui-cells {
      margin-top: 0;
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
    .close:active, .confirm:active {
      background-color: rgba(0,0,0,0.1)
    }
  }
  .weui-toast {
    z-index: 5001
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
