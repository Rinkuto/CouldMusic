<template>
  <div class="exclusive">
    <div class="radar-play-list">
      <div class="title">雷达歌单</div>
      <div class="description">
        <div style="color: #909399;line-height: 30px">根据你的红心收藏为你推荐更多宝藏歌曲</div>
        <div class="svg">
          <div :class="disable === 0 ? 'disable':''">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
                 class="bi bi-chevron-left" @click="prev" viewBox="0 0 16 16">
              <path fill-rule="evenodd"
                    d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
            </svg>
          </div>
          <div :class="disable === 1?'disable':''">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
                 class="bi bi-chevron-right" @click="next" viewBox="0 0 16 16">
              <path fill-rule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
            </svg>
          </div>
        </div>
      </div>
      <div class="list">
        <div class="scroll-x" ref="list">
          <div class="box">
            <play-list-cell v-for="(item,index) in radarList"
                            :key="index" ref="item"
                            :play-list="item"></play-list-cell>
          </div>
        </div>
      </div>
    </div>
    <div class="music-play">
      <div class="title">暂停忙碌音乐Play</div>
      <div class="list">
        <play-list-cell v-for="(item,index) in musicList"
                        :key="index"
                        :play-list="item"></play-list-cell>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PlayListCell from "../components/PlayListCell.vue";
import {inject, onBeforeMount, Ref, ref, watch} from "vue";
import {getREMDPlayList} from "../api/music";

const radarList = ref(<any>[]);
const musicList = ref(<any[]>[]);
const scrollBottom = inject('scrollBottom') as Ref;

const list = ref();
const item = ref();
const current = ref(0);
const disable = ref(0);

function prev() {
  if (current.value === 0) {
    disable.value = 0;
  } else {
    current.value++;
    list.value.style.transform = `translateX(calc(${current.value * 209}px + ${current.value * 2.4}em))`;
    disable.value = -1;
  }
}

function next() {
  if (current.value === -5) {
    disable.value = 1;
  } else {
    current.value--;
    list.value.style.transform = `translateX(calc(${current.value * 209}px + ${current.value * 2.4}em))`;
    disable.value = -1;
  }
}

const getRadarList = async () => {
  const params = {limit: 10, timestamp: new Date().getTime()};
  await getREMDPlayList(params).then((response: any) => {
    if (response.code === 200) {
      radarList.value = response.result;
      console.log(radarList.value)
    }
  })
}

const getMusicList = async () => {
  const params = {limit: 30, timestamp: new Date().getTime()};
  await getREMDPlayList(params).then((response: any) => {
    if (response.code === 200) {
      response.result.forEach((item: any) => {
        musicList.value.push(item)
      })
    }
  })
}

watch(scrollBottom, () => {
  if (scrollBottom.value === true) {
    getMusicList();
  }
})

onBeforeMount(() => {
  getMusicList();
  getRadarList();
})
</script>

<style scoped>
.exclusive {
  width: 92%;
  margin: 0 auto;
  user-select: none;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.exclusive .radar-play-list {
  /*text-align: left;*/
}

.exclusive .radar-play-list .title {
  font-size: 20px;
  font-weight: bold;
  text-align: left;
}

.exclusive .radar-play-list .description {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-bottom: 10px;
}

.exclusive .radar-play-list .description .svg {
  display: flex;
  gap: 20px;
  margin: auto 0;
}

.exclusive .radar-play-list .description .svg div {
  border-radius: 50%;
  width: 30px;
  height: 30px;
  background-color: #F0F2F5;
  margin: auto 0;
  position: relative;
}

.exclusive .radar-play-list .description .svg .disable {
  background-color: #F2F6FC !important;
  color: #C0C4CC !important;
  cursor: initial !important;
}


.exclusive .radar-play-list .description .svg div:hover {
  cursor: pointer;
  background-color: #D4D7DE;
}

.exclusive .radar-play-list .description .svg div svg {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.radar-play-list .list {
  overflow: hidden;
}

.radar-play-list .list .scroll-x {
  position: relative;
  transition: 500ms all ease-in-out;
  height: 265px;
}

.radar-play-list .list .scroll-x .box {
  display: flex;
  width: 100%;
  gap: 2.4em;
  height: 100%;
  position: relative;
}

.exclusive .music-play .title {
  text-align: left;
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: bold;
}

.exclusive .music-play .list {
  display: flex;
  flex-wrap: wrap;
  gap: 4em 2.4em;
}

</style>