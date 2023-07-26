import {ref} from "vue"
const state = {
        websocket :"",
        model4:"",
        parameterIndex:"",
        percentage:parseFloat(localStorage.getItem("percentage") || 60),
        scale:parseFloat(localStorage.getItem("scale") || 1) ,
        app:"",
        live2d:"",
        modelType:{
                type:undefined,
                name:undefined
        },
        vrm:{

        }
}


export default state