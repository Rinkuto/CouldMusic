<template>
  <div class="play-list">
    <div v-if="isLoading">
      Loading
    </div>
    <div style="width: 100%" v-else>
      <play-list-head :play-list-info="DetailedInfo"
                      :creator="DetailedInfo.creator"
                      :length="AllTracks.length"></play-list-head>
      <div class="bar">
        <div class="item" v-for="(item,index) in barTitle"
             :key="item"
             :class="current === index ? 'active':''"
             @click="current = index">
          <span>{{ item.title }}</span>
          <div class="indicator"></div>
        </div>
      </div>
      <div>
        <keep-alive>
          <Transition name="music" mode="out-in">
            <component :is="barTitle[current].component"></component>
          </Transition>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {defineProps, onMounted, provide, ref} from "vue";
import {getMusicListAllTracks, getMusicListDetailedInfo} from "../api/music";
import PlayListHead, {PlayListInfo} from "../components/PlayListHead.vue";
import MusicList from "../components/MusicList.vue"
import Comment from "../components/Comment.vue"
import Collection from "../components/Collector.vue";
import {Song} from "../components/MusicList.vue";

const AllTracks = ref<Song[]>([]);
const DetailedInfo = ref(<PlayListInfo>{});
const isLoading = ref(true);
const current = ref(0);
const total = ref(0);
const barTitle = [
  {title: '歌曲列表', component: MusicList},
  {title: '评论', component: Comment},
  {title: '收藏者', component: Collection}];

const prop = defineProps({
  id: {
    type: String,
    default: '0',
  },
})
provide('songs', AllTracks);
provide('Play', DetailedInfo);
provide('totals', total);

const getAllTracks = async () => {
  const params = {id: prop.id};
  await getMusicListAllTracks(params).then((response: any) => {
    if (response.code === 200) {
      AllTracks.value = response.songs;
      isLoading.value = false;
    }
  });
}

const getDetailedInfo = async () => {
  const params = {id: prop.id};
  await getMusicListDetailedInfo(params).then((response: any) => {
    if (response.code === 200) {
      DetailedInfo.value = response.playlist;
      barTitle[1].title = barTitle[1].title + '(' + response.playlist.commentCount + ')';
      isLoading.value = false;
      total.value = response.playlist.commentCount;
    }
  })
}

onMounted(() => {
  getDetailedInfo();
  getAllTracks();
})

</script>

<style scoped>
.play-list {
  display: flex;
  width: 100%;
}

.play-list .bar {
  margin-top: 40px;
  display: flex;
  justify-content: left;
  user-select: none;
  gap: 0 20px;
}

.play-list .bar .item {
  cursor: pointer;
}

.play-list .bar .active {
  font-size: 22px;
  font-weight: bold;
}

.play-list .bar .active .indicator {
  margin-top: 5px;
  margin-left: 50%;
  transform: translate(-50%);
  width: 36px;
  height: 4px;
  background: #1DCF9f;
  border-radius: 20px;
}

.music-enter-active,
.music-leave-active {
  transition: opacity 0.25s ease;
}

.music-enter-from,
.music-leave-to {

  opacity: 0;
}

</style>