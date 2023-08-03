import {Viewer} from "../vrmViewer/viewer";
//@ts-ignore
import getBuffer from "../../fetch/getAudioBuffer";



const createSpeakCharacter = () => {


  return async (
    data:any,
    viewer: Viewer,
    onStart?: () => void,
    onComplete?: () => void
  ) => {
    const audioBuffer = await getBuffer(data)
    onStart?.();
    if (!audioBuffer) {
      return;
    }
    viewer.model?.speak(audioBuffer);
    onComplete?.();
  }
};

export const speakCharacter = createSpeakCharacter();


