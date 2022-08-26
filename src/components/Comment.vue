<template>
  <div class="comment" ref="box">
    <comment-cell v-for="(comment,index) in comments"
                  :key="index"
                  :comment="comment"></comment-cell>
    <div class="pagination">
      <pagination :current-page="currentPage"
                  :totals="Math.min(2000,total)"
                  @get-offset="getOffset"></pagination>
    </div>
  </div>
</template>

<script setup lang="ts">

import CommentCell from "./CommentCell.vue";
import {inject, onMounted, ref, Ref} from "vue";
import {getPlayListComment} from "../api/music";
import Pagination from "./Pagination.vue";
import {Comment} from "./CommentCell.vue";

const play = inject('Play') as Ref;
const comments = ref(<Comment[]>[]);
const currentPage = ref(1);
const offset = ref(0);
const total = inject('totals') as number;
const box = ref();

const PlayListComment = async () => {
  const params = {id: play.value.id, limit: 50, offset: offset.value};
  await getPlayListComment(params).then((response: any) => {
    if (response.code === 200) {
      comments.value = response.comments;
    }
  })
}

function getOffset(Offset: number, current: number) {
  offset.value = Offset;
  currentPage.value = current;
  PlayListComment();
  box.value.scrollIntoView();
}

onMounted(() => {
  PlayListComment();
})
</script>

<style scoped>
.comment {
  display: flex;
  flex-direction: column;
  margin: 30px 15px 0;
}

.comment .pagination {
  margin: 15px 0 40px;
}
</style>