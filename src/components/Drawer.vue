<script>
import {defineComponent} from 'vue'



export default defineComponent({
  name: "Drawer",
  data(){
    return {
      drawer: false,
      customColor: '#409eff',
      x:"",
      dragging :false
    }
  },
  methods:{
    handlerClick(){
      this.drawer = true
      setTimeout(()=>{
        this.$refs.per.style.width = `${this.percentage}%`
      })
    },
    //添加进度条的点击事件
    mouseDown(e){

      this.$store.state.percentage = e.offsetX/this.$refs.per.parentElement.clientWidth * 100

      this.x = e.clientX;
    }

  },

  computed:{
    percentage(){
      return this.$store.state.percentage
    },
    scale(){
      return this.$store.state.scale
    },
    live2d(){
      return this.$store.state.live2d
    }
  },


  watch:{
    percentage:{
      handler(newValue){
        if (typeof newValue != 'number'){
          this.percentage = 60
        }

        this.$refs.per.style.width = `${this.percentage}%`
        window.localStorage.setItem("percentage",newValue)

      },
      set(newValue){
        this.percentage = newValue.toFixed(2)
      }
    },
    scale:{
      handler(newValue){

        if (typeof newValue != 'number'){
          this.percentage = 1
        }

        window.localStorage.setItem("scale",newValue)
      }
    }
  },
  mounted() {
    document.addEventListener("keydown", (events) => {
          if(events.code=="ArrowLeft"){
            this.drawer=false
          }
          if(events.code=="ArrowRight"){
            this.drawer=true
          }
          if(events.code=="ArrowUp"){
            this.amplify()
          }
          if(events.code=="ArrowDown"){
            this.reduce()
          }
        }
    )
  }


})
</script>

<template>
  <div>
    <div class="show_setting" @click="handlerClick">
      <i class="el-icon-arrow-right"></i>
    </div>

    <el-drawer
        :visible.sync="drawer"
        :with-header="false"
        direction="ltr"
    >
     <h4 style="margin-bottom: -20px">模型大小控制</h4>
      <div class="button" >
        <el-button  @click="$store.dispatch('amplify',live2d)"  type="primary" round style="height: 7vh;width: 8vw;font-size: 2vh;line-height: 0vh;border-radius: 3.5vh" >放大</el-button>
        <el-button  @click="$store.dispatch('reduce',live2d)"  type="primary" round style="height: 7vh;width: 8vw;font-size: 2vh;line-height: 0vh;border-radius: 3.5vh">缩小</el-button>
      </div>


      <div style="margin-bottom: 30px"></div>
      <h4>嘴型控制</h4>
      <div class="percentage"
           @mousedown="mouseDown"

      >
        <div class="in-percentage"
             ref="per"


        ></div>

      </div>

      <el-tooltip placement="top">
        <div slot="content">数值越小，嘴越容易张开。<br>当模型说话嘴型奇怪时，请适当改变数值。<br>支持小数微调</div>
        <i class="el-icon-question" style="font-size: 3vh;line-height: 3vh;color: gray"></i>
      </el-tooltip>


      <div style="margin-bottom: 40px"></div>
      <el-button-group>
        <el-button icon="el-icon-minus"
                   @click="$store.dispatch('decrease')"
                   style="height: 5vh;
                   width: 4vw;
                   font-size: 2vh;
                   line-height: 0vh;" ></el-button>
        <el-button icon="el-icon-plus"
                   @click="$store.dispatch('increase')"
                   style="height: 5vh;
                   width: 4vw;
                   font-size: 2vh;
                   line-height: 0vh;"></el-button>
      </el-button-group>
      <br>
      <el-input v-model="$store.state.percentage" placeholder="要改变的数值" style="height: 4vh; width: 20vw;margin-top: 2vh"></el-input>
    </el-drawer>



  </div>
</template>

<style>


.button {
  z-index: 10;
  cursor: pointer;
  margin-top: 8vh;
}



.show_setting {
  position: relative;
  width: 1.5vw;
  height: 4vw;
  background:rgba(139,139,139,0.6);
  top: 50vh;
  transform: translateY(-4vw);
  font-size: 3vh;
  line-height: 4vw;
  text-align: center;
  z-index: 10;

}

.percentage {

  width: 25vw;
  height: 1vh;
  background: beige;
  position: relative;
  left: 40%;
  transform: translateX(-50%);
  border-radius: 0.5vh;
  overflow: hidden;
  display: inline-block;


}

.in-percentage{
  height: 1vh;
  background:rgba(64,158,255,1);
}

h4 {
  color: gray;
}
</style>