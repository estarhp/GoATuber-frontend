<template>
  <div id="app" style="text-align: center;">
    <Drawer
    ></Drawer>
    <canvas ref="live2d"
            @mousedown="handleMouseDown"
            @mousemove="handleMouseMove"
            @mouseup="handleMouseUp"
            style="position: relative;"
    ></canvas>
  </div>
</template>

<script>


import { config } from './pixi-live2d-display';
import Drawer from "@/components/Drawer.vue";
import initWebSocket from "@/ws";
import {getWav,createAnalyser} from "@/openMouthY";
import createModel from "@/loadLive2d"


// log level
config.logLevel = config.LOG_LEVEL_WARNING; // LOG_LEVEL_VERBOSE, LOG_LEVEL_ERROR, LOG_LEVEL_NONE





export default {
  name:"app",
  components: {Drawer},
  data(){
  return{

    isDragging: false,
    lastX: 0,
    lastY: 0,
  }
  },
  mounted() {
    this.$on("start", getWav);

    (async () => {
      this.$store.state.app = await createModel(this.$store.state,this.$refs.live2d)

      createAnalyser()


    })()
    window.onresize = () => {
      this.$store.state.model4.x = this.$refs.live2d.clientWidth / 2 -this.$store.state.model4.width / 2
    }


    this.$store.state.live2d = this.$refs.live2d

    this.$refs.live2d.onclick=()=>{
      getWav({
        voice :"synthesize.wav",
        VType:1
      },this.$store.state)

    }

  }
  ,
  created() {
    this.$store.state.websocket = initWebSocket()

   setTimeout(()=>{
     this.$store.state.websocket.onmessage =
         (event) => {

           let data=JSON.parse(event.data)
           getWav(data)

         }
    })
  },
  destroyed() {
    this.$store.state.websocket.close(); //离开路由之后断开websocket连接
  },
  methods:{

    handleMouseDown(event) {
      this.isDragging = true;
      this.lastX = event.clientX;
      this.lastY = event.clientY;
    },
    handleMouseMove(event) {
      if (this.isDragging) {
        const deltaX = event.clientX - this.lastX;
        const deltaY = event.clientY - this.lastY;
        this.$refs.live2d.style.left = parseInt(this.$refs.live2d.style.left || 0) + deltaX + "px";
        this.$refs.live2d.style.top = parseInt(this.$refs.live2d.style.top || 0) + deltaY + "px";
        this.lastX = event.clientX;
        this.lastY = event.clientY;
      }
    },
    handleMouseUp() {
      this.isDragging = false;
      this.isDragging = false;
      this.isDragging = false;
    }



},


}


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
