<template>
  <div class="play-list-head">
    <div class="play-list-image">
      <img :src="prop.playListInfo.coverImgUrl" alt="">
    </div>
    <div class="play-list-info">
      <div class="title">
        <span class="badge">歌单</span>
        <span class="name">{{ prop.playListInfo.name }}</span>
      </div>
      <div class="user">
        <router-link :to="{name:'user',params:{userId:prop.creator.userId}}">
          <div class="user-image">
            <img :src="prop.creator.avatarUrl" alt="">
          </div>
          <div class="user-name">{{ prop.creator.nickname }}</div>
        </router-link>
        <div class="create-time">{{ dateFormat(prop.playListInfo.createTime) }} 创建</div>
      </div>
      <div class="box">
        <div class="play-all"
             @click="setMusicList(songs)">
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-play-fill"
               viewBox="0 0 16 16">
            <path
                d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
          </svg>
          播放全部
        </div>
        <div class="collect">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-folder-plus"
               viewBox="0 0 16 16">
            <path
                d="m.5 3 .04.87a1.99 1.99 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2zm5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19c-.24 0-.47.042-.683.12L1.5 2.98a1 1 0 0 1 1-.98h3.672z"/>
            <path
                d="M13.5 10a.5.5 0 0 1 .5.5V12h1.5a.5.5 0 1 1 0 1H14v1.5a.5.5 0 1 1-1 0V13h-1.5a.5.5 0 0 1 0-1H13v-1.5a.5.5 0 0 1 .5-.5z"/>
          </svg>
          收藏{{ numberFormat(prop.playListInfo.subscribedCount) }}
        </div>
        <div class="share">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-share"
               viewBox="0 0 16 16">
            <path
                d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>
          </svg>
          分享{{ numberFormat(prop.playListInfo.shareCount) }}
        </div>
      </div>
      <div class="tags">
        标签:<span v-for="(tag,index) in prop.playListInfo.tags"
                 :key="index">
        <span v-if="index !== 0">/</span>
        <span class="tag">{{ tag }}</span></span>
      </div>
      <div class="music-info">
        歌曲: <span class="music-number">{{ length }}</span>
        播放: <span class="play-count">{{ numberFormat(prop.playListInfo.playCount) }}</span>
      </div>
      <div class="description">
        <div class="about">简介:&nbsp;</div>
        <span :class="desc?'desc':''" v-html="prop.playListInfo.description"></span>
        <span class="click" @click="desc = !desc">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-up-fill"
               viewBox="0 0 16 16" v-show="desc !== true">
            <path
                d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
               class="bi bi-caret-down-fill" viewBox="0 0 16 16" v-show="desc === true">
            <path
                d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
          </svg>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {defineProps, inject, PropType, Ref, ref} from "vue";
import {dateFormat} from "../unit/timeFormat";
import numberFormat from "../unit/numberFormat";
import {setMusicList} from "../unit/story";

const desc = ref(true);
const songs = inject('songs') as Ref;

const prop = defineProps({
  playListInfo: {
    type: Object as PropType<PlayListInfo>,
    require: true,
    default: <PlayListInfo>{},
  },
  creator: {
    type: Object as PropType<Creator>,
    require: true,
    default: <Creator>{},
  },
  length: {
    type: Number,
    default: 0,
  },
})

export interface Creator {
  avatarUrl: string,
  nickname: string,
  userId: string,
}

export interface PlayListInfo {
  description: string,
  name: string,
  id: string,
  playCount: number,
  coverImgUrl: string,
  commentCount: number,
  shareCount: number,
  subscribedCount: number,
  createTime: string,
  tags: string[],
  updateTime: number,
  creator: Creator
}
</script>

<style scoped>
.play-list-head {
  display: flex;
  width: 100%;
}

.play-list-head .play-list-image {
  width: 200px;
  height: 200px;
}

.play-list-head .play-list-image img {
  width: 200px;
  height: 200px;
  border-radius: 10px;
}

.play-list-head .play-list-info {
  margin-left: 1.3em;
  font-size: 14px;
  width: 100%;
}

.play-list-head .play-list-info .title {
  display: flex;
}

.play-list-info .title .badge {
  font-size: 13px;
  color: #1DCF9f;
  border: #1DCF9f 1px solid;
  border-radius: 4px;
  padding: 0 4px;
  margin-right: 10px;
  user-select: none;
}

.play-list-info .title .name {
  font-size: 24px;
  font-weight: bold;
  color: #213547;
}

.play-list-info .user {
  margin: 10px 0;
  display: flex;
}

.play-list-info .user .user-image {
  width: 25px;
  height: 25px;
}

.play-list-info .user .user-image img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.play-list-info .user a {
  display: flex;
}

.play-list-info .user .user-name {
  font-size: 13px;
  padding: 0 8px;
  color: #337ecc;
}

span {
  color: #909399;
}

.play-list-info .user .create-time {
  font-size: 13px;
  color: #909399;
  user-select: none;
}

.play-list-info .box {
  display: flex;
  font-size: 16px;
  margin: 2px 0 15px;
  justify-content: left;
  user-select: none;
}

.play-list-info .box > * {
  border-radius: 50px;
  padding: 5px 20px;
  display: flex;
  line-height: 26px;
  margin: 0 12px 0 0;
  justify-content: center;
}

.play-list-info .box svg {
  margin: auto 5px auto 0;
}

.play-list-info .box .play-all {
  background-color: #1DCF9f;
  color: white;
}

.play-list-info .box .play-all:hover {
  cursor: pointer;
  background-color: rgba(29, 184, 137, 0.85);
}

.play-list-info .box .collect {
  color: #606266;
  border: #909399 1px solid;
}

.play-list-info .box .share {
  color: #606266;
  border: #909399 1px solid;
}

.play-list-info .tags {
  display: flex;
  color: #606266;
}

.play-list-info .tags .tag {
  color: #337ecc;
  margin: 0 3px;
}

.play-list-info .tags .tag:hover {
  color: #747bff;
  cursor: pointer;
}

.play-list-info .music-info {
  color: #606266;
  display: flex;
}

.play-list-info .music-info span {
  margin-left: 4px;
  margin-right: 18px;
}

.play-list-info .description {
  color: #606266;
  display: flex;
  white-space: pre-wrap;
  text-align: left;
  position: relative;
}

.play-list-info .description .about {
  min-width: 36px;
  text-align: center;
  display: inline-block;
}

.play-list-info .description .click {
  position: absolute;
  user-select: none;
  right: 0;
  cursor: pointer;
}

.play-list-info .description .desc {
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

/*.play-list-info*/
</style>