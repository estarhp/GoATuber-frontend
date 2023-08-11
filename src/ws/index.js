import {getWav} from "../live2d/openMouthY/index.js";
import {useStore} from "vuex";
import {speakCharacter} from "../vrm/messages/speakCharacter";
import viewer from "../vrm/loadVRM";

window.websocket = null

export function  initWebSocket() {
    const store = useStore()
    //初始化weosocket
    const wsuri = `ws://localhost:9000/ws`;

    window.websocket = new WebSocket(wsuri);

    const onStart=() => {

    }
    const onEnd=() => {

    }
    // 连接建立时触发
    window.websocket.onopen = websocketOnopen;
    // 通信发生错误时触发
    window.websocket.onerror = websocketOnerror;
    // 连接关闭时触发
    window.websocket.onclose = websocketClose;

    window.websocket.onmessage =(event) => {
            const modelType  = store.state.modelType.type
            switch (modelType) {
                case 1 : {
                    let data=JSON.parse(event.data)
                    getWav(data,store).catch(err =>{
                        console.error(err)
                    })
                    break;
                }
                case 2 :{
                    let data=JSON.parse(event.data)
                    speakCharacter(data,viewer,onStart,onEnd);
                }
            }
        }
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



