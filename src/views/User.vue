<template>
  <div v-if="loading">
    <loading></loading>
  </div>
  <div v-else class="user">
    <user-head :user="userDetail"></user-head>
    <div>
      <bar :bars="title"
           @click-bars="click"></bar>
      <div class="list">
        <play-list-cell v-for="(item,index) in userPlayList"
                        :key="index"
                        :play-list="item"
                        :show-track="true"></play-list-cell>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">

import {defineProps, inject, onMounted, Ref, ref, watch} from "vue";
import {getUserDetail, getUserPlaylist} from "../api/user";
import UserHead from "../components/UserHead.vue";
import Bar from "../components/Bar.vue";
import PlayListCell from "../components/PlayListCell.vue"

const userDetail = ref<any>();
const loading = ref(true);
const title = ref(['创建的歌单', '收藏的歌单']);
const current = ref(0);
const offset = ref(0);
const userPlayList = ref(<any[]>[]);
const scrollBottom = inject('scrollBottom') as Ref;

function click(i: number) {
  if (current.value !== i) {
    current.value = i;
  }
}

watch(scrollBottom, () => {
  if (scrollBottom.value === true) {
    offset.value += 30;
    UserPlayList();
  }
})

const UserDetail = async () => {
  const params = {uid: prop.userId};
  await getUserDetail(params).then((response: any) => {
    if (response.code === 200) {
      userDetail.value = response;
      loading.value = false;
    }
  })
}

const UserPlayList = async () => {
  const params = {uid: prop.userId, limit: 30, offset: offset.value};
  await getUserPlaylist(params).then((response: any) => {
    if (response.code === 200) {
      response.playlist.forEach((item: any) => {
        userPlayList.value.push(item)
      })
    }
  })
}

onMounted(() => {
  UserDetail();
  UserPlayList();
})

const prop = defineProps({
  userId: String,
})
</script>

<style scoped>
.user {
  display: flex;
  flex-direction: column;
}

.user .list {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 5.5em 3.7em;
}
</style>