import axios from "axios";
import {base64ToArrayBuffer} from "../utils/index.js";
import {useStore} from "vuex";

export default async function  getBuffer(data){
    let response
    const store = useStore()
    try {
        switch (data["VType"]) {
            case 1 :
                response =  await axios({
                    url:data.voice,
                    method:"get",
                    responseType:"arraybuffer"
                })
                response = response.data
                break
            //如果为 2 和 3 则需要转化为arraybuffer
            case 2  :
                response = base64ToArrayBuffer(data.voice)
                break
            case 3  :
                response = base64ToArrayBuffer(data.voice)
                break

        }
    }catch(error) {
        console.error(error)
        window.websocket.send(-1)
    }
    return response
}