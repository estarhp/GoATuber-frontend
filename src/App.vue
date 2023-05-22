<template>
  <div id="app" style="text-align: center;">
    <div class="button" v-show="showButton" >
      <el-button  @click="amplify" v-show="showButton"  type="info" round style="height: 11vh;width: 10vw;font-size: 4vh;line-height: 0vh;border-radius: 5.5vh">放大</el-button>
      <el-button  @click="reduce" v-show="showButton" type="info" round style="height: 11vh;width: 10vw;font-size: 4vh;line-height: 0vh;border-radius: 5.5vh">缩小</el-button>
    </div>
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
import { Live2DModel } from './pixi-live2d-display/dist/cubism4.es';
import axios from "axios"
import { config } from './pixi-live2d-display';

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
    scale:1,
    showButton:true,
    parameterIndex:""

  }
  },
  mounted() {
    window.PIXI = PIXI;


    this.$on("start", this.getWav);

    (async () => {
      await this.createModel()

      this.createAnalyser()


    })()

    window.onresize = () => {
      this.model4.x = this.$refs.live2d.clientWidth / 2 - this.model4.width / 2


    }


    document.addEventListener("keydown", (events) => {
          if(events.code=="ArrowLeft"){
            this.showButton=false
          }
          if(events.code=="ArrowRight"){
            this.showButton=true
          }
          if(events.code=="ArrowUp"){
            this.amplify()
          }
          if(events.code=="ArrowDown"){
            this.reduce()
          }
        }
    )



    // window.onclick=()=>{
    //   this.getWav({
    //     voice :"synthesize.wav",
    //     VType:1
    //   })
    //   console.log(123)
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
      this.getWav(data)

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

      let modelName= await axios({
        url:"/get",
        method:"get"
      }).catch( err => {
        console.log(err)

      })

      this.model4 = await Live2DModel.from("./model/"+ "hijiki.model3.json",{ autoUpdate: true });
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


      if (this.model4.internalModel.coreModel._parameterIds.includes("ParamMouthOpenY")){
        this.parameterIndex = this.model4.internalModel.coreModel.getParameterIndex("ParamMouthOpenY")
      }

      if (this.model4.internalModel.coreModel._parameterIds.includes("PARAM_MOUTH_OPEN_Y")){
        this.parameterIndex = this.model4.internalModel.coreModel.getParameterIndex("PARAM_MOUTH_OPEN_Y")
      }

      if (this.model4.internalModel.coreModel._parameterIds.includes("ParamMouthA")){
        this.parameterIndex = this.model4.internalModel.coreModel.getParameterIndex("ParamMouthA")
      }




    },
    setMouthOpenY(v){
      v = Math.max(0, Math.min(1, v));
      console.log(v)


      this.model4.internalModel.coreModel.setParameterValueByIndex(this.parameterIndex, v,1,true)



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
      for (var i = 0; i < 800; i += this.o) {
        arr.push(frequencyData[i]);
      }

      this.setMouthOpenY((this.arrayAdd(arr)/arr.length - 20)/30);

      setTimeout(this.run,1000/60);
    },
    base64ToArrayBuffer(base64) {
              let binary_string =  window.atob(base64);
              let len = binary_string.length;
              let bytes = new Uint8Array( len );
              for (let i = 0; i < len; i++)        {
                bytes[i] = binary_string.charCodeAt(i);
              }
              return bytes.buffer;
   },
    arrayAdd(a){return a.reduce((i,a)=>i+a,0)},
    async getWav(data){
      let response

      switch (data["VType"]) {
        case 1 :
          response =  await axios({
          url:data.voice,
          method:"get",
          responseType:"arraybuffer"
        })
          response = response.data
           break
        case 2  :
          response = this.base64ToArrayBuffer(data.voice)
        case 3  :
          response = this.base64ToArrayBuffer(data.voice)

      }



      ((response) => {

        const audioData = response;
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
         setTimeout(() => {
           source.start(0);
         },0.5)

          this.model4.expression(data.expression)
          this.model4.motion(data["act"],data["movement"])



          source.onended = ()=>{
            // 停止播放
            this.playing = false;
            this.websock.send(0)
            this.model4.expression(0);
          }
        }).catch(error => {
          console.log(error)
          this.websock.send(-1)
        })
      })(response)
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
  position: absolute;
  text-align: left;
  z-index: 100;
  cursor: pointer
}


</style>
