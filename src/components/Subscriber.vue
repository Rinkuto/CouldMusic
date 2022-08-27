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
        <span class="sex female" v-if="prop.subscriber.gender === 2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
               class="bi bi-gender-female"
               viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                  d="M8 1a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM3 5a5 5 0 1 1 5.5 4.975V12h2a.5.5 0 0 1 0 1h-2v2.5a.5.5 0 0 1-1 0V13h-2a.5.5 0 0 1 0-1h2V9.975A5 5 0 0 1 3 5z"/>
          </svg>
        </span>
        <span class="sex male" v-else-if="prop.subscriber.gender === 1">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
               class="bi bi-gender-male"
               viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                  d="M9.5 2a.5.5 0 0 1 0-1h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V2.707L9.871 6.836a5 5 0 1 1-.707-.707L13.293 2H9.5zM6 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/>
          </svg>
        </span>
      </div>
      <div class="desc">
        {{ prop.subscriber.signature }}
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">

import {defineProps, PropType} from "vue";

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

.card .title .name .sex {
  width: 20px;
  height: 20px;
  position: relative;
  border-radius: 50%;
}

.female {
  background-color: pink;
  color: red;
}

.male {
  background-color: #a0cfff;
  color: #79bbff;
}

.card .title .name .sex svg {
  position: relative;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
}

.card .title .desc {
  font-size: 12px;
}
</style>