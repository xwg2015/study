<template>
  <section class="page-check">
    <group>
      <cell title="当前位置" :value="location"></cell>
      <cell title="检查周期" value="30天"></cell>
      <selector title="排序方式" :options="orderList" v-model="order"></selector>
    </group> 
    <div class="table-wrap">
      <x-table full-bordered class="table-item" v-for="(item, index) in dataList" :key="index">
        <tr>
          <th colspan="2" width="20%">序号</th>
          <th colspan="4" width="40%">班组</th>
          <th colspan="4" width="40%">检查区段</th>
        </tr>
        <tr>
          <td colspan="2">{{item.key1}}</td>
          <td colspan="4">{{item.key2}}</td>
          <td colspan="4">{{item.key3}}</td>
        </tr>
        <tr>
          <th colspan="4" width="40%">最晚检查时间</th>
          <th colspan="4" width="40%">上一次检查时间</th>
          <th colspan="2" width="20%">今日检查</th>
        </tr>
        <tr>
          <td colspan="4">{{item.key4}}</td>
          <td colspan="4">{{item.key7[0]}}</td>
          <td colspan="2">
            <x-button mini plain type="primary" @click.native="handleCheck">打卡</x-button>
          </td>
        </tr>
        <tr>
          <th colspan="5">备注</th>
          <th colspan="5">历史检查时间</th>
        </tr>
        <tr>
          <td colspan="5">{{item.key6}}</td>
          <td colspan="5">
            <x-button mini @click.native="handleMore(index, dataList)">查看</x-button>
          </td>
        </tr>
      </x-table>
      <divider>我是有底线的</divider>
      <div v-transfer-dom>
        <x-dialog v-model="dialogMore" class="dialog" :scroll="false" hide-on-blur>
          <div class="bd">
            <timeline>
              <timeline-item v-for="(i, index) in historyCheck" :key="index">
                <h4 :class="[i === 0 ? 'recent' : '']">xxx 于 {{i}} 已检查</h4>
              </timeline-item>
            </timeline>
          </div>
          <div class="ft">
            <grid :rows="1">
              <grid-item>
                <span class="close" @click="dialogMore = false">关闭</span>
              </grid-item>
            </grid>
          </div>
        </x-dialog>
      </div>
    </div>
  </section>
</template>

<script>
import { XTable, XButton, Group, Cell, XDialog, TransferDomDirective as TransferDom, Timeline, TimelineItem, Grid, GridItem, Selector, Divider } from 'vux'
import { mapState } from 'vuex'

export default {
  name: 'check',
  directives: {
    TransferDom
  },
  components: {
    XTable,
    XButton,
    Group,
    Cell,
    XDialog,
    Timeline,
    TimelineItem,
    Grid,
    GridItem,
    Selector,
    Divider
  },
  data () {
    return {
      dialogMore: false,
      filter: false,
      historyCheck: [],
      order: '1',
      orderList: [
        {
          key: '1',
          value: '默认排序'
        },
        {
          key: '2',
          value: '时间排序'
        }
      ],
      dataList: [
        {
          key1: 1,
          key2: '戈阳线路工区1',
          key3: '533.000-539.000',
          key4: '2017-08-30',
          key5: '',
          key6: '剩余16天',
          key7: ['2017-07-01', '2017-07-31', '2017-06-20', '2017-06-01']
        },
        {
          key1: 2,
          key2: '戈阳线路工区2',
          key3: '533.000-539.000',
          key4: '2017-08-30',
          key5: '2017-08-18',
          key6: '剩余12天',
          key7: ['2017-07-01', '2017-07-31']
        },
        {
          key1: 3,
          key2: '戈阳线路工区3',
          key3: '533.000-539.000',
          key4: '2017-08-12',
          key5: '',
          key6: '已超时2天',
          key7: ['2017-07-01']
        },
        {
          key1: 4,
          key2: '戈阳线路工区3',
          key3: '533.000-539.000',
          key4: '2017-08-17',
          key5: '',
          key6: '剩余3天',
          key7: ['2017-07-01']
        }
      ]
    }
  },
  computed: {
    ...mapState({
      isLogin: state => state.isLogin,
      location: state => state.location
    })
  },
  mounted () {
  },
  methods: {
    handleCheck () {
      const _this = this
      this.$vux.confirm.show({
        content: '今天是2017-08-28，距离下一次检查还剩5天，确定打卡？',
        onCancel () {
          _this.$vux.confirm.hide()
        },
        onConfirm () {
          console.log(1)
        }
      })
    },
    handleMore (index, list) {
      this.dialogMore = true
      this.historyCheck = list[index].key7
    }
  }
}
</script>

<style lang="less">
  .page-check {
    background-color: #fff;
    z-index: 10;
    
    .table-wrap {
      padding: 0 10px;

      .table-item {
        margin-top: 20px;
        box-shadow: 2px 2px solid rgba(0,0,0,0.5)
      }

      .vux-table {
        line-height: 1.6
      }

      .weui-btn_mini {
        padding: 0 0.8em;
        line-height: 1.6;
      }

     .vux-table th {
        z-index: -1;
      }

      .more {
        color: #999;
      }

      th {
        height: 25px;
        background-color: #f5f4f3;
        color: #a9a9b2;
      }

      td {
        height: 30px;
        color: #434341;
      }
    }

    .weui-select {
      color: #999;
      direction: rtl;
    }

    .vux-divider {
      margin: 10px 0;
      color: #999;
    }
  }

  .weui-mask {
    width: 100%;
  }
</style>
