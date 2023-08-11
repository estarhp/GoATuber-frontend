import {Viewer} from "../loadVRM/viewer";
//@ts-ignore
import getBuffer from "../../fetch/getAudioBuffer";



async function speakCharacter(
    data:any,
    viewer: Viewer,
    onStart?: () => void,
    onComplete?: () => void
  )  {
    const audioBuffer = await getBuffer(data)
    onStart?.();
    if (!audioBuffer) {
      return;
    }
    await viewer.model?.speak(audioBuffer);
    onComplete?.();
  }


export default speakCharacter


