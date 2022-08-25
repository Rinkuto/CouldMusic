<template>
  <div class="card" @mouseover="playShow = true" @mouseleave="playShow = false">
    <router-link :to="{name:'playlist',params:{id:prop.playList.id}}">
      <div class="card-img">
        <span class="amount">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-play"
               viewBox="0 0 16 16">
            <path
                d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/>
          </svg>
          {{ numberFormat(prop.playList.playCount) }}
        </span>
        <img :src="prop.playList.picUrl || prop.playList.coverImgUrl" alt="">
        <Transition name="play">
          <span class="play" v-show="playShow">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-play-circle"
                 viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path
                  d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"/>
            </svg>
          </span>
        </Transition>
      </div>
      <span class="title">{{ prop.playList.name }}</span>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import {defineProps, PropType, ref} from "vue";
import numberFormat from "../unit/numberFormat"

export interface PlayList {
  picUrl: string,
  coverImgUrl: string,
  playCount: number,
  id: string,
  name: string,
}

const prop = defineProps({
  playList: {
    type: Object as PropType<PlayList>,
    require: true,
    default: {},
  }
});
const playShow = ref(false);


</script>

<style scoped>
.card {
  padding: 0;
  max-width: calc((100% / 5) - 1.6em);
  width: 13.1em;
  min-width: 13.1em;
  height: 210px;
}

.card .card-img {
  width: 100%;
  height: 100%;
  position: relative;
  cursor: pointer;
}

.card .card-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.card .card-img .amount {
  position: absolute;
  z-index: 10;
  color: #e9e9eb;
  font-size: 10px;
  right: 0;
  margin: 2px 9px 0 0;
  display: flex;
}

.card .card-img .amount svg {
  margin: auto 0;
}

.card .card-img .play {
  position: relative;
  bottom: 40px;
  left: 36%;
  z-index: 10;
}

.card .card-img .play svg {
  color: #1DCF9f;
  background-color: white;
  border-radius: 50%;
  width: auto;
  height: auto;
}

.card .title {
  display: block;
  word-wrap: break-word;
  overflow: auto;
  word-break: normal;
  color: #606266;
}

.play-enter-active,
.play-leave-active {
  transition: opacity 0.5s ease;
}

.play-enter-from,
.play-leave-to {
  opacity: 0;
}

</style>