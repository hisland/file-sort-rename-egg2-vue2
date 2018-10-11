import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import layoutUpDown from './components/layoutUpDown/layoutUpDown.vue'
Vue.component('layoutUpDown', layoutUpDown)

import draggable from 'vuedraggable'
Vue.component('draggable', draggable)

new Vue({
  render: h => h(App),
}).$mount('#app')
