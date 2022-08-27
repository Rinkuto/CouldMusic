<template>
  <div class="song-list">
    <nav-bar :options="area"
             @click-option="getOption"></nav-bar>
    <div class="table">
      <table>
        <tbody>
        <tr v-for="(item,index) in songs"
            :key="index"
            @click="current = index"
            @dblclick="dbClick(index)"
            :class="current === index ? 'active':''">
          <td>{{ index + 1 < 10 ? '0' + (index + 1) : index + 1 }}</td>
          <td class="img">
            <img :src="item.al.picUrl" alt="">
          </td>
          <td class="name">{{ item.name }}</td>
          <td class="arName">{{ getAuthorName(item.ar) }}</td>
          <td class="alName">{{ item.al.name }}</td>
          <td>{{ timeFormat(item.dt) }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">

import NavBar from "./NavBar.vue"
import {onBeforeMount, reactive, ref} from "vue";
import {getNewSongs} from "../api/music";
import {AR, Song} from "./MusicList.vue";
import timeFormat from "../unit/timeFormat"
import {setMusicList} from "../unit/story";
import {setCurrent} from "../unit/SongPlay";

const songs = ref(<Song[]>[]);
const area = reactive([{name: '全部', id: 0}, {name: '华语', id: 7}, {name: '欧美', id: 96},
  {name: '日本', id: 8}, {name: '韩国', id: 16}]);

const current = ref(0);

function getOption(n: number) {
  current.value = n;
  NewSong();
}

function dbClick(i: number) {
  setMusicList(songs.value);
  setCurrent(i);
}

const NewSong = async () => {
  const params = {type: area[current.value].id};
  await getNewSongs(params).then((response: any) => {
    if (response.code === 200) {
      songs.value = ConvertSong(response.data);
    }
  })
}

onBeforeMount(() => {
  NewSong();
})

export interface NewSong {
  name: string,
  duration: number,
  id: number,
  album: {
    blurPicUrl: string,
    name: string,
    id: number,
    artists: {
      name: string,
      id: number,
    }[],
  }
}

function ConvertSong(newSongs: NewSong[]): Song[] {
  let songs: Song[] = [];
  for (let i = 0; i < newSongs.length; i++) {
    let song: Song = {al: {picUrl: ''}};
    song.al.picUrl = newSongs[i].album.blurPicUrl;
    song.al.id = newSongs[i].album.id;
    song.al.name = newSongs[i].album.name;
    song.id = newSongs[i].id;
    song.dt = newSongs[i].duration;
    song.ar = newSongs[i].album.artists;
    song.name = newSongs[i].name;
    songs.push(song);
  }
  return songs;
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
.song-list {

}

.table {
  /*display: flex;*/
  user-select: none;
  font-size: 13px;
  margin: 12px auto 0;
}

.table tbody .img {
  width: 55px;
  height: 55px;
}

.table tbody tr {
  padding: 5px 0;
  text-align: left;
}

.table tbody tr td {
  padding: 0 5px;
}

.table tbody .img img {
  width: 100%;
  height: 100%;
  border-radius: 8px;
}

.table tbody tr .name {
  min-width: 500px;
  max-width: 500px;
}

.table tbody tr .arName {
  min-width: 200px;
  max-width: 200px;
}

.table tbody tr .alName {
  min-width: 250px;
  max-width: 250px;
}

.table tbody tr:nth-child(odd) {
  background-color: #FAFCFF;
}

.table tbody tr:hover {
  background-color: #F2F3F5;
}

.table tbody .active {
  background-color: #EBEDF0 !important;
}

.table tbody .current {
  color: #1DCF9f !important;
}
</style>