<template>
  <div v-if="subscribers.length === 0">
    <loading></loading>
  </div>
  <div v-else class="box" ref="box">
    <div class="subscriber">
      <subscriber v-for="(item,index) in subscribers"
                  :key="index"
                  :subscriber="item"></subscriber>
    </div>
    <div class="pagination">
      <pagination :current-page="current"
                  :totals="total"
                  @get-offset="getOffset"></pagination>
    </div>
  </div>
</template>

<script setup lang="ts">
import {getSubscribers} from "../api/music";
import {inject, onMounted, ref, Ref} from "vue";
import Subscriber from "./Subscriber.vue"
import Pagination from "./Pagination.vue"

const offset = ref(0);
const play = inject('Play') as Ref;
const subscribers = ref(<any[]>[]);
const total = ref(0);
const current = ref(1);
const box = ref();

function getOffset(Offset: number, i: number) {
  offset.value = Offset;
  current.value = i;
  Subscribers();
  box.value.scrollIntoView();
}

const Subscribers = async () => {
  const params = {id: play.value.id, limit: 60, offset: offset.value}
  await getSubscribers(params).then((response: any) => {
    if (response.code === 200) {
      subscribers.value = response.subscribers;
      total.value = response.total;
    }
  })
}

onMounted(() => {
  Subscribers();
})
</script>

<style scoped>
.box {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
}

.box .subscriber {
  display: flex;
  flex-wrap: wrap;
  gap: 26px 4em;
}


</style>