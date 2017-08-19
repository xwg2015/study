<template>
  <div>
    <x-table full-bordered class="table-item" v-for="(item, index) in data" :key="index">
      <tr>
        <th colspan="2" width="20%">序号</th>
        <th colspan="4" width="40%">班组</th>
        <th colspan="4" width="40%">检查区段</th>
      </tr>
      <tr>
        <td colspan="2">{{item.id}}</td>
        <td colspan="4">{{item.teams}}</td>
        <td colspan="4">{{item.stations}}</td>
      </tr>
      <tr>
        <th colspan="4" width="40%">最晚检查时间</th>
        <th colspan="4" width="40%">上一次检查时间</th>
        <th colspan="2" width="20%">今日检查</th>
      </tr>
      <tr>
        <td colspan="4"><span v-if="item.plan_time">{{item.plan_time.substr(0, 10)}}</span></td>
        <td colspan="4"><span v-if="item.history[0]">{{item.history[0].date.substr(0, 10)}}</span></td>
        <td colspan="2">
        <x-button mini plain type="primary" @click.native="checkFn(item.id)" :class="`btn-status${item.status}`">打卡</x-button>
        </td>
      </tr>
      </tr>
      <tr>
        <th colspan="5">备注</th>
        <th colspan="5">历史检查时间</th>
      </tr>
      <tr>
        <td colspan="5">
          <span :class="`text-status${item.status}`">{{item.description}}</span>
        </td>
        <td colspan="5">
        <x-button mini @click.native="handleMore(index, data)" v-if="item.history.length">查看</x-button>
        <span v-else>无</span>
        </td>
      </tr>
    </x-table>
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
  import { XTable, XButton, XDialog, TransferDomDirective as TransferDom, Timeline, TimelineItem, Grid, GridItem } from 'vux'

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
      }
    }
  }
</script>

<style lang="less" scoped>
  .text-status1 { color: #1aad19 }
  .text-status2 { color: #ffe26d }
  .text-status3 { color: #F43530 }

  .btn-status1 {
    color: #1aad19;
    border-color: #1aad19;
  }
  .btn-status2 {
    color: #ffe26d;
    border-color: #ffe26d;
  }
  .btn-status3 {
    color: #F43530;
    border-color: #F43530;
  }
</style>

