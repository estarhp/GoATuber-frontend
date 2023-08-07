<template>
  <router-view></router-view>
  <SoundRecord></SoundRecord>
</template>

<script setup>

import {onBeforeUnmount,onMounted,onBeforeMount} from "vue";
import {initWebSocket} from "./ws/index.js";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import SoundRecord from "./components/SoundRecord.vue";
const store = useStore()
const router = useRouter()

onBeforeMount(()=>{
  initWebSocket()
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
  window.websocket.close()
  //离开后断开连接
})
</script>

<style>





</style>
