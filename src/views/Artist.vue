<template>
  <div class="artist">
    <div class="artist-nav">
      <div class="artist-nav-column"
           v-for="(item,i) in options"
           :key="i">
        <div class="title">{{ item.title }}：</div>
        <div class="options">
          <span class="option"
                v-for="(option,j) in item.options"
                :key="j"
                :class="current[i] === j ? 'active':''"
                @click="current[i]=j">
            {{ option.name }}
          </span>
        </div>
      </div>
    </div>
    <div class="artist-list">
      <artist-cell v-for="(artist,index) in artists"
                   :key="index"
                   :artist="artist"></artist-cell>
    </div>
  </div>
</template>

<script setup lang="ts">

import {computed, inject, onBeforeMount, reactive, Ref, ref, watch} from "vue";
import {getArtistList} from "../api/music";
import ArtistCell from "../components/ArtistCell.vue"

const area = reactive([{name: '全部', id: -1}, {name: '华语', id: 7}, {name: '欧美', id: 96},
  {name: '日本', id: 8}, {name: '韩国', id: 16}, {name: '其他', id: 0}]);
const type = reactive([{name: '全部', id: -1}, {name: '男歌手', id: 1}, {name: '女歌手', id: 2}, {name: '乐队', id: 3}])
const initial = reactive<Array<any>>([{name: '热门', id: -1}]);
const options = ref([{title: '语种', options: area}, {title: '分类', options: type}, {title: '筛选', options: initial}]);
const current = reactive([0, 0, 0]);
const artists = ref(<any>[]);
const offset = ref(0);
const page = ref(0);
const scrollBottom = inject('scrollBottom') as Ref;

watch(current, () => {
  artists.value = [];
  offset.value = 0;
  page.value = 0;
  getArtist();
})

watch(scrollBottom, () => {
  if (scrollBottom.value === true && page.value < 7) {
    offset.value = (++page.value) * 50;
    getArtist();
  }
})

const getParams = computed(() => {
  return {
    limit: 50,
    offset: offset.value,
    area: area[current[0]].id,
    type: type[current[1]].id,
    initial: initial[current[2]].id
  }
})

const getArtist = async () => {
  const params = getParams.value;
  await getArtistList(params).then((response: any) => {
    if (response.code === 200) {
      response.artists.forEach((item: any) => {
        artists.value.push(item);
      })
    }
  })
}

onBeforeMount(() => {
  for (let i = 0; i < 26; i++) {
    initial.push({name: String.fromCodePoint(65 + i), id: String.fromCodePoint(97 + i)})
  }
  initial.push({name: '#', id: 0});
  getArtist();
})
</script>

<style scoped>
.artist {
  display: flex;
  flex-direction: column;
  justify-content: left;
  user-select: none;
  width: 92%;
  margin: 0 auto;
}

.artist .artist-nav {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.artist .artist-nav .artist-nav-column {
  display: flex;
  gap: 10px;
  font-size: 13px;
}

.artist .artist-nav .artist-nav-column .options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 18px;
}

.artist .artist-nav .artist-nav-column .title {
  margin-right: 10px;
  min-width: 48px;
}

.artist .artist-nav .artist-nav-column .option {
  min-width: 40px;
  color: #606266;
  border-radius: 30px;

}

.artist .artist-nav .artist-nav-column .option:hover {
  color: #303133;
  cursor: pointer;
}

.active {
  color: #1DCF9f !important;
  background-color: rgba(29, 207, 159, 0.08);
}

.artist .artist-list {
  display: flex;
  flex-wrap: wrap;
  gap: 13px 26px;
}
</style>