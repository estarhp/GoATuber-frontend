import {Model, ModelType} from "../common/model";
import * as PIXI from "pixi.js"
import { InternalModel, Live2DModel} from "../../lib/pixi-live2d-display";
import message from "../../utils/message";

interface PIXIWINDOW {
    PIXI: any
}

(window as (Window & typeof globalThis & PIXIWINDOW)).PIXI = PIXI;

export class Live2d extends Model {
    model: Live2DModel<InternalModel> | undefined;
    public app: PIXI.Application | undefined
    public width: number | undefined
    public height: number | undefined
    public parameterIndex: number | undefined
    constructor(modelName: ModelType) {
        super(modelName)
        this.init()

    }

    createModel() {
        const {name} = this.modelType
        Live2DModel.from("/model/"+ (name || "mao_pro_t03.model3.json"),{ autoUpdate: true }).then((model) => {

            if (!model) {
                message.error("模型加载失败")
                throw new Error("模型加载失败")

            }

            this.model = model
            this.width = this.model.internalModel.width
            this.height = this.model.internalModel.height

            //TODO: 未来会采用fork修改库来代替这部分代码的功能

            // @ts-ignore
            const parameterIds = this.model.internalModel.coreModel._parameterIds as string[]

            const LipArray = ["ParamMouthOpenY","PARAM_MOUTH_OPEN_Y","ParamMouthA"]
            LipArray.forEach((Lipstring: string) => {
                if (parameterIds.includes(Lipstring)) {
                    // @ts-ignore
                    this.parameterIndex = this.model?.internalModel.coreModel.getParameterIndex(Lipstring)
                }
            })
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
        if (!this.model) {
            message.error("模型加载失败")
            throw new Error("模型加载失败")
        }
        //加入到canvas 当中
        this.app.stage.addChild(this.model as unknown as PIXI.DisplayObject)
    }

    init() {
        super.init();
    }


}

