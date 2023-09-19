<script setup lang="ts">
import {InitPermission, signText, SoundColor, startAnalyzing, stopAnalyzing} from "../SoundRecorder";
import Recorder from "js-audio-recorder";
import {useStore} from "vuex";


const OpenRecord = ref(false)

const Color = ref<SoundColor>("#FFFF00")
const text  = ref<signText>("录音关闭/暂停")
const max = ref(parseInt(localStorage.getItem("MAX")) || 20)
const min = ref(parseInt(localStorage.getItem("MIN") )|| 10)
const recorder = new Recorder();
const store = useStore()
const currentV = ref(0)

const colors = [
  { color: '#f56c6c', percentage: 20 },
  { color: '#e6a23c', percentage: 40 },
  { color: '#5cb87a', percentage: 60 },
  { color: '#1989fa', percentage: 80 },
  { color: '#6f7ad3', percentage: 100 },
]



const percentage = computed(()=>{
  return  parseInt(currentV.value / 255 * 100)
})

onMounted(()=>{
  InitPermission(Recorder)
})

function start(){
  if (store.state.Permission){
    recorder.start().then(() => {
      // 开始录音
      Color.value = "#70B603"
      text.value = "正在录音"
    }, (error) => {
      // 出错了
      console.log(error);
    });
  }

}

function pause(){
 if (store.state.Permission){
   recorder.pause();
   Color.value = "#FFFF00"
   text.value = "录音关闭/暂停"

   const wavBlob = recorder.getWAVBlob();
   store.state.Permission = false;

// 创建一个 File 对象，将 Blob 转换为文件
   const audioFile = new File([wavBlob], 'recorded.wav', { type: 'audio/wav' });

// 创建一个 FormData 对象来构建 POST 数据
   const formData = new FormData();
   formData.append('audioFile', audioFile); // 将文件添加到 FormData

// 发送 POST 请求到服务器
   fetch('/speech', {
     method: 'POST',
     body: formData
   })
       .then(response => response.json())
       .then(data => {
         console.log('Server response:', data);
       })
       .catch(error => {
         console.error('Error uploading audio:', error);
       });

 }
}

watch(OpenRecord,(newValue)=>{
  if (newValue === true){
    startAnalyzing(start,pause,max,min,currentV)
  }else {
    stopAnalyzing()
  }
})

function SaveMAX(newValue:number){
  localStorage.setItem("MAX",newValue.toString())
}

function SaveMIN(newValue: number){
  localStorage.setItem("MIN",newValue.toString())
}



</script>

<template>
      <h4 style="text-align: center">录音模块</h4>
  <el-row  flex justify="center" align="middle" style="flex-wrap: nowrap">
    <el-switch
        v-model="OpenRecord"
        size="large"
        active-text="Open"
        inactive-text="Close"

    />
    <div class="sign" :style="`background:${Color}`"></div>
    <span style="font-size: 16px">{{text}}</span>
  </el-row>

  <el-row flex justify="space-around" align="middle" style="flex-wrap: nowrap">
    <span class="fix">
      开始录音阈值
    </span>
    <div class="slider-demo-block">
      <el-slider v-model="max" show-input input-size="small" @change="SaveMAX" :min="min" max="255" />
    </div>
  </el-row>
  <el-row flex align="middle" style="flex-wrap: nowrap">
    <span class="fix">
      停止录音阈值
    </span>
    <div class="slider-demo-block" >
      <el-slider v-model="min" show-input input-size="small" @change="SaveMIN" :max="max"/>
    </div>
  </el-row>

 <el-row flex justify="space-around" align="middle" style="flex-wrap: nowrap;margin-top: 10px">
      <el-statistic title="现在音量" :value="currentV" style="text-align: center"/>
     <el-progress type="dashboard" :percentage="percentage" :color="colors" />

 </el-row>



</template>

<style scoped>

.slider-demo-block {
  flex-grow: 5;
}

.fix {
  flex-grow: 1;
}

h4 {
  margin: 20px 0;
  padding: 0;
}

.sign {
  width: 20px;
  height: 20px;
  border: 1px solid black;
  border-radius: 50%;
  margin-left: 30px;
  margin-right: 5px;
}

</style>