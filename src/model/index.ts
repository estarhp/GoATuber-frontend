import {Model} from "./common/model";
import {Vrm} from "./vrm";
import {Live2d} from "./live2d";

export * from "./live2d"
export * from "./vrm"



class currentModel {
    public model: Live2D | Vrm | undefined
    constructor() {
        Model.getModelType().then((modelType) => {
           switch (modelType.name) {
               case "live2d": {
                   this.model = new Live2d(modelType)
                   break
               }
               case "vrm": {
                   this.model = new Vrm(modelType)
               }
           }
        })
    }
}

const model = new currentModel()

export default model

