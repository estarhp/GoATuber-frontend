import {URL} from "./constant";
import { message } from 'antd';
import useModelType from "../store/useModelType";
class WS {
    websocket
    modelType
    constructor() {
        const { modelType } = useModelType()
        this.websocket = new WebSocket(URL)
        this.modelType = modelType
    }
    Init(){
        this.websocket.onopen = this.websocketOnOpen
        this.websocket.onclose = this.websocketOnClose
        this.websocket.onerror = this.websocketOnError
        this.websocket.onmessage = this.websocketOnMessage
    }
    websocketOnOpen(){
        return;
    }
    websocketOnMessage(event: MessageEvent<any>){
        if (event.data === "ok") {
            message.info('成功建立连接 ₍ᐢ..ᐢ₎♡ ')
            return
        }

        switch (this.modelType){
            case "live2d": {

                break
            }
            case "vrm": {

                break
            }
        }
    }
    websocketOnError(){
        message.error('连接发生了错误! ̊ଳ ̊ᵎᵎᵎᵎ ')
    }
    websocketOnClose(){
        message.error('连接已断开!!! ˃̣̣̥᷄⌓˂̣̣̥᷅ ')
    }


}

export default WS