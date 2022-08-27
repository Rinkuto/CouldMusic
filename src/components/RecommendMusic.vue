<template>
  <div class="recommend">
    <title-name title="推荐歌单" router-name="songList"></title-name>
    <div class="music-list">
      <play-list-cell v-for="(item,index) in playList"
                      :key="index" :play-list="item"></play-list-cell>
    </div>
  </div>
</template>

<script setup lang="ts">
import PlayListCell from "./PlayListCell.vue"
import {onMounted, ref} from "vue";
import {getREMDPlayList} from "../api/music"
import TitleName from "./Title.vue"

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

.recommend .music-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 60px 2em;
  margin: 0 auto;
}

</style>