<template>
  <div>
    <audio ref="audio"
           @ended="playEnd"
           @timeupdate="setCurrentTime(audio.currentTime)"/>
  </div>
</template>

<script setup lang="ts">
import {setCurrentTime,getCurrentMusic, getAudio, setIsPause, playEnd, play} from "../unit/SongPlay";
import {getMusicUrl} from "../api/music";
import {computed, defineEmits, defineProps, ref, watch} from "vue";

const musicUrl = ref(<MusicUrl>{});
const audio = getAudio();

watch(getCurrentMusic, (value) => {
  MusicUrl();
})

watch(
    () => prop.currentTime,
    () => {
      if (prop.currentTime !== undefined) {
        if (prop.currentTime > 1000)
          audio.value.currentTime = prop.currentTime / 1000;
        else
          audio.value.currentTime = prop.currentTime;
      }
    })

const getUrl = computed(() => {
  console.log('https://music.163.com/song/media/outer/url?id=' + musicUrl.value.id + '.mp3')
  return musicUrl.value.url;
})

const MusicUrl = async () => {
  const params = {id: getCurrentMusic()?.id};
  await getMusicUrl(params).then((response: any) => {
    if (response.code === 200) {
      musicUrl.value = response.data[0];
      setIsPause(false)
      audio.value.src = musicUrl.value.url;
      play();
    }
  })
}

export interface MusicUrl {
  url: string,
  type: string,
  id: string,
}

const prop = defineProps({
  currentTime: {
    type: Number,
    require: true,
    default: 0,
  }
})

const emit = defineEmits(['changeCurrentTime'])

</script>

<style scoped>

</style>