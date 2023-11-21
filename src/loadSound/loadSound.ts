export class LoadSound {
    private audioCtx: AudioContext | undefined
    private analyser: AnalyserNode | undefined
    private frequencyData: Uint8Array | undefined
    constructor() {
       this.initSoundLoader()
    }
    createAnalyser() {
        // 麦克风授权成功，此时用户已与页面进行了交互
        // 创建 AudioContext 对象
        this.audioCtx = new AudioContext();
        // 新建分析仪
        this.analyser =this.audioCtx.createAnalyser();
        // 根据 频率分辨率建立个 Uint8Array 数组备用
        this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);
        // 取音频文件成 arraybuffer
    }


    initSoundLoader() {

        const userAgent = navigator.userAgent.toLowerCase();

        if (userAgent.includes("obs")) {
            this.createAnalyser()
            return;
        }
        if (userAgent.includes("firefox") || userAgent.includes("chrome")) {
                navigator.mediaDevices.getUserMedia({audio: true})
                    .then(() => {
                        this.createAnalyser()
                    })
                    .catch((err) => {
                        alert('未授予音频权限或发生错误：' + err.name + ",请将sound(autoplay)权限改为allow，并刷新页面");
                    });
                return
        }

        alert("该浏览器未适配")
    }

    get getByteFrequencyData() {
        if (this.frequencyData && this.analyser){
            this.analyser.getByteFrequencyData(this.frequencyData)
            return this.frequencyData
        }

        return new Uint8Array()
    }
}
