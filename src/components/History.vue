<template>
  <div class="history">
    <div class="title">
      <span>当前播放</span>
    </div>
    <div class="info">
      <span class="total">总 {{ musicList === undefined ? '0' : musicList.length }} 首</span>
      <span class="clean" @click="cleanMusicList">清空列表</span>
    </div>
    <div class="history-table">
      <history-table :songs="musicList" @click-music="clickMusic"></history-table>
    </div>
  </div>
</template>

<script setup lang="ts">

import {getMusic, getMusicList, setMusicList} from "../unit/story";
import {Song} from "./MusicList.vue";
import HistoryTable from "./HistoryTable.vue";
import {reactive} from "vue";

const musicList = reactive(getMusicList());

function cleanMusicList() {
  setMusicList([]);
}

function clickMusic(i: number) {
  console.log(getMusic(i))
}

</script>

<style scoped>
.history {
  position: absolute;
  z-index: 999;
  right: 0;
  width: 400px;
  top: 0;
  height: calc(100% - 90px);
  padding: 20px 20px 0;
  background-color: #FAFCFF;
  -webkit-box-shadow: -2px -1px 12px 0 rgba(50, 50, 50, 0.46);
  -moz-box-shadow: -2px -1px 12px 0 rgba(50, 50, 50, 0.46);
  box-shadow: -2px -1px 12px 0 rgba(50, 50, 50, 0.46);
  user-select: none;
  overflow-y: scroll;
}

.history .title {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 15px;
}

.history .info {
  display: flex;
  justify-content: space-between;
}

.history .info .total {
  color: #CDD0D6;
  font-size: 13px;
}

.history .info .clean {
  color: #409EFF;
}

.history .info .clean:hover {
  color: #337ecc;
  cursor: pointer;
}

.history .info .history-table {
  overflow-y: scroll;
}
</style>