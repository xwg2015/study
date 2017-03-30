// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import element from './element';
import resource from './resource';
import vueHljs from 'vue-hljs/dist/vue-hljs.min';

export default new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router,
  element,
  resource,
  vueHljs
});
