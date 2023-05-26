let websocket

import {Message} from "element-ui";
export  default  function  initWebSocket() {
    //初始化weosocket
    const wsuri = `ws://${location.host}/live2d`;

    websocket = new WebSocket(wsuri);


    // 连接建立时触发
    websocket.onopen = websocketonopen;
    // 通信发生错误时触发
    websocket.onerror = websocketonerror;
    // 连接关闭时触发
    websocket.onclose = websocketclose;

    return websocket
}


function websocketonopen(){
    Message({
        message: '成功建立连接 ₍ᐢ..ᐢ₎♡ ',
        type: 'success'
    });
}
function websocketonerror(){
    Message({
        message: '连接发生了错误! ̊ଳ ̊ᵎᵎᵎᵎ ',
        type: 'warning'
    });
}
function websocketclose(){
    Message({
        message: '连接已断开!!! ˃̣̣̥᷄⌓˂̣̣̥᷅ ',
        type: 'warning'
    });
}

