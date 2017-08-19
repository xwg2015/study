<template>
  <section class="page-check" v-if="checkInfo.list">
    <div class="table-wrap">
      <VCard :data="checkInfo.list" :type="checkInfo.type" tab="summary"></VCard>
      <divider v-if="checkInfo.list.length">我是有底线的</divider>
      <divider v-else>无数据</divider>
    </div>
  </section>
</template>

<script>
import { Divider } from 'vux'
import { mapState, mapActions } from 'vuex'
import VCard from './public/VCard'

export default {
  name: 'summary',
  components: {
    Divider,
    VCard
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      checkInfo: state => state.checkInfo
    })
  },
  mounted () {
    this.GetCheckList({ order: 2 })
  },
  methods: {
    ...mapActions([
      'GetCheckList'
    ])
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

