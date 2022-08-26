<template>
  <div class="pagination">
    <div class="item svg" @click="first" v-show="prop.currentPage !== 1">
      首页
    </div>
    <div class="item"
         v-for="(i,index) in getMaxPage"
         :key="index"
         @click="click(i)"
         :class="prop.currentPage === i ? 'active':''">
      {{ i }}
    </div>
    <div class="item svg" @click="end" v-show="prop.currentPage !== getTotalPage">
      尾页
    </div>
  </div>
</template>

<script setup lang="ts">

import {computed, defineEmits, defineProps, h, ref} from "vue";


function first() {
  emit('getOffset', 0, 1);
}

function end() {
  emit('getOffset', (getTotalPage.value - 1) * prop.limit, getTotalPage.value);
}

function click(i: number) {
  emit('getOffset', (i - 1) * prop.limit, i);
}

const getTotalPage = computed(() => {
  return Math.floor((prop.totals % prop.limit === 0) ? (prop.totals / prop.limit) : (prop.totals / prop.limit + 1));
})

const getMaxPage = computed(() => {
  if (getTotalPage.value < prop.maxPage) {
    return generateArray(1, getTotalPage.value)
  }

  if (Math.floor(prop.maxPage / 2) >= prop.currentPage) {
    return generateArray(1, prop.maxPage)
  } else if (Math.floor(prop.maxPage / 2) + prop.currentPage >= getTotalPage.value) {
    return generateArray(getTotalPage.value - prop.maxPage + 1, getTotalPage.value)
  } else {
    let half = Math.floor((prop.maxPage - 1) / 2)
    return generateArray(prop.currentPage - half, prop.currentPage + half);
  }
})

function generateArray(start: number, end: number) {
  return Array.from(new Array(end + 1).keys()).slice(start)
}

const emit = defineEmits(['getOffset'])
const prop = defineProps({
  totals: {
    type: Number,
    required: true,
    default: 0,
  },
  limit: {
    type: Number,
    default: 50,
  },
  currentPage: {
    type: Number,
    required: true,
  },
  maxPage: {
    type: Number,
    default: 9,
  }
})

function getOffset() {
  emit('getOffset', prop.currentPage)
}
</script>

<style scoped>
.pagination {
  user-select: none;
  display: flex;
  justify-content: center;
  gap: 7px;
}

.pagination .item {
  cursor: pointer;
  padding: 2px 10px;
  border-radius: 4px;
  font-size: 10px;
  border: #D4D7DE 1px solid;
}

.pagination .svg {
  padding: 2px 6px;
}

.pagination svg {
  margin: auto 0;
  height: 100%;
}

.pagination .active {
  background-color: #1DCF9f;
  color: white;
}
</style>