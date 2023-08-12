<script setup lang="ts">
import {InitPermission, signText, SoundColor, startAnalyzing, stopAnalyzing} from "../SoundRecorder";
import Recorder from "js-audio-recorder";
import {useStore} from "vuex";

const OpenRecord = ref(false)

const Color = ref<SoundColor>("#FFFF00")
const text  = ref<signText>("录音关闭/暂停")
const recorder = new Recorder();
const store = useStore()



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




function play(){
  recorder.play();
}

function getWAVBlob(){
  return recorder.getWAVBlob();
}


watch(OpenRecord,(newValue)=>{
  if (newValue === true){
    startAnalyzing(start,pause)
  }else {
    stopAnalyzing()
  }
})



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

  <div class="sound-record">
        <el-row flex justify="center" style="flex-wrap: nowrap">
          <el-button @click="play">
            播放录音
          </el-button>
        </el-row>
      </div>

</template>

<style scoped>

.sound-record {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin: 10px 0 ;
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