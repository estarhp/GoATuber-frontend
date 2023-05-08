<template>
  <div id="app" style="text-align: center;" @mouseover.once="resume">
    <div class="button" @click="amplify" >放大</div>

    <div class="button" @click="reduce">缩小</div>
    <canvas ref="live2d"
            @mousedown="handleMouseDown"
            @mousemove="handleMouseMove"
            @mouseup="handleMouseUp"
            style="position: relative;"
    ></canvas>
  </div>
</template>

<script>

import * as PIXI from 'pixi.js';
import { Live2DModel } from 'pixi-live2d-display/cubism4';
import axios from "axios"
import { config } from 'pixi-live2d-display';

// log level
config.logLevel = config.LOG_LEVEL_WARNING; // LOG_LEVEL_VERBOSE, LOG_LEVEL_ERROR, LOG_LEVEL_NONE





export default {
  name:"app",
  data(){
  return{

   websock:"",
    model4:"",
    playing:false,
    audioCtx:"",
    analyser:"",
    frequencyData:"",
    o :80,
    isDragging: false,
    lastX: 0,
    lastY: 0,
    scale:1

  }
  },
  mounted() {
  window.PIXI=PIXI;


    this.$on("start",this.getWav);

    (async ()=>{
     await this.createModel()

      this.createAnalyser()


    })()

    window.onresize=()=>{


      this.model4.x=this.$refs.live2d.clientWidth/2-this.model4.width/2


    }


    // window.onclick=()=>{
    //   this.getWav("synthesize.wav")
    // }

  }
  ,
  created() {
    this.initWebSocket();

  },
  destroyed() {
    this.websock.close(); //离开路由之后断开websocket连接
  },
  methods:{
    resume(){
      this.audioCtx.resume()

    }
    ,
    reduce(){
      if(this.scale<=0.2){
        return
      }
      this.scale-=0.1
      this.model4.scale.set(this.scale)
      this.$refs.live2d.width=this.model4.width
      this.$refs.live2d.height=this.model4.height
      this.app.resizeTo=this.$refs.live2d
    },
    amplify(){
      if (this.scale>=1.5){
        return
      }
      this.scale+=0.1
      this.model4.scale.set(this.scale)
      this.$refs.live2d.width=this.model4.width
      this.$refs.live2d.height=this.model4.height
      this.app.resizeTo=this.$refs.live2d
    },

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
    handleMouseUp(event) {
      this.isDragging = false;
      this.isDragging = false;
      this.isDragging = false;

    }
  ,

    initWebSocket() {
      //初始化weosocket
      const wsuri = `ws://127.0.01:9000/live2d`;

      this.websock = new WebSocket(wsuri);
      // 客户端接收服务端数据时触发
      this.websock.onmessage = this.websocketonmessage;
      // 连接建立时触发
      this.websock.onopen = this.websocketonopen;
      // 通信发生错误时触发
      this.websock.onerror = this.websocketonerror;
      // 连接关闭时触发
      this.websock.onclose = this.websocketclose;
    },
    websocketonmessage(event){
      let data=JSON.parse(event.data)
      this.getWav(data.voice,data.mood)

    },
    websocketonopen(){
      console.log("建立")
    },
    websocketonerror(){
      console.log("错误")
    },
    websocketclose(){
      console.log('关闭')
    },
    async createModel(){

      this.model4 = await Live2DModel.from("./model/Haru.model3.json",{ autoUpdate: true });
      this.set=this.model4.internalModel.coreModel.setParameterValueById
      this.app = new PIXI.Application({
        view: this.$refs.live2d,
        autoStart: true,
        width:this.model4.width,
        height:this.model4.height,
        backgroundAlpha:0
      });

      this.app.stage.addChild(this.model4);

      this.model4.x=this.$refs.live2d.clientWidth/2-this.model4.width/2




    },
    setMouthOpenY(v){
      v = Math.max(0, Math.min(1, v));


      this.model4.internalModel.coreModel.setParameterValueById('ParamMouthOpenY', v,1,true)



    },
    createAnalyser() {
      this.audioCtx = new AudioContext();


      // 新建分析仪
      this.analyser = this.audioCtx.createAnalyser();

      // 根据 频率分辨率建立个 Uint8Array 数组备用
      this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);
      // 取音频文件成 arraybuffer
    },
    getByteFrequencyData(){
      this.analyser.getByteFrequencyData(this.frequencyData);
      return this.frequencyData
    },
    run(){

      if(!this.playing) return;

      const frequencyData = this.getByteFrequencyData();

      const arr = [];
      // 频率范围还是太广了，跳采！
      for (var i = 0; i < 1000; i += this.o) {
        arr.push(frequencyData[i]);
      }

      this.setMouthOpenY((this.arrayAdd(arr)/arr.length - 20)/6);

      setTimeout(this.run,1);
    },
    arrayAdd(a){return a.reduce((i,a)=>i+a,0)},
    getWav(url,mood){
      axios({
        url:url,
        method:"get",
        responseType:"arraybuffer"
      }).then(response=> {



        const audioData = response.data;
        this.audioCtx.decodeAudioData(audioData, (buffer)=>{

          // 新建 Buffer 源

          const source = this.audioCtx.createBufferSource();
          source.buffer = buffer;

          // 连接到 audioCtx

          source.connect(this.audioCtx.destination);
          // 连接到 音频分析器

          source.connect(this.analyser);

          window.navigator.mediaDevices.getUserMedia({ audio: true });
          // 开始播放


          this.playing = true;
          this.run()


          this.model4.expression(mood)
          this.model4.motion("TapBody")
          debugger;


          source.start(0);


          source.onended = ()=>{
            // 停止播放

            this.playing = false;
            this.websock.send(JSON.stringify({
              message:"ended",type:"successful"
            }))



            this.model4.expression(0);


          }
        }).catch(error => {
          console.log(error)
          this.websock.send(-1)
        })


      })
  },


},
  watch:{



  }
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

.button {
  height: 5vh;
  width: 5vw;
  background: #E6A23C;
  margin-bottom: 10px;
  border-radius: 60px;
  font-size: 3vh;
  position: relative;
  z-index: 100;
  cursor: pointer
}
#live2d:hover {
  cursor: pointer;
  position: relative;
  z-index: 5;
}

</style>
