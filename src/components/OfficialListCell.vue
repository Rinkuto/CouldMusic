<template>
  <div class="official-cell">
    <div class="img">
      <img :src="prop.officialListCell.coverImgUrl" alt="">
    </div>
    <div class="right">
      <table>
        <tbody>
        <tr v-for="(item,index) in tableList.slice(0,5)"
            :key="index"
            @click="current = index"
            :class="index === current ? 'active':''"
            @dblclick="getAllTracks()">
          <td>{{ index + 1 }}</td>
          <td>{{ item.name }}</td>
          <td>{{ getAuthorName(item.ar) }}</td>
        </tr>
        </tbody>
      </table>
      <div class="more">
        <router-link :to="{name:'playlist',params:{id:prop.officialListCell.id}}">
          <span>
            查看更多 >
          </span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {defineProps, onMounted, PropType, ref} from "vue";
import {PlayListInfo} from "./PlayListHead.vue";
import {getMusicDetail, getMusicListDetailedInfo, getMusicListAllTracks} from "../api/music";
import {AR, Song} from "./MusicList.vue";
import {setMusicList} from "../unit/story";
import {setCurrent} from "../unit/SongPlay";

const tableList = ref(<Song[]>[]);
const current = ref(-1);

const prop = defineProps({
  officialListCell: {
    type: Object as PropType<PlayListInfo>,
    require: true,
    default: {},
  }
})

const getTableList = async () => {
  let params = {id: prop.officialListCell?.id}
  await getMusicListDetailedInfo(params).then((response: any) => {
    if (response.code === 200) {
      let ids = response.playlist.trackIds as Array<any>;
      ids = ids.slice(0, 5).map(item => item.id) as number[];
      let params = {ids: ids.join(',')};
      getMusicDetail(params).then((response: any) => {
        if (response.code === 200) {
          tableList.value = response.songs;
        }
      })
    }
  })
}

const getAllTracks = async () => {
  const params = {id: prop.officialListCell?.id};
  await getMusicListAllTracks(params).then((response: any) => {
    if (response.code === 200) {
      setMusicList(response.songs);
      setCurrent(current.value);
    }
  });
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
  getTableList();
})
</script>

<style scoped>
.official-cell {
  display: flex;
  gap: 33px;
}

.official-cell .img {
  width: 180px;
  height: 180px;
}

.official-cell .img img {
  height: 100%;
  border-radius: 6px;
}

.official-cell .right {
  width: 100%;
  user-select: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.official-cell table {
  width: 100%;
}

.official-cell table tbody {
  width: 100%;
  display: flex;
  flex-direction: column;
  font-size: 12px;
}

.official-cell table tbody tr {
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
}

.official-cell table tbody td:first-child {
  min-width: 50px;
}

.official-cell table tbody td:nth-child(2) {
  width: 100%;
  text-align: left;
}

.official-cell table tbody td:last-child {
  text-align: right;
  width: 100%;
}

.official-cell table tbody tr:nth-child(-n+3) td:first-child {
  color: #F56C6C;
}

.official-cell table tbody tr:nth-child(odd) {
  background-color: #FAFCFF;
}

.official-cell table tbody tr:hover {
  background-color: #F2F3F5;
}

.official-cell table tbody .active {
  background-color: #EBEDF0 !important;
}

.official-cell .right .more {
  text-align: left;
  font-size: 13px;
  width: 100px;
  color: #606266;
  margin-left: 2.5%;
}

.official-cell .right .more span {
  text-align: left;
  font-size: 13px;
  width: 100px;
  color: #606266;
}

.official-cell .right .more span:hover {
  cursor: pointer;
  color: #303133;
}


</style>