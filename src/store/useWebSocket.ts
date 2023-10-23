import { create } from 'zustand'

const useWebSocket = create((set) => ({
    websocket: WebSocket,
    setWebSocket: (newWebSocket: WebSocket) => set(() => ({ websocket: newWebSocket })),
}))

export default useWebSocket
