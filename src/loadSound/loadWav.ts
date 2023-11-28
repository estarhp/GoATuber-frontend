import {Get} from "../apis";
import message from "../utils/message";

export class LoadWav {
    fetchBuffer(url: string) {
       return Get(url).then(([error, response]) => {
          if (error) {
              message.error("获取wav文件出现问题")
              return null
          }

          return response
        })
    }

}