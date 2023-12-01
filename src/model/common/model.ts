import {Live2DModel} from "../../lib/pixi-live2d-display";
import message from "../../utils/message";
import {getModelType} from "../../apis";

export interface ModelType {
    name: string,
    type: "live2d" | "vrm"
}

export abstract class Model {
    //加载完毕后的模型对象
    abstract model: Live2DModel | undefined

    public modelType: ModelType
    //模型的放大缩小的比例
    abstract modelScale: number | undefined

    protected constructor(modelType: ModelType) {
        this.modelType = modelType
    }

    init() {
        this.createModel()
    }

    abstract createModel(): void

    static async getModelType() {
        const [error, response] = await getModelType();
        if (error) {
            message.error("获取模型的文件名出现错误,请检查是否存在模型文件");
            throw new Error("获取模型的文件名出现错误，请检查是否存在模型文件");
        }

        return response.data as ModelType;
    }


}