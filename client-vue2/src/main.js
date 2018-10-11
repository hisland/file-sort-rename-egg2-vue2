import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import layoutUpDown from './components/layoutUpDown/layoutUpDown.vue'
Vue.component('layoutUpDown', layoutUpDown)

new Vue({
  render: h => h(App),
}).$mount('#app')
