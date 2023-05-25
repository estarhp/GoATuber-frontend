import Vue from 'vue'
import Vuex from 'vuex'



Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        websocket :"",
        model4:"",
        parameterIndex:"",
        percentage:parseFloat(window.localStorage.getItem("percentage")
            || window.localStorage.setItem("percentage",60) ),
        scale:parseFloat(
            window.localStorage.getItem("scale")
            || window.localStorage.setItem("scale",1)
            ) ,
        app:"",
        live2d:""

    },
    mutations: {
    },
    actions: {
        increase(context) {
            context.state.percentage += 5;
            if (context.state.percentage > 100) {
                context.state.percentage = 100;
            }
        },
        decrease(context) {
            context.state.percentage -= 5;
            if (context.state.percentage <= 1) {
                context.state.percentage = 1;
            }
        },
        reduce(context,live2d){

            window.localStorage.getItem("scale") == NaN ?
                window.localStorage.setItem("scale",1)  : null

            if(context.state.scale<=0.3){
                ontext.state.scale=0.3
            }
            context.state.scale-=0.1
            context.state.model4.scale.set(context.state.scale)
            live2d.style.width=context.state.width/2
            live2d.style.height=context.state.height
            context.state.app.resizeTo=live2d
        },
        amplify(context,live2d){

            window.localStorage.getItem("scale") == NaN ?
                window.localStorage.setItem("scale",1)  : null

            if (context.state.scale>=1.5){
                context.state.scale=1.5
            }
            context.state.scale+=0.1
            context.state.model4.scale.set(context.state.scale)
            live2d.style.width=context.state.model4.width
            live2d.style.height=context.state.model4.height
            context.state.app.resizeTo=live2d
        },


    }
});