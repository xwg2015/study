<template>
  <section>
		请开始你的表演
  </section>
</template>

<script>
  import {mapActions, mapState} from 'vuex'
  import {MapActionNameSpace} from '../../lib/namespage'

  export default {
    data () {
      return {
      }
    },
    mounted () {
    },
    computed: {
      ...mapState({
      })
    },
    methods: {
      ...mapActions(MapActionNameSpace([XXX], {
      }))
    }
  }
</script>

<style lang="stylus" scoped>
</style>
