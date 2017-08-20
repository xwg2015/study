<template>
  <section class="page-check" v-if="checkInfo.list">
    <group>
      <cell title="当前位置" :value="checkInfo.tableNameCh"></cell>
      <cell title="检查周期" :value="`${checkInfo.circleD}天`"></cell>
      <selector title="排序方式" :options="orderList" v-model="order" @on-change="changeOrder"></selector>
    </group> 
    <div class="table-wrap">
      <VCard :data="checkInfo.list" :type="checkInfo.type" tab="check" :check-fn="handleCheck"></VCard>
      <divider v-if="checkInfo.list.length">我是有底线的</divider>
      <divider v-else>暂无可检查的项目</divider>
    </div>
  </section>
</template>

<script>
import { Group, Cell, Selector, Divider } from 'vux'
import { mapState, mapActions } from 'vuex'
import VCard from './public/VCard'

export default {
  name: 'check',
  components: {
    Group,
    Cell,
    Selector,
    Divider,
    VCard
  },
  data () {
    return {
      filter: false,
      order: '0',
      orderList: [
        {
          key: '0',
          value: '默认排序'
        },
        {
          key: '1',
          value: '最晚检查时间排序'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      isLogin: state => state.isLogin,
      location: state => state.location,
      checkInfo: state => state.checkInfo,
      trackChoose: state => state.trackChoose
    })
  },
  methods: {
    ...mapActions([
      'GetCheckList',
      'Check'
    ]),
    handleCheck (id) {
      console.log(id)
      const _this = this
      this.$vux.confirm.show({
        content: `今天${new Date().toLocaleDateString()}, 确认打卡吗？`,
        onCancel () {
          _this.$vux.confirm.hide()
        },
        onConfirm () {
          let data = {
            id: id,
            table: _this.trackChoose[1]
          }
          _this.Check(data)
        }
      })
    },
    changeOrder (val) {
      let data = {
        table: this.trackChoose[1],
        order: val
      }
      this.GetCheckList(data)
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
