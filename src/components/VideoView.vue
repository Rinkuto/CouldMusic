<template>
  <div class="foot-bar">
    <div class="foot-bar-left">
      <div class="music-img" @click="showMask = true">
        <img :src="music.img" alt="">
        <div class="music-img-svg">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
               class="bi bi-chevron-double-up" viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                  d="M7.646 2.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 3.707 2.354 9.354a.5.5 0 1 1-.708-.708l6-6z"/>
            <path fill-rule="evenodd"
                  d="M7.646 6.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 7.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
          </svg>
        </div>
      </div>
      <Teleport to="body">
        <Transition name="mask">
          <Mask v-if="showMask" @close-mask="showMask = false"></Mask>
        </Transition>
      </Teleport>
      <div class="music-info">
        <div><span class="music-name">{{ music.name }}</span></div>
        <div><span>{{ music.ar }}</span></div>
      </div>
    </div>
    <div class="foot-bar-center">
      <control></control>
      <div class="play-view">
        <span>{{ timeFormat(currentTime) }}</span>
        <music-progress @percent-change="getPercent" :percent="setPercent"></music-progress>
        <span>{{ timeFormat(getMusicDt()) }}</span>
      </div>
    </div>
    <div class="foot-bar-right">
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-music-note-list"
           viewBox="0 0 16 16" @click="showHistoryList">
        <path d="M12 13c0 1.105-1.12 2-2.5 2S7 14.105 7 13s1.12-2 2.5-2 2.5.895 2.5 2z"/>
        <path fill-rule="evenodd" d="M12 3v10h-1V3h1z"/>
        <path d="M11 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 16 2.22V4l-5 1V2.82z"/>
        <path fill-rule="evenodd"
              d="M0 11.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 7H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 3H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5z"/>
      </svg>
    </div>
    <Teleport to="body">
      <Transition name="history">
        <History v-show="isShowHistory"></History>
      </Transition>
    </Teleport>
    <player :current-time="changeCurrent"></player>
  </div>
</template>

<script setup lang="ts">

import {computed, onMounted, Ref, ref, watch} from "vue";
import timeFormat from "../unit/timeFormat";
import {getMusicDt, getAudio, getCurrentMusic, getCurrentTime, setCurrentTime, getCurrent} from "../unit/SongPlay"
import MusicProgress from "./Progress.vue";
import Mask from "./Mask.vue"
import History from "./History.vue";
import Player from "./Player.vue"
import {AR} from "./MusicList.vue";
import Control from "./Control.vue"

const showMask = ref<boolean>(false);
const isShowHistory = ref<boolean>(false);
const currentTime = getCurrentTime();
const changeCurrent = ref(0);

const setPercent = computed(() => {
  return (currentTime.value * 1000 * 100) / getMusicDt();
})


const music = ref({img: '/src/static/img/cover.68b9bf02.png', name: '歌名', ar: '作者'})
watch(getCurrentMusic, (value) => {
  if (value !== null) {
    music.value.name = value.name;
    music.value.img = value.al.picUrl;
    music.value.ar = getAuthorName(value.ar);
  } else {
    music.value.img = '/src/static/img/cover.68b9bf02.png';
    music.value.name = '歌名';
    music.value.ar = '作者';
  }
})

function getPercent(n: Ref) {
  changeCurrent.value =  Number(n.value) * getMusicDt() / (100 * 1000);
}

function showHistoryList() {
  isShowHistory.value = !isShowHistory.value;
}

const getAuthorName = function (ARs: AR[]): string {
  let res = '';
  for (let i = 0; i < ARs.length; i++) {
    if (i === 0)
      res += ARs[i].name;
    else
      res += ' / ' + ARs[i].name;
  }
  return res;
}
</script>

<style scoped>
.foot-bar {
  display: flex;
  border-top: #DCDFE6 1px solid;
  user-select: none;
  justify-content: space-between;
  padding: 10px;
}

.foot-bar-left {
  float: left;
  display: flex;
  max-width: 250px;
  min-width: 250px;
}

.foot-bar-left img {
  width: 48px;
  height: 48px;
  background-color: #DCDFE6;
  border-radius: 6px;
}

.foot-bar-left .music-img-svg {
  position: relative;
  background-color: #303133;
  height: 48px;
  width: 48px;
  bottom: 53%;
  z-index: 5;
  opacity: 0.7;
  display: none;
  border-radius: 6px;
}

.foot-bar-left .music-img-svg svg {
  color: #DCDFE6;
  position: relative;
  top: 46%;
  transform: translateY(-50%);
}

.music-img:hover .music-img-svg {
  display: block;
  cursor: pointer;
}

.music-info {
  display: inline-flex;
  flex-direction: column;
  margin-left: 10px;
  text-align: left;
  width: 100%;
  padding: 2px;
  max-width: 100%;
}

.music-info span {
  display: inline-flex;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 100%;
}

.music-info .music-name {
  font-size: 18px;
}

.foot-bar-center {
  display: flex;
  margin: 0 auto;
  flex-direction: column;
}

.foot-bar-right {
  float: right;
  min-width: 250px;
  /*display: inline-flex;*/
  /*justify-content: center;*/
  /*margin: auto 0;*/
  cursor: pointer;
  line-height: 60px;
}

.play-view {
  display: flex;
  margin: 0 auto;
  justify-content: center;
}

.play-view span {
  margin: 0 5px;
  font-size: 10px;
}

.mask-enter-active {
  transition: all 0.8s ease-out;
}

.mask-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.mask-enter-from,
.mask-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

.history-enter-active {
  transition: all 0.3s ease-out;
}

.history-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.history-enter-from,
.history-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

</style>