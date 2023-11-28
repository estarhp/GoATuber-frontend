import axios, {AxiosError, AxiosResponse} from "axios";

export function Get(url: string): Promise<[AxiosError | null, AxiosResponse["data"] | null]> {
    return new Promise((resolve) => {
        axios.get(url).then((res) => {
            resolve([null, res])
        }).catch((error) => {
            resolve([error, null])
        })
    })
}