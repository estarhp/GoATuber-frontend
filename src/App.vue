<template>
  <div id="app">
    <canvas id=canvas></canvas>
  </div>
</template>

<script>

import * as PIXI from 'pixi.js';
import { Live2DModel } from 'pixi-live2d-display/cubism4';
import axios from "axios"




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
    then:"",
    v:0

  }
  },
  mounted() {
  window.PIXI=PIXI;


    this.$on("start",this.getWav);

    (async ()=>{
     await this.createModel()

      this.createAnalyser()


    })()





  }
  ,
  created() {
    this.initWebSocket();

  },
  destroyed() {
    this.websock.close(); //离开路由之后断开websocket连接
  },
  methods:{

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
      const app = new PIXI.Application({
        view: document.getElementById("canvas"),
        autoStart: true,
        resizeTo: window
      });
      this.model4 = await Live2DModel.from("./Haru/Haru.model3.json",{ autoUpdate: true });
      app.stage.addChild(this.model4);
      this.model4.scale.set(0.25);
      this.model4.x = 300;
    },
    setMouthOpenY(v){
      v = Math.max(0, Math.min(1, v));


      this.model4.internalModel.coreModel.setParameterValueById('ParamMouthOpenY', v)



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

      setTimeout(this.run,1000/30);
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
          // 开始播放


          this.playing = true;
          this.run()


          this.model4.expression(mood)


          source.start(0);


          source.onended = ()=>{
            // 停止播放

            this.playing = false;

            this.model4.expression(0);


          }
        })


      })
  },


},
  watch:{



  }
}


</script>

<style>

</style>
