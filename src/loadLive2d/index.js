import * as PIXI from "pixi.js";
import {Live2DModel} from "@/pixi-live2d-display/dist/cubism4.es";
import axios from "axios";

window.PIXI = PIXI;

export default async function createModel(store,live2d){
//for the modelName
    let modelName= await axios({
      url:"/get",
      method:"get"
    }).catch( err => {
      console.log(err)

    }) || {};
    //load the live2d model and add the  model on the state
    store.model4 = await Live2DModel.from(
        "./model/"+ (modelName.data || "mao_pro_t02.model3.json"),
        { autoUpdate: true });
    // this.set=this.model4.
    //     internalModel.coreModel.
    //     setParameterValueById

    //set the scale of model
    store.model4.scale.set(store.scale+0)

    let app = new PIXI.Application({
        view: live2d,
        autoStart: true,
        width:store.model4.width ,
        height:store.model4.height ,
        backgroundAlpha:0
    });



    app.stage.addChild(store.model4);




//adapt defferent parameterIds of models
   if (store.model4.internalModel.coreModel._parameterIds.includes("ParamMouthOpenY")){
        store.parameterIndex = store.model4.internalModel.coreModel.getParameterIndex("ParamMouthOpenY")
    }

    if (store.model4.internalModel.coreModel._parameterIds.includes("PARAM_MOUTH_OPEN_Y")){
        store.parameterIndex = store.model4.internalModel.coreModel.getParameterIndex("PARAM_MOUTH_OPEN_Y")
    }

    if (store.model4.internalModel.coreModel._parameterIds.includes("ParamMouthA")){
        store.parameterIndex = store.model4.internalModel.coreModel.getParameterIndex("ParamMouthA")
    }

    return app




}

