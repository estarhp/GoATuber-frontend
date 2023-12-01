import {Model, ModelType} from "../common/model";
import * as PIXI from "pixi.js"
import { InternalModel, Live2DModel} from "../../lib/pixi-live2d-display";

interface PIXIWINDOW {
    PIXI: any
}

(window as (Window & typeof globalThis & PIXIWINDOW)).PIXI = PIXI;

export class Live2d extends Model {
    model: Live2DModel<InternalModel> | undefined;
    modelScale: number | undefined;
    public app: PIXI.Application | undefined
    public width: number | undefined
    public height: number | undefined
    constructor(modelName: ModelType) {
        super(modelName)
        this.init()

    }

    createModel() {
        const {name} = this.modelType
        Live2DModel.from("/model/"+ (name || "mao_pro_t03.model3.json"),{ autoUpdate: true }).then((model) => {
            this.model = model
        })
    }


    createApp(live2d: HTMLCanvasElement) {
        this.app = new PIXI.Application({
            view: live2d,
            autoStart: true,
            width: this.width ,
            height:this.height ,
            backgroundAlpha:0
        });
    }

    init() {
        super.init();
    }


}

