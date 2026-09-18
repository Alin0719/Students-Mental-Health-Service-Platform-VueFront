import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import 'font-awesome/css/font-awesome.min.css'
import Vue2Editor from "vue2-editor"
//import '@/api/websocket' // 全局引入 WebSocket 通讯组件
 

Vue.use(Vue2Editor);
Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  render: h => h(App),
  router:router,
}).$mount('#app')
