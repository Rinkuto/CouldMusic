<template>
  <div class="recommend">
    <div>
      <router-link :to="{name:'songList'}" class="title">
        <span>推荐音乐</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-chevron-right"
             viewBox="0 0 16 16">
          <path fill-rule="evenodd"
                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
        </svg>
      </router-link>
    </div>
    <div class="music-list">
      <play-list-cell v-for="(item,index) in playList"
                  :key="index" :play-list="item"></play-list-cell>
    </div>
  </div>
</template>

<script setup lang="ts">
import PlayListCell from "../components/PlayListCell.vue"
import {onMounted, ref} from "vue";
import {getREMDPlayList} from "../api/music"

const playList = ref(<any>[]);

const getPlayList = async () => {
  const params = {limit: 10};
  await getREMDPlayList(params).then((response: any) => {
    if (response.code === 200) {
      playList.value = response.result;
    }
  })
}

onMounted(() => {
  getPlayList();
})

</script>

<style scoped>
.recommend {
  display: flex;
  margin: 20px 5% 0;
  flex-wrap: wrap;
}

.recommend .title {
  display: flex;
  padding: 10px 0;
}

.recommend .title > * {
  color: #303133;
  margin: auto 0;
  font-size: 24px;
  font-weight: bold;
}

.recommend .title > *:hover {
  color: #000000;
}

.recommend .music-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 60px 2em;
  margin: 0 auto;
}

</style>