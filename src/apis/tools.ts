import {InternalAxiosRequestConfig} from "axios";
import baseUrl from "../constant/baseUrl";

export function handleBaseUrl(config: InternalAxiosRequestConfig) {
    config.baseURL = baseUrl
    return config
}


export function handleGeneralError(error) {

}