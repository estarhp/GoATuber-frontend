import * as PIXI from "pixi.js";
import {Live2DModel} from "@/pixi-live2d-display/dist/cubism4.es";

window.PIXI = PIXI;

export default async function createModel(store,live2d){

    // let modelName= await axios({
    //   url:"/get",
    //   method:"get"
    // }).catch( err => {
    //   console.log(err)
    //
    // })

    store.model4 = await Live2DModel.from(
        "./model/"+ "hiyori_pro_t11.model3.json",
        { autoUpdate: true });
    // this.set=this.model4.
    //     internalModel.coreModel.
    //     setParameterValueById

    let app = new PIXI.Application({
        view: live2d,
        autoStart: true,
        width:store.model4.width,
        height:store.model4.height,
        backgroundAlpha:0
    });



    app.stage.addChild(store.model4);

    store.model4.x=live2d.clientWidth/2-store.model4.width/2

    store.model4.scale.set(store.scale+0)


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

