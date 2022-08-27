<template>
  <div class="user-head">
    <div class="user-img">
      <img :src="prop.user.profile.avatarUrl" alt="">
    </div>
    <div class="info">
      <div class="user-name">{{ prop.user.profile.nickname }}</div>
      <div class="leave">
        <div class="badge">
          Lv{{ prop.user.level }}
        </div>
        <gender :gender="1" style="margin: auto 0"></gender>
      </div>
      <div class="event">
        <div class="left">
          <span>{{ prop.user.profile.eventCount }}</span>
          <span>动态</span>
        </div>
        <div class="center">
          <span>{{ prop.user.profile.follows }}</span>
          <span>关注</span>
        </div>
        <div class="right">
          <span>{{ prop.user.profile.followeds }}</span>
          <span>粉丝</span>
        </div>
      </div>
      <div class="area">
        所在地区：<span class="span">{{ getCity(prop.user.profile.city) }}</span>
      </div>
      <div class="net">
        社交网络：<span class="span">未绑定</span>
      </div>
      <div class="description">
        个人介绍：<span class="span">{{ prop.user.profile.signature }}</span>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import {defineProps, PropType} from "vue";
import Gender from "./Gender.vue";
import {getCity} from "../unit/city";

const prop = defineProps({
  user: {
    type: Object as PropType<User>,
    require: true,
    default: {},
  }
})

export interface User {
  level: number,
  listenSongs: number,
  profile: {
    userId: number,
    nickname: string,
    avatarUrl: string,
    gender: number,
    description: string,
    eventCount: number,
    signature: string,
    city: number,
    followeds: number,
    follows: number,
    playlistCount: number,
  },
  userPoint: {
    userId: number,
  }
}
</script>

<style scoped>
.user-head {
  display: flex;
  gap: 10px;
  user-select: none;
}

.user-head .user-img {
  width: 200px;
  height: 200px;
}

.user-head .user-img img {
  height: 100%;
  border-radius: 50%;
}

.user-head .info {
  display: flex;
  flex-direction: column;
  justify-content: left;
  gap: 3px;
  font-size: 12px;
  width: 100%;
}

.user-head .info .user-name {
  font-size: 22px;
  font-weight: bold;
  text-align: left;
}

.user-head .info .leave {
  display: flex;
  gap: 10px;
  margin: 4px 0;
}

.user-head .info .leave .badge {
  font-size: 12px;
  color: #A8ABB2;
  background-color: #E4E7ED;
  border-radius: 30px;
  width: 34px;
  padding: 0;
}

.info .event {
  display: flex;
  margin: 5px 0;
}

.event .left {
  padding-right: 20px;
}

.event .center {
  padding: 0 20px;
  border-left: black 1px solid;
  border-right: black 1px solid;
}

.event .right {
  padding-left: 20px;
}

.event > * {
  display: flex;
  flex-direction: column;
}

.event > * > *:first-child {
  font-size: 20px;
}

.event > * > *:last-child {
  font-size: 16px;
}

.info .area, .net, .description {
  color: #303133;
  text-align: left;
}

.info .span {
  color: #303133;
}
</style>