import {Model, ModelType} from "../common/model";
import {Live2DModel} from "../../lib/pixi-live2d-display";

export class Vrm extends Model{
    constructor(modelName: ModelType) {
        super(modelName)
    }

    model: Live2DModel | undefined;
    modelScale: number | undefined;

    createModel(): void {
    }

}