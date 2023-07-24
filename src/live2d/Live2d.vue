<script setup lang="js">

import Drawer from "./Live2dDrawer.vue";
import {ref,onMounted} from "vue"
import { config } from './pixi-live2d-display';
import {createAnalyser} from "./openMouthY/index.js";
import createModel from "./loadLive2d/index.js"
import {useStore} from "vuex";
import {handleMouseDown,handleMouseMove,handleMouseUp} from "./drag/index.js"


// log level
config.logLevel = config.LOG_LEVEL_WARNING; // LOG_LEVEL_VERBOSE, LOG_LEVEL_ERROR, LOG_LEVEL_NONE

const live2d = ref(null)
const store = useStore()


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
</script>

<template>
    <Drawer modelType="live2d" ></Drawer>
    <canvas ref="live2d"
            @mousedown="handleMouseDown"
            @mousemove="handleMouseMove"
            @mouseup="handleMouseUp"
            style="position: relative;"
    ></canvas>
</template>

<style scoped>

</style>