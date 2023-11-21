export class WS {
    private websocket: WebSocket
    private reStartTimeOut: NodeJS.Timeout | undefined
    private readonly URL: string;

    constructor(URL: string) {
        this.URL = URL
        this.websocket = new WebSocket(URL)
        // 初始化事件处理程序
        this.websocket.onopen = () => {
            this.onOpen();
        }

        this.websocket.onclose = () => {
            this.onClose();
        }

        this.websocket.onmessage = (event) => {
            this.onMessage(event.data);
        }

        this.websocket.onerror = (error) => {
            this.onError(error);
        }

    }
    onOpen() {
        // 自定义处理连接建立事件的逻辑
        console.log('WebSocket connection established');
    }

    onClose() {
        // 自定义处理连接关闭事件的逻辑
        console.log('WebSocket connection closed');
    }

    onMessage(data: any) {
       if(data === "pong"){
           this.stopReStart()
       }
    }

    onError(error: Event) {
        // 自定义处理错误事件的逻辑
        console.log(error)
    }

    ping() {
        this.websocket.send("ping")
    }

    pong() {
        this.websocket.send("pong")
    }

    private heartbeatInterval:  NodeJS.Timeout | undefined;

    public startHeartbeat() {
        this.stopHeartbeat(); // 确保只有一个心跳定时器在运行
        this.heartbeatInterval = setTimeout(() => {
            this.ping(); // 定时发送 ping 消息
            this.prepareRestart()
        }, 5000); // 5秒一次，可以根据需要调整时间间隔
    }

    public stopHeartbeat() {
        if (this.heartbeatInterval) {
            clearTimeout(this.heartbeatInterval); // 停止心跳定时器
            this.heartbeatInterval = undefined;
        }
    }

    private stopReStart(){
        if (this.reStartTimeOut) {
            clearTimeout(this.reStartTimeOut); // 停止心跳定时器
            this.reStartTimeOut = undefined;
        }
    }

    private prepareRestart(){
        this.reStartTimeOut = setTimeout(() => {
            this.websocket = new WebSocket(this.URL)
        },15000)
    }


}
