import Vue from 'vue'
import App from './App.vue'
import RangocoldUI from "./index.js"

Vue.config.productionTip = false
Vue.use(RangocoldUI)

new Vue({
  render: h => h(App),
}).$mount('#app')
