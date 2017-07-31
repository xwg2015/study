<template>
  <section class="page-index">
    <div class="bg"></div>
    <header class="header">
      <h1>侣行</h1>
    </header>
    <main class="main">
      <div class="avater" :style="{ backgroundImage: 'url('+ info.avater +')' }"></div>
      <h2 class="username">欢迎回来，<br/>{{ info.username }}</h2>
    </main>
    <footer class="footer">
      <mu-raised-button label="在路上" class="demo-raised-button" labelPosition="after" primary>
        <i class="mdi mdi-road mdi-18px"></i>
      </mu-raised-button>
      <mu-raised-button label="目的地" class="demo-raised-button" labelPosition="after" primary>
        <i class="mdi mdi-map-marker-radius mdi-18px"></i>
      </mu-raised-button>
    </footer>
  </section>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      info: {
        username: '喵姬的专属铲屎官',
        avater: '//i0.hdslb.com/bfs/face/c12a6f15ae8b1ecc7a4fdd1ec555f09882d2dd04.jpg'
      }
    }
  }
}
</script>

<style lang="stylus">
  .page-index
    display flex
    flex-direction column
    height 100%
    h1
      text-indent 20px
      font-size 24px
      color #7e57c2
    .bg
      position absolute
      left 0
      right 0
      width 100%
      height 100%
      background-image url('../static/bg.jpeg')
      filter blur(2px)
      z-index -1
    .header
      flex 2
    .main
      display flex
      flex 4
      flex-direction column
      align-items center
      justify-content center
      .avater
        width 100px
        height 100px
        margin-bottom 10px
        background-size cover
        border 2px solid #fff
        border-radius 50%
        overflow hidden
      .username
        text-align center
        font-size 16px
        color rgba(0,0,0,.6)
    .footer
      display flex
      flex 6
      align-items center
      justify-content center
    .mdi
      margin-left 20px
    .mu-raised-button
      margin: 0 10px
    .mu-raised-button-label
      padding-left 8px
      padding-right 20px
</style>
