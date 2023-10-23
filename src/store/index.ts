import { create } from 'zustand'

const useStore = create((set) => ({
    count: 1,
    inc: () => set((state: any) => ({ count: state.count + 1 })),
}))

export default useStore
