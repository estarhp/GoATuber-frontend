import {ref} from "vue"
const state = {
        websocket :null,
        model4:null,
        parameterIndex:null,
        percentage:parseFloat(localStorage.getItem("percentage") || 60),
        scale:parseFloat(localStorage.getItem("scale") || 1) ,
        app:null,
        live2d:null,
        modelType:{
                type:null,
                name:null
        },
        vrm:{

        },
        loading:null
}


export default state