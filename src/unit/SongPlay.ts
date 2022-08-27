import {ref, watch} from "vue";
import {getLength, getMusic, getMusicIndex} from "./story";


const current = ref<number>(0);
const audio = ref(<HTMLAudioElement>{});
const isPause = ref(true);
const order = ref(0)
const currentTime = ref<number>(0);

export function getVolume() {
    if (audio.value === undefined) {
        return 0;
    }
    return audio.value.volume;
}

export function setVolume(n: number) {
    audio.value.volume = n;
}

export function setCurrentTime(n: number) {
    currentTime.value = n;
}

export function getCurrentTime() {
    return currentTime;
}

export function getIsPause() {
    return isPause;
}

export function setIsPause(flag: boolean) {
    isPause.value = flag;
}

export function getAudio() {
    return audio;
}


export function getCurrent() {
    return current.value;
}

export function setCurrent(i: number) {
    if (i < 10000) {
        current.value = i;
    } else {
        current.value = getMusicIndex(i);
    }
}

export function getCurrentMusic() {
    if (getMusic(current.value) === undefined) {
        return null;
    }
    return getMusic(current.value);
}

export function getMusicDt() {
    if (getMusic(current.value) === undefined) {
        return 0;
    }
    return getMusic(current.value).dt;
}

export function setOrder(i: number) {
    order.value = i;
}

//上一首
export function prev() {
    current.value = current.value === 0 ? getLength() - 1 : current.value - 1;
    currentTime.value = 0;
}

//下一首
export function next() {
    current.value = current.value + 1 === getLength() ? 0 : (current.value + 1);
    currentTime.value = 0;
}

//播放音乐
export function play() {
    try {
        audio.value.play().then();
    } catch (e) {

    }
    isPause.value = false;
}

//暂停音乐
export function pause() {
    try {
        audio.value.pause();
    } catch (e) {
    }
    isPause.value = true;
}

export function playEnd() {
    if (order.value === 0) {
        if (current.value !== getLength() - 1) {
            next();
        }
    } else if (order.value === 1) {
        next();
    } else if (order.value === 2) {
        play();
        currentTime.value = 0;
    } else {
        current.value = Math.round(Math.random() * getLength());
        currentTime.value = 0;
    }
}

const changeCurrent = ref(0);

export function getChangeCurrent() {
    return changeCurrent;
}

export function setChangeCurrent(n: number) {
    changeCurrent.value = n;
}