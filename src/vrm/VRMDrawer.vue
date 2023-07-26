<script setup lang="ts">

    import {useStore} from "vuex";
    import {ref,computed,watch,onMounted} from "vue"
    const drawer =  ref(false)
    const x = ref(null)
    const store = useStore()
    function handlerClick(){
      drawer.value = true
    }


const live2d = computed(()=>{
      return store.state.live2d
})


const percentage = computed(()=>{
  return store.state.percentage
})

const scale = computed(()=>{
  return store.state.scale
})


watch(percentage,(newValue,oldValue)=> {
      window.localStorage.setItem("percentage",parseFloat(newValue))
      console.log(newValue)
    })
watch(scale,(newValue,oldValue)=> {
      window.localStorage.setItem("scale", parseFloat(newValue))
      console.log(newValue)
    })


onMounted(()=>{
  document.addEventListener("keydown", (events) => {
        if(events.code==="ArrowLeft"){
          drawer.value=false
        }
        if(events.code==="ArrowRight"){
          drawer.value=true
        }
        if(events.code==="ArrowUp"){
          store.dispatch("amplify")
        }
        if(events.code==="ArrowDown"){
          store.dispatch("reduce")
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