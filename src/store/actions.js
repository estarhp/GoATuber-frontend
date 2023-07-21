const actions = {
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

export default actions