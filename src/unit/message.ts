import {ref} from "vue";


const message = ref('');

export function getMessage() {
    return message;
}

export function setMessage(msg: string) {
    message.value = msg;
}