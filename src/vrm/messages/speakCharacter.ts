import {Viewer} from "../vrmViewer/viewer";
//@ts-ignore
import getBuffer from "../../fetch/index.js"


const createSpeakCharacter = () => {
  let prevFetchPromise: Promise<unknown> = Promise.resolve();
  let prevSpeakPromise: Promise<unknown> = Promise.resolve();

  return (
    data:any,
    viewer: Viewer,
    onStart?: () => void,
    onComplete?: () => void
  ) => {

    const fetchPromise = prevFetchPromise.then(async () => {

      return await getBuffer(data)
    });

    prevFetchPromise = fetchPromise;
    prevSpeakPromise = Promise.all([fetchPromise, prevSpeakPromise]).then(
      ([audioBuffer]) => {
        onStart?.();
        if (!audioBuffer) {
          return;
        }
        return viewer.model?.speak(audioBuffer);
      }
    );
    prevSpeakPromise.then(() => {
      onComplete?.();
    });
  };
};

export const speakCharacter = createSpeakCharacter();

export const fetchAudio = async (
    url:string
): Promise<ArrayBuffer> => {

  if (url == null) {
    throw new Error("Something went wrong");
  }

  const resAudio = await fetch(url);
  const buffer = await resAudio.arrayBuffer();
  return buffer;
};
