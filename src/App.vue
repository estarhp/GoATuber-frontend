<template>
  <router-view></router-view>
</template>

<script setup>

import {onBeforeMount, onBeforeUnmount} from "vue";
import initWebSocket from "./ws/index.js";
import {useStore} from "vuex";
const store = useStore()

onBeforeMount(()=> {
  // init the ws
  store.state.websocket = initWebSocket()
})
onBeforeUnmount(()=>{
  store.state.websocket.close();
  //离开后断开连接
})
</script>

<style>





</style>
