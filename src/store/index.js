import Vue from 'vue'
import Vuex from 'vuex'
import {store} from "core-js/internals/reflect-metadata";



Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        websocket :"",
        model4:"",
        parameterIndex:"",
        percentage:localStorage.getItem("percentage") || 60,
        scale:localStorage.getItem("scale") || 1 ,
        app:"",
        live2d:""

    },
    mutations: {
    },
    actions: {
        //increase the percentage when click the button
        increase(context) {
            context.state.percentage += 5;
            if (context.state.percentage > 100) {
                context.state.percentage = 100;
            }
        },
       // decrease the percentage when click the button
        decrease(context) {
            context.state.percentage -= 5;
            if (context.state.percentage <= 1) {
                context.state.percentage = 1;
            }
        },
        //reduce the scale of the live2d model when click the button
        reduce(context,live2d){
        // ensure the scale is a number
            if (typeof localStorage.scale != "number" ){
                localStorage.scale = parseFloat(localStorage.scale)
            }


            if(context.state.scale<=0.3){
                context.state.scale=0.3
            }
            context.state.scale-=0.1
            context.state.model4.scale.set(context.state.scale) // reset the scale of the model

            //reset the width and height of canvas
            // live2d.style.width=context.state.width/2
            live2d.width=context.state.model4.width
            live2d.height=context.state.model4.height
            context.state.app.resizeTo=live2d
        },

        //amplify the scale of the live2d model when click the button
        amplify(context,live2d){
        // ensure the scale is a number
            if (typeof localStorage.scale != "number" ){
                localStorage.scale = parseFloat(localStorage.scale)
            }

            if (context.state.scale>=1.5){
                context.state.scale=1.5
            }
            context.state.scale-=(-0.1)
            context.state.model4.scale.set(context.state.scale) // reset the scale of the model

            //reset the width and height of canvas
            live2d.width=context.state.model4.width
            live2d.height=context.state.model4.height
            context.state.app.resizeTo=live2d
        },


    }
});