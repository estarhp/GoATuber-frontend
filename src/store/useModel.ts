import {create} from "zustand";

const useModel = create((set)=>({
      model: undefined,
      setModel: (newModel:any) => { set(()=>({
          model: newModel
      }))}
}))

export default useModel