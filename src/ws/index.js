import {getWav} from "../live2d/openMouthY/index.js";
import {useStore} from "vuex";
import speakCharacter from "../vrm/messages/speakCharacter";
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

    window.websocket.onmessage =async (event) => {
       try {
           if (event.data === "ok") {
               ElMessage({
                   message: '成功建立连接 ₍ᐢ..ᐢ₎♡ ',
                   type: 'success'
               });
               return
           }
           const modelType  = store.state.modelType.type
           const data=JSON.parse(event.data)
           const messages = data.messages
           switch (modelType) {
               case 1 : {
                   for (let i = 0; i < messages.length; i++) {
                       await getWav(messages[i], store);
                   }
                   window.websocket.send(0)
                   break;
               }
               case 2 :{
                   for (let i = 0; i < messages.length; i++) {
                       await speakCharacter(messages[i], viewer, onStart, onEnd);
                   }
                   window.websocket.send(0)
                   break
               }
           }
       }catch(error){
           console.error(error)
           window.websocket.send(-1)
       }
    }

}


function websocketOnopen(){

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



