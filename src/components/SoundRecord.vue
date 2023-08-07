<script setup lang="ts">
import {Microphone} from "@element-plus/icons-vue";
const isRecording = ref(false)
</script>

<template>

      <div class="sound-record">
        <el-button circle>
          <el-icon><Microphone /></el-icon>
        </el-button>
      </div>

</template>

<style scoped>

.sound-record {
  position: absolute;
  z-index: 10;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}

</style>