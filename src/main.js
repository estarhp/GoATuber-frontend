import Vue from 'vue'
import App from './App.vue'




Vue.config.productionTip = false

navigator.mediaDevices.getUserMedia({ audio: true });

new Vue({
  render: h => h(App),
  beforeCreate() {

  }
}).$mount('#app')
