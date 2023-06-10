import Vue from 'vue'
import App from './App.vue'
import {Button, ButtonGroup, Drawer, Input, Message, Progress, Tooltip} from "element-ui";

import store from './store'


Vue.config.productionTip = false

// navigator.mediaDevices.getUserMedia({ audio: true });
Vue.use(Button)
Vue.use(Drawer)
Vue.use(Progress)
Vue.use(ButtonGroup)
Vue.use(Input)
Vue.use(Tooltip)




new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$message = Message;
  },
  store,


}).$mount('#app');




