import axios from "axios";
import {handleBaseUrl} from "./tools";

axios.interceptors.request.use((config) => {
    return handleBaseUrl(config)
})


axios.interceptors.response.use(
    (response) => {
        if (response.status !== 200) Promise.reject(response.data)

        return response.data
    },
    (error) => {

    }
)