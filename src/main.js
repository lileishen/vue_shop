import Vue from 'vue'
import App from './App.vue' // 根组件
import router from './router' // l路由
import './plugins/element.js'
import './assets/css/global.css' // 全局样式
import './assets/css/fonts/iconfont.css' // 字体图标
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/' // 配置请求的根路径
// axios请求拦截,获取权限
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token');
  // console.log('******************config******************');
  // console.log(config);
  // 最后必须return config
  return config;
});
Vue.prototype.$http = axios
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
