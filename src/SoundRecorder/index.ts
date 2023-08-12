export type SoundColor = "#FFFF00"|"#70B603"|"#D9001B";
export type signText = "录音关闭/暂停" | "录音已开启" | "正在录音";

let isStart = false;
let mediaStream;
let audioContext;
let analyserNode;
let timer;
let haveTimer = false;
let animationFrameId;


export async function  InitPermission(Recorder){
     Recorder.getPermission().then(async () => {
        mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioContext = new AudioContext();
        analyserNode = audioContext.createAnalyser();
        analyserNode.fftSize = 256;

        const microphoneInput = audioContext.createMediaStreamSource(mediaStream);
        microphoneInput.connect(analyserNode);
    })
}




export function stopAnalyzing() {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId); // 停止递归调用
    }
}

export function startAnalyzing(start:Function,pause:Function) {
    const dataArray = new Uint8Array(analyserNode.fftSize);
    analyserNode.getByteFrequencyData(dataArray);

    const threshold = 20; // 设置阈值
    const bufferLength = analyserNode.frequencyBinCount;

    const checkVolume = () => {
        analyserNode.getByteFrequencyData(dataArray);
        const averageVolume = dataArray.reduce((acc, val) => acc + val, 0) / bufferLength;

        if (averageVolume > threshold) {
            if (haveTimer){
                clearTimeout(timer)
                haveTimer = false
            }
            if (!isStart){
                start();
                isStart = true;
            }
        }

        if (averageVolume < 5){
            if (isStart && !haveTimer){
                haveTimer  = true;
                timer = setTimeout(()=>{
                    pause()
                    isStart = false;
                },3000)

            }

        }

        animationFrameId = requestAnimationFrame(checkVolume);
    };

    checkVolume();
}
