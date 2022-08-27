<template>
  <div class="mask">
    <div class="close-svg" @click="$emit('closeMask',false)">
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-chevron-down"
           viewBox="0 0 16 16">
        <path fill-rule="evenodd"
              d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
      </svg>
    </div>
    <div class="mask-main">

      <div class="left">
        <div class="img">
          <img :src="music === null ? '/src/static/img/cover.68b9bf02.png' : music.al.picUrl" alt="">
        </div>
        <div class="title">
          <div class="music-name">
            {{ music === null ? '名字' : music.name }}
          </div>
          <div class="artist-name">
            {{ music === null ? '歌手' : getAuthorName(music.ar) }}
          </div>
        </div>
        <div class="progress mx-auto">
          <span>{{ timeFormat(currentTime) }}</span>
          <music-progress
              @percent-change="getPercent"
              :percent="setPercent"
              :progress-width="270"></music-progress>
          <span>{{ timeFormat(getMusicDt()) }}</span>
        </div>
        <div class="control mx-auto">
          <control></control>
        </div>
      </div>

      <div class="right">
        <lyric-box :lyrics="lyric"></lyric-box>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {computed, defineEmits, onMounted, Ref, ref, watch} from "vue";
import {getLyric} from "../api/music";
import {formatMusicLyrics} from "../unit/formatMusicLyrics"
import {Lyric} from "../unit/formatMusicLyrics";
import {getCurrentMusic, getCurrentTime, getMusicDt, setChangeCurrent} from "../unit/SongPlay";
import {AR, Song} from "../components/MusicList.vue";
import Control from "../components/Control.vue"
import MusicProgress from "../components/Progress.vue";
import timeFormat from "../unit/timeFormat";
import LyricBox from "../components/Lyric.vue"
import {MusicUrl} from "../components/Player.vue";

const currentTime = getCurrentTime();

const setPercent = computed(() => {
  return (currentTime.value * 1000 * 100) / getMusicDt();
})

const emits = defineEmits(['closeMask']);
const lyric = ref(<Lyric[]>[]);
const music = ref(getCurrentMusic());

function getPercent(n: Ref) {
  setChangeCurrent(Number(n.value) * getMusicDt() / (100 * 1000))
}

watch(getCurrentMusic, (value) => {
  music.value = getCurrentMusic();
  GetLyric();
})

const GetLyric = async () => {
  const params = {id: music.value?.id}
  await getLyric(params).then((response: any) => {
    if (response.code === 200) {
      lyric.value = formatMusicLyrics(response);
    }
  })
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

onMounted(() => {
  GetLyric();
})
</script>

<style scoped>
.mask {
  position: absolute;
  display: flex;
  z-index: 100;
  width: 95.8%;
  top: 0;
  height: 100%;
  min-width: 1000px;
  background: rgb(227, 227, 227);
  background: radial-gradient(circle, rgba(227, 227, 227, 1) 0%, rgba(255, 255, 255, 1) 48%, rgba(215, 215, 215, 1) 100%);
  padding: 1em 2em;
}

.mask .close-svg {

}

.mask .close-svg:hover {
  cursor: pointer;
}

.mask .mask-main {
  display: flex;
  margin: 0 auto;
  gap: 50px;
}

.mask-main .left {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
}

.mask-main .left .img {
  width: 400px;
  height: 400px;
}

.mask-main .left .img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  animation: rotate 20s linear infinite;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.mask-main .left .title {
  display: flex;
  flex-direction: column;
}

.mask-main .left .title .music-name {
  color: black;
  font-size: 22px;
  font-weight: bold;
}

.mask-main .left .title .artist-name {
  color: #909399;
  font-size: 16px;
}

.mask-main .left .progress {
  display: flex;
  margin: 0 auto;
  justify-content: center;
  gap: 10px;
}

.mx-auto {
  margin: 0 auto;
}

.mask-main .left .control {

}

.mask-main .right {
  margin: auto 0;
}
</style>