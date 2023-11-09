export class WS {
    private websocket: WebSocket
    private reStartTimeOut: number | undefined
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
        const byte = new Uint8Array(data)[0]; // 获取数据的第一个字节
        // 检查是否为 Ping 控制帧
        const isPongFrame = (byte & 0x0F) === 0x0A;
        const isPingFrame = (byte & 0x0F) === 0x09;

        if (isPongFrame) {
            // 执行处理 pong 控制帧的逻辑
            this.startHeartbeat() //开启下一轮ping
            this.stopReStart()
        }

        if(isPingFrame) {
            // 执行处理 ping 控制帧的逻辑
            this.pong() //回复一个pong
        }
    }

    onError(error: Event) {
        // 自定义处理错误事件的逻辑
        console.log(error)
    }

    sendControlFrame(opcode: number, data: ArrayBuffer) {
        const buf = new Uint8Array(data);
        const frame = new Uint8Array(2 + buf.byteLength);
        frame[0] = opcode;
        frame[1] = buf.byteLength;
        frame.set(buf, 2);
        this.websocket.send(frame);
    }

    ping() {
        // 构建 ping 控制帧
        const pingData = new TextEncoder().encode('ping'); // 将数据编码为 ArrayBuffer
        this.sendControlFrame(0x0A - 0x01 , pingData); // 0x09 表示 ping 控制帧
    }

    pong() {
        // 构建 pong 控制帧
        const pongData = new TextEncoder().encode('pong'); // 将数据编码为 ArrayBuffer
        this.sendControlFrame(0x0A, pongData); // 0x0A 表示 pong 控制帧
    }

    private heartbeatInterval:  number | undefined;

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
