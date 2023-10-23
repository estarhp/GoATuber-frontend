import {createAxiosByInterceptors} from "./request";
const baseURL = ''

const instance = createAxiosByInterceptors(
    {
        baseURL
    }
)
export default instance