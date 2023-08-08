<script setup lang="ts">
import {Microphone} from "@element-plus/icons-vue";
import Recorder from 'js-audio-recorder';
let recorder = new Recorder();

const OpenRecord = ref(false)
function start(){
  recorder.start().then(() => {
    // 开始录音
  }, (error) => {
    // 出错了
    console.log(`${error.name} : ${error.message}`);
  });

}

function pause(){
  recorder.pause();
}

function resume(){
  recorder.resume()
}

function stop(){
  recorder.stop();
}

function play(){
  recorder.play();
}

function getWAVBlob(){
  recorder.getWAVBlob();
}

onMounted(()=>{
  Recorder.getPermission().then(() => {
    console.log('给权限了');
  }, (error) => {
    console.log(`${error.name} : ${error.message}`);
  });

})


</script>

<template>
      <h4 style="text-align: center">录音模块</h4>
  <el-switch
      v-model="OpenRecord"
      size="large"
      active-text="Open"
      inactive-text="Close"
      style="left: 50%;transform: translateX(-50%)"
  />
      <div class="sound-record">
        <el-row flex justify="center" style="flex-wrap: nowrap">
          <el-button @click="start">
            开始录音
          </el-button>
          <el-button @click="pause">
            暂停录音
          </el-button>
          <el-button @click="resume">
            继续录音
          </el-button>
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
}
h4 {
  margin: 20px 0;
  padding: 0;
}

</style>