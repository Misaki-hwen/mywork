import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import moment from 'moment'

Vue.config.productionTip = false

import http from './http'
Vue.prototype.$http = http

Vue.filter('fmtdate',(v) => {
  return moment(v).format('YYYY-MM-DD')
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
