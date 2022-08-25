import {ref} from "vue";
import {Song} from "../components/MusicList.vue";

const musicList = ref<Song[]>([]);

export function getMusicList() {
    return musicList;
}

export function setMusicList(songs: Song[]) {
    musicList.value = songs;
}

export function getMusic(i: number) {
    return musicList.value[i];
}

export function getLength() {
    return musicList.value.length;
}

export function getMusicIndex(id: number) {
    for (let i = 0; i < musicList.value.length; i++) {
        if (musicList.value[i].id === id) {
            return i;
        }
    }
    return 0;
}