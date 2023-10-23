import axios, {AxiosInstance, AxiosRequestConfig} from "axios"
import {message} from "antd"

export const createAxiosByInterceptors= function (config?: AxiosRequestConfig): AxiosInstance{
    const instance =  axios.create({
        timeout: 10000,
        withCredentials: true,
        ...config
    })

    instance.interceptors.request.use(
        function (config: any) {
            // 请求发起之前要做点什么
            return config;
        },
        function (error) {
            console.error(error)
        }
    )

    instance.interceptors.response.use(
        function (response){
            const {code, data} = response.data
            if (code === 200) return data
            message.error("请求出现位置错误")

        }
    )

    return instance
}
