import {create} from "zustand";

const useModelType = create<ModelTypeStore>((set) => ({
    modelType: undefined,
    setModelType: (newModelType:string | undefined)=> set(()=>({modelType: newModelType}))
}))

interface ModelTypeStore {
    modelType: string | undefined,
    setModelType: (newModel: string) => void
}

export default useModelType