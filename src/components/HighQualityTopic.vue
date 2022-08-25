<template>
  <div class="top-img">
    <router-link :to="{name:'playlist',params:{id:prop.hqPlayList.id}}">
      <div class="background" :style="setBGImg(prop.hqPlayList.coverImgUrl)">
        <div class="mask"></div>
      </div>
      <div class="box-msg">
        <div class="box-img" :style="setBGImg(prop.hqPlayList.coverImgUrl)"/>
        <div class="describe">
          <div class="badge">
            <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor"
                 class="bi bi-trophy"
                 viewBox="0 0 16 16">
              <path
                  d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935zM3.504 1c.007.517.026 1.006.056 1.469.13 2.028.457 3.546.87 4.667C5.294 9.48 6.484 10 7 10a.5.5 0 0 1 .5.5v2.61a1 1 0 0 1-.757.97l-1.426.356a.5.5 0 0 0-.179.085L4.5 15h7l-.638-.479a.501.501 0 0 0-.18-.085l-1.425-.356a1 1 0 0 1-.757-.97V10.5A.5.5 0 0 1 9 10c.516 0 1.706-.52 2.57-2.864.413-1.12.74-2.64.87-4.667.03-.463.049-.952.056-1.469H3.504z"/>
            </svg>
            </span>
            精选歌单
          </div>
          <div class="title">
            {{ prop.hqPlayList.name }}
          </div>
          <div class="description">
            {{ prop.hqPlayList.description }}
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script setup lang="ts">

import {PlayListInfo} from "./PlayListHead.vue";
import {defineProps, PropType} from "vue";

function setBGImg(src: string) {
  return {
    backgroundImage: `url(${src})`
  }
}

const prop = defineProps({
  hqPlayList: {
    type: Object as PropType<PlayListInfo>,
    required: true,
    default: {},
  }
})
</script>

<style scoped>
.mask {
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(13px);
  -webkit-backdrop-filter: blur(13px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: rgba(14, 14, 14, 0.19) 0 6px 15px 0;
  -webkit-box-shadow: rgba(14, 14, 14, 0.19) 0 6px 15px 0;
  -webkit-border-radius: 10px;
  color: rgb(128, 128, 128);
  filter: blur(40px);
  width: 100%;
  height: 178px;
}

.top-img {
  position: relative;
  width: 100%;
  height: 180px;
}

.top-img .background {
  position: absolute;
  height: 100%;
  width: 100%;
  border-radius: 10px;
  background-position: center;
  z-index: -2;
}

.top-img .box-msg {
  height: 152px;
  position: absolute;
  top: 0;
  display: flex;
  margin: 14px;
}

.top-img .box-msg .box-img {
  height: 152px;
  width: 152px;
  background-size: contain;
  background-repeat: no-repeat;
  border-radius: 6px;
}

.box-msg .describe {
  display: flex;
  margin-left: 14px;
  flex-direction: column;
  text-align: left;
  gap: 11px;
  max-width: calc(100% - 166px);
}

.box-msg .describe .badge {
  color: #eebe77;
  height: auto;
  width: 100px;
  padding: 4px 10px;
  border-radius: 30px;
  border: #eebe77 1px solid;
  display: inline-flex;
  justify-content: center;
  gap: 5px;
}

.badge svg {
  height: 100%;
}

.box-msg .describe .title {
  color: #FFF;
  font-size: 16px;
}

.box-msg .describe .description {
  color: #D4D7DE;
  font-size: 13px;
  /*max-width: calc(100% - 152px);*/
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>