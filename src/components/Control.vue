<template>
  <div class="svg-list">
    <Transition name="msg">
      <span class="order-info"
            v-show="isShowMsg">{{ msg[count] }}</span>
    </Transition>

    <div class="svg music-order"
         @click="setMusicOrder">
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-list"
           viewBox="0 0 16 16"
           v-show="count === 0">
        <path fill-rule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-repeat"
           viewBox="0 0 16 16"
           v-show="count === 1">
        <path
            d="M11 5.466V4H5a4 4 0 0 0-3.584 5.777.5.5 0 1 1-.896.446A5 5 0 0 1 5 3h6V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192Zm3.81.086a.5.5 0 0 1 .67.225A5 5 0 0 1 11 13H5v1.466a.25.25 0 0 1-.41.192l-2.36-1.966a.25.25 0 0 1 0-.384l2.36-1.966a.25.25 0 0 1 .41.192V12h6a4 4 0 0 0 3.585-5.777.5.5 0 0 1 .225-.67Z"/>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-repeat-1"
           viewBox="0 0 16 16"
           v-show="count === 2">
        <path
            d="M11 4v1.466a.25.25 0 0 0 .41.192l2.36-1.966a.25.25 0 0 0 0-.384l-2.36-1.966a.25.25 0 0 0-.41.192V3H5a5 5 0 0 0-4.48 7.223.5.5 0 0 0 .896-.446A4 4 0 0 1 5 4h6Zm4.48 1.777a.5.5 0 0 0-.896.446A4 4 0 0 1 11 12H5.001v-1.466a.25.25 0 0 0-.41-.192l-2.36 1.966a.25.25 0 0 0 0 .384l2.36 1.966a.25.25 0 0 0 .41-.192V13h6a5 5 0 0 0 4.48-7.223Z"/>
        <path d="M9 5.5a.5.5 0 0 0-.854-.354l-1.75 1.75a.5.5 0 1 0 .708.708L8 6.707V10.5a.5.5 0 0 0 1 0v-5Z"/>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-shuffle"
           viewBox="0 0 16 16"
           v-show="count === 3">
        <path fill-rule="evenodd"
              d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.624 9.624 0 0 0 7.556 8a9.624 9.624 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.595 10.595 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.624 9.624 0 0 0 6.444 8a9.624 9.624 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5z"/>
        <path
            d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192zm0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192z"/>
      </svg>
    </div>

    <div class="svg">
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
           class="bi bi-skip-start-fill"
           viewBox="0 0 16 16"
           @click="prev()">
        <path
            d="M4 4a.5.5 0 0 1 1 0v3.248l6.267-3.636c.54-.313 1.232.066 1.232.696v7.384c0 .63-.692 1.01-1.232.697L5 8.753V12a.5.5 0 0 1-1 0V4z"/>
      </svg>
    </div>

    <div class="svg-pause" @click="changeState">
      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor"
           class="bi bi-play-circle-fill"
           viewBox="0 0 16 16" style="color: #1DCF9f;"
           v-show="isPause">
        <path
            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor"
           class="bi bi-pause-circle-fill"
           viewBox="0 0 16 16" style="color: #1DCF9f;"
           v-show="!isPause">
        <path
            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5zm3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5z"/>
      </svg>
    </div>

    <div class="svg">
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-skip-end-fill"
           viewBox="0 0 16 16" @click="next()">
        <path
            d="M12.5 4a.5.5 0 0 0-1 0v3.248L5.233 3.612C4.693 3.3 4 3.678 4 4.308v7.384c0 .63.692 1.01 1.233.697L11.5 8.753V12a.5.5 0 0 0 1 0V4z"/>
      </svg>
    </div>

    <div class="svg sound" @click="isMute = !isMute"
         @mouseenter="isShowMusicProgress = true"
         @mouseleave="isShowMusicProgress = false">
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-volume-up"
           viewBox="0 0 16 16"
           v-show="!isMute">
        <path
            d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/>
        <path
            d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"/>
        <path
            d="M10.025 8a4.486 4.486 0 0 1-1.318 3.182L8 10.475A3.489 3.489 0 0 0 9.025 8c0-.966-.392-1.841-1.025-2.475l.707-.707A4.486 4.486 0 0 1 10.025 8zM7 4a.5.5 0 0 0-.812-.39L3.825 5.5H1.5A.5.5 0 0 0 1 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 7 12V4zM4.312 6.39 6 5.04v5.92L4.312 9.61A.5.5 0 0 0 4 9.5H2v-3h2a.5.5 0 0 0 .312-.11z"/>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-volume-mute"
           viewBox="0 0 16 16"
           v-show="isMute">
        <path
            d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zM6 5.04 4.312 6.39A.5.5 0 0 1 4 6.5H2v3h2a.5.5 0 0 1 .312.11L6 10.96V5.04zm7.854.606a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0z"/>
      </svg>
    </div>
    <Transition name="progress">
      <Progress :progress-width="100"
                class="music-progress"
                :percent="getVolume() * 100"
                @percent-change="(n) => setVolume(n.value/100)"
                @mouseenter="isShowMusicProgress = true"
                @mouseleave="isShowMusicProgress = false"
                v-show="isShowMusicProgress && !isMute">
      </Progress>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import {getIsPause, pause, play, prev, next, setOrder, getVolume, setVolume, getAudio} from "../unit/SongPlay";
import Progress from "./Progress.vue";

const isPause = ref(getIsPause());
const count = ref(0);
const msg = ref(['顺序播放', '列表循环', '单曲循环', '随机播放']);
const isMute = ref(false);
const isShowMsg = ref(false);
const isShowMusicProgress = ref(false);
const audio = getAudio();
const volume = ref(getVolume());

function changeState() {
  if (getIsPause().value === false) {
    pause();
  } else {
    play();
  }
}

watch(isMute, () => {
  audio.value.muted = isMute.value;
})

let setTime: number | undefined;

function setMusicOrder() {
  count.value = (count.value + 1) % 4;
  isShowMsg.value = true;
  setOrder(count.value);
  clearTimeout(setTime);
  setTime = setTimeout(() => {
    isShowMsg.value = false;
  }, 2000);
}

onMounted(() => {
  volume.value = audio.value.volume
})

</script>

<style scoped>
.svg-list {
  position: relative;
  display: flex;
  height: 36px;
  margin: 0 auto;

}

.svg-list .music-order {

}

.svg-list .order-info {
  position: absolute;
  width: 80px;
  padding: 5px 13px;
  border-radius: 30px;
  background-color: #000000;
  font-size: 8px;
  color: #ffffff;
  top: -100%;
  left: -7.6%;
  text-align: center;
  margin: 0 auto;
  user-select: none;
}

.svg-list .music-order svg {

}

.svg-list .svg {
  margin: 3px 0;
  height: 100%;
}

.svg-list .svg svg {
  margin: 0 15px;
}

.svg-list svg {
  margin: 0 15px;
}

.svg-list svg:hover {
  color: #1DCF9f;
  cursor: pointer;
}

.svg-list .sound {

}

.svg-list .music-progress {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  right: -45%;
}

.msg-enter-active,
.msg-leave-active {
  transition: opacity 0.5s ease;
}

.msg-enter-from,
.msg-leave-to {
  opacity: 0;
}

.progress-enter-active,
.progress-leave-active {
  transition: opacity 0.5s ease;
}

.progress-enter-from,
.progress-leave-to {
  opacity: 0;
}
</style>