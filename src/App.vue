<template>
  <div id="app" style="text-align: center;">
    <Drawer></Drawer>
    <canvas ref="live2d"
            @mousedown="handleMouseDown"
            @mousemove="handleMouseMove"
            @mouseup="handleMouseUp"
            style="position: relative;"
    ></canvas>
  </div>
</template>

<script setup>
import {ref,onMounted,onBeforeUnmount,onBeforeMount} from "vue"

import { config } from './pixi-live2d-display';
import Drawer from "./components/Drawer.vue";
import initWebSocket from "./ws";
import {createAnalyser} from "./openMouthY";
import createModel from "./loadLive2d"
import {useStore} from "vuex";


// log level
config.logLevel = config.LOG_LEVEL_WARNING; // LOG_LEVEL_VERBOSE, LOG_LEVEL_ERROR, LOG_LEVEL_NONE

const isDragging = ref(false)
const lastX = ref(0)
const lastY =ref(0)
const live2d = ref(null)
const store = useStore()

function handleMouseDown(event) {
  isDragging.value = true;
  lastX.value = event.clientX;
  lastY.value = event.clientY;
}

function handleMouseMove(event) {
  if (isDragging.value) {
    const deltaX = event.clientX - lastX.value;
    const deltaY = event.clientY - lastY.value;
    live2d.value.style.left = parseInt(live2d.value.style.left || 0) + deltaX + "px";
    live2d.value.style.top = parseInt(live2d.value.style.top || 0) + deltaY + "px";
    lastX.value = event.clientX;
    lastY.value  = event.clientY;
  }
}

function handleMouseUp() {
  isDragging.value = false;
  isDragging.value = false;
  isDragging.value = false;
}



//加载live2d模型
onMounted(
    async () => {
      store.state.app = await createModel(live2d.value)
      //create analyser
      createAnalyser()
      window.onresize = () => {
        store.state.model4.x = live2d.value.clientWidth / 2 - store.state.model4.width / 2
      }

      store.state.live2d =live2d.value
    }


)




// test the mouthOpen
//     this.$refs.live2d.onclick=()=>{
//       getWav({
//         voice :"synthesize.wav",
//         VType:1
//       },this.$store.state)

    // }


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

body {
  padding: 0;
  margin: 0;
  overflow: hidden;
  height: 100%;
  width: 100%;
  background-color: #01FE00;
  background-repeat: no-repeat;
  background-size: cover;
}



</style>
