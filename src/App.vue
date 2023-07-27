<template>
  <router-view></router-view>
</template>

<script setup>

import {onBeforeMount, onBeforeUnmount,onMounted} from "vue";
import initWebSocket from "./ws/index.js";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
const store = useStore()
const router = useRouter()

onBeforeMount(()=> {
  // init the ws
  store.state.websocket = initWebSocket()
})
onMounted(async ()=>{
  //获取model name 和 type
  await store.dispatch("getModelType")
  const modelType = store.state.modelType
  switch (modelType.type){
    case 1 :{
      await router.push({
         name:"live2d",
        params:{
          modelName:modelType.name
        }
      })
      break
    }
    case 2 :{
      await router.push({
        name: "vrm",
        params:{
          modelName:modelType.name
        }
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
