<template>
  <div>
    <div full-bordered class="table-item" v-for="(item, index) in data" :key="index">
      <table width="100%" class="table">
        <tr>
          <th colspan="2">序号</th>
          <th colspan="4">班组</th>
          <th colspan="4">
            <span v-if="type === 1">检查区段</span>
            <span v-else>车站设备编号</span>
          </th>
        </tr>
        <tr>
          <td colspan="2" width="10%">{{index + 1}}</td>
          <td colspan="4" width="45%">{{item.teams}}</td>
          <td colspan="4" width="45%">
            <span v-if="type === 1">{{item.stations}}</span>
            <span v-else>{{item.station}}—{{item.code}}</span>
          </td>
        </tr>
      </table>
      <table width="100%" class="table" v-if="tab === 'check'" key="check">
        <tr v-if="tab === 'check'" key="check">
          <template >
            <th colspan="4">最晚检查时间</th>
            <th colspan="4">上一次检查时间</th>
            <th colspan="2">本次检查</th>
          </template>
          <template v-if="tab === 'summary'">
            <th colspan="5">最晚检查时间</th>
            <th colspan="5">上一次检查时间</th>
          </template>
        </tr>
        <tr>
          <template v-if="tab === 'check'" >
            <td colspan="4" width="35%"><span v-if="item.plan_time">{{item.plan_time.substr(0, 10)}}</span></td>
            <td colspan="4" width="35%">
              <span v-if="item.history[0]">{{item.history[0].date.substr(0, 10)}}</span>
              <span v-else class="text-no">无</span>
            </td>
            <td colspan="2" width="30%">
              <span v-if="item.history[0] && dateFormat(new Date()) === item.history[0].date.substr(0, 10)" :class="`text-status${item.status}`">今日已打卡</span>
              <x-button mini plain type="primary" @click.native="checkFn(item.id)" :class="`btn-status${item.status}`" v-else>打卡</x-button>
            </td>
          </template>
          <template v-if="tab === 'summary'">
            <td colspan="5" width="50%"><span v-if="item.plan_time">{{item.plan_time.substr(0, 10)}}</span></td>
            <td colspan="5" width="50%">
              <span v-if="item.history[0]">{{item.history[0].date.substr(0, 10)}}</span>
              <span v-else class="text-no">无</span>
            </td>
          </template>
        </tr>
      </table>
      <table width="100%" class="table" v-if="tab === 'check'" key="check">
        <tr>
          <th colspan="5">备注</th>
          <th colspan="5">历史检查时间</th>
        </tr>
        <tr> 
          <td colspan="5" width="50%">
            <span :class="`text-status${item.status}`">{{item.description}}</span>
          </td>
          <td colspan="5" width="50%">
            <x-button mini @click.native="handleMore(index, data)" v-if="item.history.length">查看</x-button>
            <span v-else class="text-no">无</span>
          </td>
        </tr>
      </table>
      <table width="100%" class="table" v-if="tab === 'summary'" key="summary">
        <tr>
          <th colspan="5">最晚检查时间</th>
          <th colspan="5">备注</th>
        </tr>
        <tr>
          <td colspan="5" width="50%"><span v-if="item.plan_time">{{item.plan_time.substr(0, 10)}}</span></td>
          <td colspan="5" width="50%">
            <span :class="`text-status${item.status}`">{{item.description}}</span>
          </td>
        </tr>
      </table>
    </div>
    <div v-transfer-dom>
      <x-dialog v-model="dialogMore" class="dialog" :scroll="false" hide-on-blur>
        <div class="bd">
          <timeline>
            <timeline-item v-for="(item, index) in historyCheck" :key="index">
              <h4 :class="[index === 0 ? 'recent' : '']">
                <span :class="`text-status${item.status}`">于 {{item.date.substr(0, 10)}} 检查</span>
              </h4>
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
</template>

<script>
  import { XTable, XButton, XDialog, TransferDomDirective as TransferDom, Timeline, TimelineItem, Grid, GridItem, dateFormat } from 'vux'

  export default {
    name: 'vcard',
    directives: {
      TransferDom
    },
    components: {
      XTable,
      XButton,
      XDialog,
      Timeline,
      TimelineItem,
      Grid,
      GridItem
    },
    props: {
      data: {
        type: Array,
        default: () => {
          return []
        }
      },
      checkFn: {
        type: Function,
        default: () => {
        }
      },
      type: {
        type: Number,
        default: 1
      },
      tab: {
        type: String,
        default: 'check'
      }
    },
    data () {
      return {
        dialogMore: false,
        historyCheck: []
      }
    },
    methods: {
      handleMore (index, list) {
        this.dialogMore = true
        this.historyCheck = list[index].history
        console.log(this.historyCheck)
      },
      dateFormat (time) {
        return dateFormat(time, 'YYYY-MM-DD')
      }
    }
  }
</script>

<style lang="less" scoped>
  .weui-btn_mini {
    padding: 0 0.8em;
    line-height: 1.6;
  }

  .more {
    color: #999;
  }

  .table-item {
    margin-top: 20px;
    border-bottom: 1px solid #eee;
  }

  .table {
    border-collapse: collapse;

    td, th {
      text-align: center;
      border: 1px solid #eee;
      border-bottom: none;
    }

    th {
      height: 25px;
      background-color: #f5f4f3;
      font-weight: normal;
      color: #a9a9b2;
    }

    td {
      height: 30px;
      color: #434341;
    }
  }

  .text-status1 { color: #1aad19; }
  .text-status2 { color: #f0ad4e; }
  .text-status3 { color: #d43f3a; }

  .btn-status1 {
    color: #1aad19;
    border-color: #1aad19;
  }
  .btn-status2 {
    color: #f0ad4e;
    border-color: #f0ad4e;
  }
  .btn-status2:active {
    color: rgba(240,173,78,0.6)!important;
    border-color: rgba(240,173,78,0.6)!important;
  }
  .btn-status3 {
    color: #d43f3a;
    border-color: #d43f3a;
  }
  .btn-status3:active {
    color: rgba(212,63,58,0.6)!important;
    border-color: rgba(212,63,58,0.6)!important;
  }
  .text-no {
    color: #999
  }
</style>

