<template>
  <div class="box">
    <div class="head-img">
      <router-link :to="{name:'user',params:{userId:prop.comment.user.userId}}">
        <img :src="prop.comment.user.avatarUrl" alt="">
      </router-link>
    </div>
    <div class="comment">
      <div class="content">
        <router-link :to="{name:'user',params:{userId:prop.comment.user.userId}}">
          <span class="username">{{ prop.comment.user.nickname }}：</span>
        </router-link>
        {{ prop.comment.content }}
      </div>
      <div v-if="prop.comment.beReplied.length !== 0" class="be-replied">
        <span class="username">@{{ prop.comment.beReplied[0].user.nickname }}：</span>
        {{ prop.comment.beReplied[0].content }}
      </div>
      <div class="time">{{ prop.comment.timeStr }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {defineProps, onMounted, PropType, watch} from "vue";

interface BeReplied {
  user: {
    userId: number,
    avatarUrl: string,
    nickname: string,
  },
  content: string,
  beRepliedCommentId: number,
}

export interface Comment {
  user: {
    userId: number,
    avatarUrl: string,
    nickname: string,
  },
  content: string,
  commentId: string,
  timeStr: string,
  time: string,
  beReplied: BeReplied[],
}

const prop = defineProps({
  comment: {
    type: Object as PropType<Comment>,
    require: true,
    default: {},
  }
})
</script>

<style scoped>
.box {
  width: 100%;
  border-top: rgba(168, 171, 178, 0.38) 1px solid;
  display: flex;
  gap: 20px;
  padding: 10px 0;
}

.box .head-img {
  position: relative;
  width: 47px;
  height: 47px;
  margin: 0;
}

.box .head-img img {
  height: 100%;
  border-radius: 50%;
  border: rgba(168, 171, 178, 0.23) 1px solid;
  cursor: pointer;
}

.comment {
  display: flex;
  flex-direction: column;
  text-align: left;
  font-size: 12px;
  width: 100%;
}

.comment .be-replied {
  background-color: #F0F2F5;
}

.comment .username {
  color: #409EFF;
  user-select: none;
}

.comment .username:hover {
  color: #337ecc;
  cursor: pointer;
}
</style>