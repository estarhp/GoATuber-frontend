<script setup lang="ts">
    import {ref,onMounted} from "vue"
    import {useStore} from "vuex";
    import {float} from "three/examples/jsm/nodes/shadernode/ShaderNodeBaseElements";
    import {stringifyQuery} from "vue-router";
    const drawer =  ref(false)
    const store = useStore()
    function handlerClick(){
      drawer.value = true
    }

    function Save(newValue:number){
      localStorage.setItem("vrmLipSync",newValue.toString())
    }

onMounted(()=>{
  document.addEventListener("keydown", (events) => {
        if(events.code==="ArrowLeft"){
          drawer.value=false
        }
        if(events.code==="ArrowRight"){
          drawer.value=true
        }
      }
  )
})
</script>

<template>

    <div class="show_setting" @click="handlerClick">
      <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728=""><path fill="currentColor" d="M338.752 104.704a64 64 0 0 0 0 90.496l316.8 316.8-316.8 316.8a64 64 0 0 0 90.496 90.496l362.048-362.048a64 64 0 0 0 0-90.496L429.248 104.704a64 64 0 0 0-90.496 0z"></path></svg>
    </div>

    <el-drawer
        v-model="drawer"
        direction="ltr"
        show-close
        :with-header="false"
        :model="false"
    >
      <div style="display: flex;justify-content: center;align-items: baseline">
        <h4 >嘴型控制</h4>
        <el-tooltip placement="top">
          <template #content>数值越小，嘴越容易张开。<br>当模型说话嘴型奇怪时，请适当改变数值。</template>
          <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728="" style="width:1em;height: 1em;"><path fill="currentColor" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm23.744 191.488c-52.096 0-92.928 14.784-123.2 44.352-30.976 29.568-45.76 70.4-45.76 122.496h80.256c0-29.568 5.632-52.8 17.6-68.992 13.376-19.712 35.2-28.864 66.176-28.864 23.936 0 42.944 6.336 56.32 19.712 12.672 13.376 19.712 31.68 19.712 54.912 0 17.6-6.336 34.496-19.008 49.984l-8.448 9.856c-45.76 40.832-73.216 70.4-82.368 89.408-9.856 19.008-14.08 42.24-14.08 68.992v9.856h80.96v-9.856c0-16.896 3.52-31.68 10.56-45.76 6.336-12.672 15.488-24.64 28.16-35.2 33.792-29.568 54.208-48.576 60.544-55.616 16.896-22.528 26.048-51.392 26.048-86.592 0-42.944-14.08-76.736-42.24-101.376-28.16-25.344-65.472-37.312-111.232-37.312zm-12.672 406.208a54.272 54.272 0 0 0-38.72 14.784 49.408 49.408 0 0 0-15.488 38.016c0 15.488 4.928 28.16 15.488 38.016A54.848 54.848 0 0 0 523.072 768c15.488 0 28.16-4.928 38.72-14.784a51.52 51.52 0 0 0 16.192-38.72 51.968 51.968 0 0 0-15.488-38.016 55.936 55.936 0 0 0-39.424-14.784z"></path></svg>
        </el-tooltip>
      </div>


      <div class="slider-demo-block">
        <el-slider v-model="store.state.vrmSetting.lipSync" show-input input-size="small" @change="Save" />
      </div>

    </el-drawer>

</template>

<style>
.show_setting {
  position: absolute;
  float: left;
  width: 1.5vw;
  height: 5vh;
  background:rgba(139,139,139,0.6);
  line-height: 5vh;
  font-size: 3vh;
  text-align: center;
  z-index: 10;

  /* 将元素垂直居中 */
  top: 50%;
  transform: translateY(-50%);
  padding: 20px 5px;
}

</style>