import {getWav} from "../openMouthY/index.js";
import {useStore} from "vuex";

let websocket



export  default  function  initWebSocket() {
    const store = useStore()
    //初始化weosocket
    const wsuri = `ws://localhost:9000/live2d`;

    websocket = new WebSocket(wsuri);


    // 连接建立时触发
    websocket.onopen = websocketonopen;
    // 通信发生错误时触发
    websocket.onerror = websocketonerror;
    // 连接关闭时触发
    websocket.onclose = websocketclose;

    websocket.onmessage =(event) => {
            let data=JSON.parse(event.data)
            getWav(data,store).catch(err =>{
                console.error(err)
            })
        }


    return websocket
}


function websocketonopen(){
    ElMessage({
        message: '成功建立连接 ₍ᐢ..ᐢ₎♡ ',
        type: 'success'
    });
}
function websocketonerror(){
    ElMessage({
        message: '连接发生了错误! ̊ଳ ̊ᵎᵎᵎᵎ ',
        type: 'warning'
    });
}
function websocketclose(){
    ElMessage({
        message: '连接已断开!!! ˃̣̣̥᷄⌓˂̣̣̥᷅ ',
        type: 'warning'
    });
}

