<template>
  <router-view></router-view>
</template>

<script setup>

import {onBeforeMount, onBeforeUnmount} from "vue";
import initWebSocket from "./ws/index.js";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
const store = useStore()
const router = useRouter()

onBeforeMount(()=> {
  // init the ws
  store.state.websocket = initWebSocket()
})
onBeforeMount(async ()=>{
   await store.dispatch("getModelType")
   const modelType = store.state.modelType
  console.log(123)
  switch (modelType.type){
    case 1 :{
      await router.push({
        path: "/live2d"
      })
      break
    }
    case 2 :{
      await router.push({
        path: "/vrm"
      })
      break
    }
  }

})
onBeforeUnmount(()=>{
  store.state.websocket.close();
  //离开后断开连接
})
</script>

<style>





</style>
