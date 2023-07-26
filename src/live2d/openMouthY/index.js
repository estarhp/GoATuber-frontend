import {arrayAdd} from "../../utils/index.js"
import getBuffer from "../../fetch/getAudioBuffer.js";


let audioCtx

let analyser

let frequencyData

let playing = false

let o = 80

export  async function getWav(data,store){
    let response

    response = await getBuffer(data)



    const audioData = response;
    audioCtx.decodeAudioData(audioData, (buffer)=>{
        // 新建 Buffer 源
        const source = audioCtx.createBufferSource();
        source.buffer = buffer;
        // 连接到 audioCtx
        source.connect(audioCtx.destination);
        // 连接到 音频分析器
        source.connect(analyser);
        // window.navigator.mediaDevices.getUserMedia({ audio: true });
        // 开始播放

        playing = true;
        run()
        setTimeout(() => {
            source.start(0);
        },0.5)
//调用相应地动作和表情
        store.state.model4.expression(data.expression)
        store.state.model4.motion(data["act"],data["movement"])



        source.onended = ()=>{
            // 停止播放
           playing = false;
           //清空model 的动作和表情
            store.state.websocket.send(0)
            store.state.model4.expression(0);
        }
    }).catch(error => {
        console.log(error)
        store.state.websocket.send(-1)
    })



    function run(){

        if(!playing) return;

        const frequencyData =getByteFrequencyData();

        const arr = [];
        // 频率范围还是太广了，跳采！
        for (var i = 0; i < 700; i += o) {
            arr.push(frequencyData[i]);
        }

        setMouthOpenY((arrayAdd(arr)/arr.length - 20)/store.state.percentage);

        setTimeout(run,1000/60);//相隔一段时间执行
    }

    function setMouthOpenY(v){
        //去除调小于0和大于1的值
        v = Math.max(0, Math.min(1, v));
        console.log(v)

        //mouthOpenY参数
        store.state.model4.internalModel.coreModel.setParameterValueByIndex(store.state.parameterIndex, v,1,true)


    }


}

export function createAnalyser() {
    if (location.protocol === 'https:') {
        // 当前页面使用 HTTPS 协议

        if(navigator.userAgent.indexOf("Firefox") != -1 || navigator.userAgent.indexOf("Chrome") != -1){
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then(function(stream) {
                    // 麦克风授权成功，此时用户已与页面进行了交互
                    // 创建 AudioContext 对象
                    audioCtx = new AudioContext();
                    // 处理音频流

                    // audioCtx = new AudioContext();
                    // 新建分析仪
                    analyser =audioCtx.createAnalyser();
                    // 根据 频率分辨率建立个 Uint8Array 数组备用
                    frequencyData = new Uint8Array(analyser.frequencyBinCount);
                    // 取音频文件成 arraybuffer
                })
                .catch(function(err) {
                    alert('未授予音频权限或发生错误：' + err.name+",请将sound(autoplay)权限改为allow");

                    audioCtx = new AudioContext();
                    // 处理音频流

                    // audioCtx = new AudioContext();
                    // 新建分析仪
                    analyser =audioCtx.createAnalyser();
                    // 根据 频率分辨率建立个 Uint8Array 数组备用
                    frequencyData = new Uint8Array(analyser.frequencyBinCount);
                    // 取音频文件成 arraybuffer

                });



        }else {
            audioCtx = new AudioContext();
            // 处理音频流

            // audioCtx = new AudioContext();
            // 新建分析仪
            analyser =audioCtx.createAnalyser();
            // 根据 频率分辨率建立个 Uint8Array 数组备用
            frequencyData = new Uint8Array(analyser.frequencyBinCount);
            // 取音频文件成 arraybuffer
        }
    }else {
        audioCtx = new AudioContext();
        // 处理音频流

        // audioCtx = new AudioContext();
        // 新建分析仪
        analyser =audioCtx.createAnalyser();
        // 根据 频率分辨率建立个 Uint8Array 数组备用
        frequencyData = new Uint8Array(analyser.frequencyBinCount);
        // 取音频文件成 arraybuffer
    }



}
function getByteFrequencyData(){
    analyser.getByteFrequencyData(frequencyData);
    return frequencyData
}

