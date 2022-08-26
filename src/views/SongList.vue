<template>
  <div class="song-list" ref="box">
    <div v-if="hqPlayList.length !== 0">
      <high-quality-topic :hq-play-list="hqPlayList[0]"></high-quality-topic>
    </div>
    <div class="nav">
      <div>
        <span class="button" @click="showMenu = !showMenu">{{ tag === '全部' ? '全部歌单' : tag }}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                 class="bi bi-chevron-right"
                 viewBox="0 0 16 16">
              <path fill-rule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
            </svg>
        </span>
      </div>
      <div>
        <span v-for="(tag,index) in tags"
              :key="index"
              @click="currentIndex = index"
              :class="currentIndex === index ? 'active':''"> {{ tag }}</span>
      </div>
    </div>
    <div style="position: relative; text-align: left">
      <Menu :categories="categories"
            :cats="sub"
            :tag="tag"
            v-show="showMenu"
            @get-tag="getTag"></menu>
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
import {getCategory, getHqPlayList, getTopPlayList} from "../api/music";
import {defineProps, onBeforeMount, onMounted, ref, watch} from "vue";
import {PlayListInfo} from "../components/PlayListHead.vue";
import {PlayList} from "../components/PlayListCell.vue";
import HighQualityTopic from "../components/HighQualityTopic.vue"
import PlayListCell from "../components/PlayListCell.vue"
import Pagination from "../components/Pagination.vue";
import Menu, {Tag} from "../components/Menu.vue"
import {useRoute} from "vue-router";

const tag = ref<string>('全部');
const tags = ref(['全部', '华语', '流行', '摇滚', '民谣', '电子', '另类/独立', '轻音乐', '综艺', '影视原声', 'ACG']);
const currentIndex = ref(0);
const hqPlayList = ref(<PlayListInfo[]>{});
const topPlayList = ref(<any[]>{});
const total = ref(0);
const currentPage = ref(1);
const offset = ref(0);
const box = ref();
const categories = ref(['语种', '风格', '场景', '情感', '主题']);
const sub = ref(<any[]>[]);
const showMenu = ref(false);

function getOffset(Offset: number, page: number) {
  currentPage.value = page;
  offset.value = Offset;
}

watch(currentIndex, () => {
  if (currentIndex.value > -1)
    tag.value = tags.value[currentIndex.value];
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

function getTag(Tag: Tag) {
  tag.value = Tag.name;
  showMenu.value = false;
  currentIndex.value = findTag(Tag);
}

function findTag(tag: Tag) {
  for (let i in tags.value) {
    if (tags.value[i] === tag.name)
      return Number(i);
  }
  return -1 * Math.random() * 1000;
}

const HqPlayList = async () => {
  const params = {cat: tag.value};
  await getHqPlayList(params).then((response: any) => {
    if (response.code === 200) {
      hqPlayList.value = response.playlists;
    }
  })
}

const TopPlayList = async () => {
  const params = {cat: tag.value, offset: offset.value};
  await getTopPlayList(params).then((response: any) => {
    if (response.code === 200) {
      topPlayList.value = response.playlists;
      total.value = response.total;
    }
  })
}

const getTags = async () => {
  await getCategory().then((response: any) => {
    if (response.code === 200) {
      sub.value = response.sub;
    }
  })
}

const route = useRoute();
onBeforeMount(() => {
  if (route.params.tag) {
    tag.value = route.params.tag as string;
    currentIndex.value = -1;
  }
  HqPlayList();
  TopPlayList();
  getTags();
})

const prop = defineProps({
  tag: {
    type: String,
    default: '全部',
  }
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
  justify-content: space-between;
  user-select: none;
}

.song-list .nav :last-child {
  margin: auto 0;
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

.song-list .nav .button {
  font-size: 14px;
  padding: 4px 20px;
  border: #CDD0D6 1px solid;
  border-radius: 30px;
  display: flex;
  gap: 3px;
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