<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useStore} from "vuex";
import Drawer from "./VRMDrawer.vue";
import {Viewer} from "./loadVRM/viewer.ts";


const canvas:any= ref(null)

const store = useStore()

onMounted(()=>{

   const viewer = new Viewer()

  store.state.viewer = viewer

  if (canvas) {
    viewer.setup(canvas.value);
    viewer.loadVrm("/vrm/AvatarSample_B.vrm");
  }

})

</script>

<template>
  <Drawer></Drawer>
  <canvas ref="canvas"></canvas>

</template>

<style scoped>
canvas {
  margin: 0;
  padding:0;
}
</style>