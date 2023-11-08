export class WS {
    private websocket: WebSocket

    constructor(URL: string) {
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
        const isPingFrame = (byte & 0x0F) === 0x09; // 检查最高位为1，且后四位为0001

        if (isPingFrame) {
            console.log('Received a Ping frame:', data, (new Date()).getTime());
            // 执行处理 ping 控制帧的逻辑
            this.pong(); // 如果收到 ping 控制帧，可以回复一个 pong 控制帧
        } else {
            // 处理其他类型的消息
            console.log('Received message:', data, (new Date()).getTime());
        }
    }

    onError(error: any) {
        // 自定义处理错误事件的逻辑
        console.error('WebSocket error:', error);
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
        this.sendControlFrame(0x09, pingData); // 0x09 表示 ping 控制帧
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
            this.startHeartbeat()
        }, 5000); // 5秒一次，可以根据需要调整时间间隔
    }

    public stopHeartbeat() {
        if (this.heartbeatInterval) {
            clearInterval(this.heartbeatInterval); // 停止心跳定时器
            this.heartbeatInterval = undefined;
        }
    }
}
