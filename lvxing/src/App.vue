<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  @import './styles/font/iconfont.css';
</style>

<style lang="stylus">
  h1, h2, h3, h4, h5
    font-size 14px
    font-weight normal
  *
    margin 0
    padding 0
  html, body, #app
    height 100%
  body
    font-family '微软雅黑'
  li
    list-style none
</style>

