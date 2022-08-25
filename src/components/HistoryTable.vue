<template>
  <table class="history-table">
    <tbody>
    <tr v-for="(item,index) in prop.songs"
        :key="index"
        :class="setClass(index)"
        @click="current = index"
        @dblclick="setCurrent(index)">
      <td>{{ item.name }}</td>
      <td>{{ getAuthorName(item.ar) }}</td>
      <td>{{ timeFormat(item.dt) }}</td>
    </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">

import {Song} from "./MusicList.vue";
import {defineEmits, defineProps, PropType, ref} from "vue";
import {AR} from "./MusicList.vue";
import timeFormat from "../unit/timeFormat";
import {getCurrent,setCurrent} from "../unit/SongPlay";

const emits = defineEmits(['clickMusic'])
const prop = defineProps({
  songs: {
    type: Array as PropType<Song[]>,
    require: true,
    default: [],
  }
})

const current = ref(-1);

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

function setClass(i: number) {
  let classes = '';
  if (current.value === i) {
    classes += ' active'
  }
  if (getCurrent() === i) {
    classes += ' current'
  }
  return classes;
}
</script>

<style scoped>
.history-table {
  height: 100%;
  width: 100%;
  font-size: 10px;
}

.history-table tbody tr {
  line-height: 30px;
}

.history-table tbody tr td {
  text-overflow: ellipsis;
  overflow: hidden;
}

.history-table tbody tr:nth-child(odd) {
  background-color: #FAFCFF;
}

.history-table tbody tr:hover {
  background-color: #F2F3F5;
}

.history-table tbody .active {
  background-color: #EBEDF0 !important;
}

.history-table tbody .current {
  color: #1DCF9f !important;
}
</style>