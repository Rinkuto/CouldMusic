import axios from 'axios'
import {setMessage} from "./message";

const service = axios.create({
    baseURL: '/api',
    timeout: 10000,
    withCredentials: true,
})

service.interceptors.response.use(
    (response: { data: any }) => {
        if (response.data.code != 200) {
            setMessage(response.data.message)
        }
        return response.data;
    },
    (error: { response: any }) => {
        console.log(error);
        setMessage(error.response.data.message);
        return Promise.reject(error);
    }
)

export default service;