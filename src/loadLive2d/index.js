import * as PIXI from "pixi.js";
import { Live2DModel } from '../pixi-live2d-display/dist/cubism4.es.js';
import axios from "axios";
import {useStore} from "vuex";

window.PIXI = PIXI;


export default async function createModel(live2d){
    const store = useStore()
//for the modelName
    let modelName= await axios({
      url:"/get",
      method:"get"
    }).catch( err => {
      console.log(err)

    }) || {};
    //load the live2d model and add the  model on the state
    const model4 = await Live2DModel.from("/model/"+ (modelName.data || "mao_pro_t03.model3.json"),{ autoUpdate: true })
    // this.set=this.model4.
    //     internalModel.coreModel.
    //     setParameterValueById

    //set the scale of model

    store.state.model4 = model4
    store.state.model4.scale.set(store.state.scale)

    let app = new PIXI.Application({
        view: live2d,
        autoStart: true,
        width:store.state.model4.width ,
        height:store.state.model4.height ,
        backgroundAlpha:0
    });





    app.stage.addChild(model4);




//adapt defferent parameterIds of models
   if (store.state.model4.internalModel.coreModel._parameterIds.includes("ParamMouthOpenY")){
        store.state.parameterIndex = store.state.model4.internalModel.coreModel.getParameterIndex("ParamMouthOpenY")
    }

    if (store.state.model4.internalModel.coreModel._parameterIds.includes("PARAM_MOUTH_OPEN_Y")){
        store.state.parameterIndex = store.state.model4.internalModel.coreModel.getParameterIndex("PARAM_MOUTH_OPEN_Y")
    }

    if (store.state.model4.internalModel.coreModel._parameterIds.includes("ParamMouthA")){
        store.state.parameterIndex = store.state.model4.internalModel.coreModel.getParameterIndex("ParamMouthA")
    }

    return app




}

