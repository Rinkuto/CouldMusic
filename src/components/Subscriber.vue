<template>
  <div class="card">
    <router-link class="" :to="{name:'user',params:{userId:prop.subscriber.userId}}">
      <div class="img">
        <img :src="prop.subscriber.avatarUrl" alt="">
      </div>
    </router-link>
    <div class="title">
      <div class="name">
        <router-link class="" :to="{name:'user',params:{userId:prop.subscriber.userId}}">
          <span>
            {{ prop.subscriber.nickname }}
          </span>
        </router-link>
        <gender :gender="prop.subscriber.gender"></gender>
      </div>
      <div class="desc">
        {{ prop.subscriber.signature }}
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">

import {defineProps, PropType} from "vue";
import Gender from "./Gender.vue"

const prop = defineProps({
  subscriber: {
    type: Object as PropType<Subscriber>,
    require: true,
    default: {},
  }
})

export interface Subscriber {
  avatarUrl: string,
  nickname: string,
  userId: number,
  gender: number,
  signature: string,
}
</script>

<style scoped>
.card {
  padding: 0;
  width: calc((100% / 3) - 4em);
  display: flex;
  gap: 12px;
  user-select: none;
}

.card .img {
  width: 100px;
  height: 100px;
}

.card .img img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.card .title {
  margin: auto 0;
  display: flex;
  flex-direction: column;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card .title .name {
  display: flex;
  gap: 5px;
}

.card .title .name a span {
  color: #303133;
  font-size: 14px;
}

.card .title .name a span:hover {
  color: black;
}

.card .title .desc {
  font-size: 12px;
}
</style>