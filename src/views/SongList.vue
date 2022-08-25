<template>
  <div class="song-list" ref="box">
    <div>
      <high-quality-topic :hq-play-list="hqPlayList[0]"></high-quality-topic>
    </div>
    <div class="nav">
      <span v-for="(tag,index) in tags"
            :key="index"
            @click="currentIndex = index"
            :class="currentIndex === index ? 'active':''"> {{ tag }}</span>
    </div>
    <div class="music-list">
      <play-list-cell v-for="(playList,index) in topPlayList"
                      :key="index"
                      :play-list="playList"/>
    </div>
    <div class="pagination">
      <pagination :totals="total"
                  :current-page="currentPage"
                  @get-offset="getOffset"></pagination>
    </div>
  </div>
</template>

<script setup lang="ts">
import {getHqPlayList, getTopPlayList} from "../api/music";
import {onBeforeMount, ref, watch} from "vue";
import {PlayListInfo} from "../components/PlayListHead.vue";
import {PlayList} from "../components/PlayListCell.vue";
import HighQualityTopic from "../components/HighQualityTopic.vue"
import PlayListCell from "../components/PlayListCell.vue"
import Pagination from "../components/Pagination.vue";

const tags = ref(['全部', '华语', '流行', '摇滚', '民谣', '电子', '另类/独立', '轻音乐', '综艺', '影视原声', 'ACG']);
const currentIndex = ref(0);
const hqPlayList = ref(<PlayListInfo[]>{});
const topPlayList = ref(<any[]>{});
const total = ref(0);
const currentPage = ref(1);
const offset = ref(0);
const box = ref();

function getOffset(Offset: number, page: number) {
  currentPage.value = page;
  offset.value = Offset;
}

watch(currentIndex, () => {
  offset.value = 0;
  currentPage.value = 1;
  HqPlayList();
  TopPlayList();
})

watch(offset, () => {
  HqPlayList();
  TopPlayList();
  box.value.scrollIntoView();
})

const HqPlayList = async () => {
  const params = {cat: tags.value[currentIndex.value]};
  await getHqPlayList(params).then((response: any) => {
    if (response.code === 200) {
      hqPlayList.value = response.playlists;
    }
  })
}

const TopPlayList = async () => {
  const params = {cat: tags.value[currentIndex.value], offset: offset.value};
  await getTopPlayList(params).then((response: any) => {
    if (response.code === 200) {
      topPlayList.value = response.playlists;
      total.value = response.total;
    }
  })
}

onBeforeMount(() => {
  HqPlayList();
  TopPlayList();
})
</script>

<style scoped>
.song-list {
  width: 92%;
  height: 100%;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
}

.song-list .nav {
  margin: 20px 0;
  display: flex;
  justify-content: left;
  user-select: none;
}

.song-list .nav span {
  list-style: none;
  float: left;
  cursor: pointer;
  font-size: 13px;
  margin: 0 10px 0 0;
  border-radius: 10px;
  padding: 0 12px;
  line-height: 22px;
}

.song-list .nav .active {
  color: #1DCF9f;
  background-color: rgba(29, 207, 159, .1);
}

.song-list .music-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 60px 2.4em;
  margin: 0 auto;
}

.pagination {
  margin-top: 2.2em;
  margin-bottom: 5em;
}
</style>