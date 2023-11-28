import {AxiosError, InternalAxiosRequestConfig} from "axios";
import baseUrl from "../constant/baseUrl";
import message from "../utils/message";

export function handleBaseUrl(config: InternalAxiosRequestConfig) {
    config.baseURL = baseUrl
    return config
}


export function handleGeneralError(error: AxiosError["response"]) {
    if (!error) return
    let errMsg = null
    switch (error.status) {
        case 500 : {
            errMsg = "服务端错误"
            break
        }
        case 404: {
            errMsg = "资源未找到"
            break
        }
        default: {
            errMsg = "未知错误"
        }
    }

    message.error(errMsg)
}