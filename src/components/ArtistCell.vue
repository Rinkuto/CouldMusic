<template>
  <div v-if="prop.artist.id === undefined"></div>
  <div class="box" v-else>
    <router-link :to="{name:'artistInfo',params:{id:prop.artist.id}}">
      <div class="card">
        <img :src="prop.artist.img1v1Url" alt="">
        <div class="name">
          {{ prop.artist.name }}
        </div>
      </div>
    </router-link>
  </div>
</template>

<script setup lang="ts">

import {defineProps, PropType} from "vue";

const prop = defineProps({
  artist: {
    type: Object as PropType<Artist>,
    require: true,
    default: {},
  }
})

export interface Artist {
  img1v1Url: string,
  name: string,
  id: string,
}
</script>

<style scoped>
.box {
  width: calc((100% / 6) - 2em);
}

.card {
  width: 100%;
  padding: 0;
}

.card img {
  width: 100%;
  height: 100%;
  border-radius: 6px;
}

.card .name {
  font-size: 14px;
  color: #303133;
  text-align: left;
}

.card .name:hover {
  color: black;
}
</style>