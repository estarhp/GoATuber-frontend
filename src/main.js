import Vue from 'vue'
import App from './App.vue'
import {Button} from "element-ui";




Vue.config.productionTip = false

// navigator.mediaDevices.getUserMedia({ audio: true });
Vue.use(Button)

new Vue({
  render: h => h(App),
  beforeCreate() {

  }
}).$mount('#app')
