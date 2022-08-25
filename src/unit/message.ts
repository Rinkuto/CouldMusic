import {ref} from "vue";


const message = ref('');

export function getMessage() {
    console.log("get:", message.value)
    return message;
}

export function setMessage(msg: string) {
    message.value = msg;
    console.log("set:", message.value)
}