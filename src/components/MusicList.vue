<template>
  <div v-if="songs.length === 0">

  </div>
  <div v-else class="music-list">
    <table class="music-table">
      <thead>
      <tr>
        <th v-for="(item,index) in title"
            :key="index"
            @click="clickTh(index)">
          {{ item.title }}
          <span class="sort" v-if="index > 1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                 class="bi bi-sort-down" viewBox="0 0 16 16" v-show="sortKey === index && sortOrder === -1">
            <path
                d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293V2.5zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sort-up"
                 viewBox="0 0 16 16" v-show="sortKey=== index && sortOrder === 1">
              <path
                  d="M3.5 12.5a.5.5 0 0 1-1 0V3.707L1.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L3.5 3.707V12.5zm3.5-9a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/>
            </svg>
          </span>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr @dblclick="dbClick(song.id)"
          v-for="(song,index) in filterSongs"
          :key="index"
          :class="current === index?'active':''"
          @click="current = index">
        <td>{{ index + 1 }}</td>
        <td class="operation">
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-heart"
               viewBox="0 0 16 16">
            <path
                d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download"
               viewBox="0 0 16 16">
            <path
                d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
            <path
                d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
          </svg>
        </td>
        <td>{{ song.name }}</td>
        <td>{{ getAuthorName(song.ar) }}</td>
        <td>{{ song.al.name }}</td>
        <td>{{ timeFormat(song.dt) }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import {computed, inject, reactive, Ref, ref} from "vue";
import timeFormat from "../unit/timeFormat";
import {getMusicList, setMusicList} from "../unit/story";
import {setCurrent} from "../unit/SongPlay";

const songs = inject('songs') as Ref;
const title = reactive([{title: '', key: ''}, {title: '操作', key: ''}, {
  title: '标题',
  key: 'name'
}, {title: '歌手', key: 'ar'}, {title: '专辑', key: 'al'}, {title: '时间', key: 'dt'}]);
const current = ref(-1);
const sortOrder = ref(0);
const sortKey = ref(0);
const filterKey = ref(null);

const filterSongs = computed(() => {
  let data = songs.value;
  if (filterKey) {
    //搜索进行筛选
  }
  const order = sortOrder.value;
  if (order !== 0) {
    const key = title[sortKey.value].key;
    if (key === 'name') {
      data = data.slice().sort((x: Song, y: Song) => {
        return musicName(x, y) * order;
      })
    } else if (key === 'ar') {
      data = data.slice().sort((x: Song, y: Song) => {
        return arName(x, y) * order;
      })
    } else if (key === 'al') {
      data = data.slice().sort((x: Song, y: Song) => {
        return alName(x, y) * order;
      })
    } else {
      data = data.slice().sort((x: Song, y: Song) => {
        return musicDt(x, y) * order;
      })
    }
  }
  return data;
})

function clickTh(i: number) {
  if (i > 1) {
    if (i === sortKey.value) {
      sortOrder.value = (++sortOrder.value + 1) % 3 - 1;
    } else {
      sortKey.value = i;
      sortOrder.value = 1;
    }
  }
  //0 不排序 1 升序 -1 降序
  //前两项不排序
}

//鼠标双击，添加播放列表
function dbClick(id: number) {
  setMusicList(songs.value);
  setCurrent(id);
}

function musicName(x: Song, y: Song): number {
  if (x.name === y.name) {
    return 0;
  } else if (x.name > y.name) {
    return 1;
  } else {
    return -1;
  }
}

function musicDt(x: Song, y: Song): number {
  if (x.dt === y.dt) {
    return 0;
  } else if (x.dt > y.dt) {
    return 1;
  } else {
    return -1;
  }
}

function arName(x: Song, y: Song): number {
  if (getAuthorName(x.ar) === getAuthorName(y.ar)) {
    return 0;
  } else if (getAuthorName(x.ar) > getAuthorName(y.ar)) {
    return 1;
  } else {
    return -1;
  }
}

function alName(x: Song, y: Song): number {
  if (x.al.name === y.al.name) {
    return 0;
  } else if (x.al.name > y.al.name) {
    return 1;
  } else {
    return -1;
  }
}

export interface AR {
  name: string,
  id: string,
}

export interface Song {
  name: string,
  id: number,
  al: {
    picUrl: string,
    id: string,
    name: string,
  }
  ar: AR[],
  dt: number,
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


</script>

<style scoped>
.music-list {
  margin-top: 20px;
}

.music-list .music-table {
  text-align: left;
  width: 100%;
  user-select: none;
}

.music-table thead tr th {
  min-width: 40px;
  width: auto;
  padding: 7px 10px 7px 0;
  position: relative;
}

.music-table thead tr th:first-child {
  width: 20px;
}

.music-table thead tr th:nth-child(4) {
  min-width: 220px
}

.music-table thead tr th:nth-child(5) {
  min-width: 220px
}

.music-table thead tr th:last-child {
  min-width: 100px;
}

.music-table thead th:not(:nth-child(-n+2)):hover,
.music-table tbody .active {
  background-color: #EBEDF0 !important;
}

.music-table thead .sort {
  position: absolute;
  right: 14px;
}

.music-table tbody {
  font-size: 14px;
}

.music-table tbody .operation {
  display: inline-flex;
  margin-left: 5px;
}

.music-table tbody .operation svg {
  margin: auto 5px;
  color: #909399;
}

.music-table tbody .operation svg:hover {
  cursor: pointer;
  color: #606266;
}

.music-table tbody tr {
  line-height: 30px;
}

.music-table tbody tr:nth-child(odd) {
  background-color: #FAFAFA;
}

.music-table tbody tr:hover {
  background-color: #F2F3F5;
}
</style>