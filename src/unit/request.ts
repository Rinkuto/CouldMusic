import axios from 'axios'
import {setMessage} from "./message";
import Cookie from 'js-cookie'

const service = axios.create({
    baseURL: 'http://127.0.0.1:3000',
    timeout: 10000,
    withCredentials: true,
})

service.interceptors.request.use((config) => {
    if (config.method === 'post') {
        config.data = {
            ...config.data,
            // timestamp: new Date().getTime(),
            // cookie: `MUSIC_A=${Cookie.get('MUSIC_A')};`
        }
    } else if (config.method === 'get') {
        config.params = {
            ...config.params,
            // timestamp: new Date().getTime(),
            // cookie: `MUSIC_A=${Cookie.get('MUSIC_A')};`
        }
    }
    return config
}, (error) => Promise.reject(error))

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