import {getWav} from "../live2d/openMouthY/index.js";
import {useStore} from "vuex";
import {speakCharacter} from "../vrm/messages/speakCharacter";

let websocket

export  default  function  initWebSocket() {
    const store = useStore()
    //初始化weosocket
    const wsuri = `ws://localhost:9000/connect`;

    websocket = new WebSocket(wsuri);



    const onStart=() => {

    }
    const onEnd=() => {

    }


    // 连接建立时触发
    websocket.onopen = websocketOnopen;
    // 通信发生错误时触发
    websocket.onerror = websocketOnerror;
    // 连接关闭时触发
    websocket.onclose = websocketClose;

    websocket.onmessage =(event) => {
            switch (store.state.modelType) {
                case "live2d" : {
                    let data=JSON.parse(event.data)
                    getWav(data,store).catch(err =>{
                        console.error(err)
                    })
                    break;
                }
                case "vrm" :{
                    let data=JSON.parse(event.data)
                    speakCharacter(data,store.state.viewer,onStart,onEnd);
                }
            }
        }


    return websocket
}


function websocketOnopen(){
    ElMessage({
        message: '成功建立连接 ₍ᐢ..ᐢ₎♡ ',
        type: 'success'
    });
}
function websocketOnerror(){
    ElMessage({
        message: '连接发生了错误! ̊ଳ ̊ᵎᵎᵎᵎ ',
        type: 'warning'
    });
}
function websocketClose(){
    ElMessage({
        message: '连接已断开!!! ˃̣̣̥᷄⌓˂̣̣̥᷅ ',
        type: 'warning'
    });
}

