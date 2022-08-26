<template>
  <div class="h-100">
    <el-container class="h-100">
      <el-aside style="width:180px;background-color: #f6f6f6;">
        <div class="menu">
          <ul>
            <li v-for="(menu,index) in menuList"
                :key="index"
                @click="menuActive = index"
                :class="index === menuActive ? 'menuActive':''">
              {{ menu }}
            </li>
          </ul>
        </div>
      </el-aside>
      <el-container>
        <el-header class="header" height="68px">
          <ul>
            <router-link :to="{name:head.name}"
                         v-for="(head,index) in headList"
                         :key="index" class="nav">
              <li :class="setClass(index)">
                {{ head.title }}
                <div class="indicator"></div>
              </li>
            </router-link>
          </ul>
        </el-header>
        <el-main id="box"
                 @scroll.passive="scroll"
                 class="main">
          <router-view></router-view>
        </el-main>
        <el-footer height="70px">
          <video-view></video-view>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, provide, ref, watch} from "vue";
import VideoView from "./VideoView.vue"
import {useRoute} from "vue-router";

const menuList = ref(['发现音乐', '播客', '关注', '直播', '私人fm']);
const menuActive = ref(0);
const headList = ref([{
  title: '个性推荐',
  path: '/discover', name: 'main',
}, {title: '专属定制', path: '/discover/exclusive', name: 'exclusive'}, {
  title: '歌单',
  path: '/discover/playlist',
  name: 'songList'
}, {title: '排行榜', path: '/toplist', name: 'topList'}, {
  title: '歌手',
  path: '/artist', name: 'artist'
}, {title: '最新音乐', path: '/album', name: 'Album'}]);
const route = useRoute();
const scrollBottom = ref(false);
let box: HTMLElement;

function scroll() {
  scrollBottom.value = (box.scrollTop + box.clientHeight + 1) >= box.scrollHeight;
}

provide('scrollBottom', scrollBottom);

function setClass(i: number) {
  if (route.fullPath === '/discover' && i === 0) {
    return 'headActive';
  } else {
    if (i !== 0)
      return route.fullPath.indexOf(headList.value[i].path) > -1 ? 'headActive' : '';
  }
}

onMounted(() => {
  box = document.getElementById('box') as any;
})
</script>

<style scoped>
.h-100 {
  height: 100%;
}

.menu {
  padding: 1rem;
  user-select: none;
  display: flex;
  text-align: left;
}

.menu ul {
  margin: 0;
  padding: 0;
  font-size: 18px;
  width: 100%;
}

.menu ul li {
  list-style: none;
  padding: 5px;
  margin-top: 1em;
}

.menu ul li:hover {
  background-color: #EBEEF5;
  border-radius: 3px;
  cursor: pointer;
}

.menuActive {
  background-color: #1DCF9f !important;
  border-radius: 3px;
  font-size: 20px;
  font-weight: bold;
  color: white;
}

.header {
  padding: 0.4rem;
  user-select: none;
  display: flex;
  text-align: left;
  min-width: 900px;
}

.header ul {
  margin: 20px 0 0 0;
  padding: 0;
  font-size: 16px;
  width: 100%;
}

.header ul .nav {
  float: left;
  list-style: none;
  height: 100%;
  margin: 0 1rem;
  cursor: pointer;
  color: #1a1a1a;
  transition: 500ms all ease-in-out;
}

.headActive {
  font-size: 20px;
  font-weight: bold;
  color: #1DCF9f;
}

.header ul .headActive .indicator {
  margin-left: 50%;
  transform: translate(-50%);
  width: 36px;
  height: 4px;
  background: #1DCF9f;
  border-radius: 20px;
}

.main {
  overflow-x: hidden;
  min-width: 1200px;
}
</style>