<template>
  <section class="page-index">
    <div class="bg"></div>
    <div class="bg-fix"></div>
    <div class="logo">
      <div class="img-wrap">
        <img src="../assets/logo.jpg">
      </div>
      <h1>南昌西工务段<br/>线路设备周期性检查预警</h1>
    </div>
    <div class="form">
      <group class="group">
        <x-input title="账号" v-model="username" placeholder="请使用内部指定账号" ref="username" required></x-input>
        <x-input type="password" title="密码" v-model="password" ref="password" required></x-input>
        <x-input title="验证码" v-model="code" class="weui-cell_vcode" ref="code" required>
          <img slot="right" class="weui-vcode-img" :src="verifyCode" onclick="this.src+='?rand='+Math.random();">
        </x-input>
      </group>
      <x-button type="primary" :show-loading="loginLoading" @click.native="handleLogin" :disabled="valid">登录</x-button>
    </div>
  </section>
</template>

<script>
  import { Group, XInput, XButton } from 'vux'
  import { mapState, mapActions } from 'vuex'

  export default {
    components: {
      Group,
      XInput,
      XButton
    },
    data () {
      return {
        username: '',
        password: '',
        code: ''
      }
    },
    computed: {
      ...mapState({
        isLogin: state => state.isLogin,
        loginLoading: state => state.loginLoading,
        verifyCode: state => state.verifyCode
      }),
      valid () {
        if (!this.username || !this.password || !this.code) {
          return true
        } else {
          return false
        }
      }
    },
    methods: {
      ...mapActions([
        'Login'
      ]),
      handleLogin () {
        let data = {
          username: this.username,
          password: this.password,
          code: this.code
        }
        this.Login(data)
      }
    }
  }
</script>

<style lang="less">
  .page-index {
    display: flex;
    flex-direction: column;
    height: 100%;

    .bg {
      position: absolute;
      left: 0;
      right: 0;
      width: 100%;
      height: 100%;
      background-image: url('../assets/bg.jpg');
      background-size: cover;
      background-position: center;
      -webkit-filter: blur(2px);
      filter: blur(2px);
      z-index: -1;
    }

    .bg-fix {
      position: absolute;
      left: 0;
      right: 0;
      width: 100%;
      height: 100%;
      background-image: url('../assets/bg.jpg');
      background-size: cover;
      background-position: center;
      z-index: -2
    }

    .logo {
      display: flex;
      flex-direction: column;
      flex: 4;
      text-align: center;
      align-items: center;
      justify-content: center;
      color: #fff;
      text-shadow: 1px 1px 2px #FFF, 0 0 0 #000;
      letter-spacing: 2px;

      .img-wrap {
        width: 80px;
        height: 80px;
        margin-bottom: 20px;
        border-radius: 50%;
        overflow: hidden;

        img { max-width: 100%; }
      }
    }

    .form {
      flex: 6;
      padding: 0 20px;

      .group {
        margin-bottom: 20px;
      }
    }
  }
</style>
