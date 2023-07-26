<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useStore} from "vuex";
import VRMDrawer from "./VRMDrawer.vue";
import {Viewer} from "./loadVRM/viewer.ts";
import {useRoute} from "vue-router";


const canvas:any= ref(null)

const store = useStore()


onMounted(()=>{

  const viewer = new Viewer()
  const modelName = store.state.modelType.name
  store.state.viewer = viewer

  if (canvas) {
    viewer.setup(canvas.value);
    console.log(123)
    viewer.loadVrm("/vrm/"+modelName);
  }

})

</script>

<template>
  <VRMDrawer></VRMDrawer>
  <canvas ref="canvas"></canvas>

</template>

<style scoped>
canvas {
  margin: 0;
  padding:0;
}
</style>