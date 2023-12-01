import {create} from "zustand";

//TODO: 计划删除该store 挂载到相应的对象上

const useModelType = create<ModelTypeStore>((set) => ({
    modelType: undefined,
    setModelType: (newModelType:string | undefined)=> set(()=>({modelType: newModelType}))
}))

interface ModelTypeStore {
    modelType: string | undefined,
    setModelType: (newModel: string) => void
}

export default useModelType