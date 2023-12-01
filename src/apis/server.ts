import axios, {AxiosError, AxiosResponse} from "axios";
import {handleBaseUrl, handleGeneralError} from "./tools";

axios.interceptors.request.use((config) => {
    return handleBaseUrl(config)
})


axios.interceptors.response.use(
    (response) => {
        if (response.status !== 200) return Promise.reject(response.data)

        return response.data
    },
    (error) => {
        if (error)  handleGeneralError(error.response)

        return Promise.reject(error.response)

    }
)


export function Get(url: string): Promise<[AxiosError | null, AxiosResponse["data"] | null]> {
    return new Promise((resolve) => {
        axios.get(url).then((res) => {
            resolve([null, res])
        }).catch((error) => {
            resolve([error, null])
        })
    })
}