<template>
  <div class="lyric-box"
       ref="lyricBox"
       @scroll="changeScroll">
    <div class="lyric-list">
      <div class="lyric"
           v-for="(item,index) in prop.lyrics"
           :key="index"
           ref="lyric">
        <div :class="current === index ? 'active':''">{{ item.lyric }}</div>
        <div>{{ item.tlyric }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {defineProps, PropType, reactive, ref, watch} from "vue";
import {Lyric} from "../unit/formatMusicLyrics";
import {getCurrentTime} from "../unit/SongPlay";

const time = getCurrentTime();
const current = ref(0);
const lyricBox = ref();
const lyric = ref();
const isScroll = ref(false);

const prop = defineProps({
  lyrics: {
    type: Array as PropType<Lyric[]>,
    require: true,
    default: [],
  }
})

watch(time, () => {
  for (let i = 1; i < prop.lyrics?.length; i++) {
    if (time.value < prop.lyrics[i].time && time.value > prop.lyrics[i - 1].time) {
      current.value = i - 1;
      if (isScroll.value === false)
        lyricBox.value.scrollTop = (lyric.value[i - 1].scrollHeight) * (i);
      return;
    }
  }
})

const timePlay = ref<any>(null);

function changeScroll() {
  isScroll.value = true;
  clearInterval(timePlay.value);
  timePlay.value = setInterval(() => {
    isScroll.value = false;
  }, 1500);
}


</script>

<style scoped>

::-webkit-scrollbar{display:none}
.lyric-box {
  width: 500px;
  height: 530px;
  padding: 20px;
  margin: auto 0;
  position: relative;
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  right: -17px;
  left: 0;
  justify-content: center;
  user-select: none;
}

.lyric-box .lyric-list {
  display: flex;
  flex-direction: column;
  position: absolute;
  text-align: center;
  font-size: 14px;
  white-space: pre-wrap;
  line-height: 32px;
  padding: 230px 0;
}

.lyric-box .lyric-list .active {
  font-size: 17px;
  font-weight: bold;
  color: black;
}
</style>