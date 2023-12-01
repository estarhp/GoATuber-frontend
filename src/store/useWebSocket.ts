import { create } from 'zustand'

//TODO 计划删除状态(与刷新视图没有关系)

const useWebSocket = create((set) => ({
    websocket: WebSocket,
    setWebSocket: (newWebSocket: WebSocket) => set(() => ({ websocket: newWebSocket })),
}))

export default useWebSocket
