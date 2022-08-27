<template>
  <div v-if="isLoading">
    Loading
  </div>
  <div v-else class="top-list">
    <div class="official">
      <div class="title">官方榜</div>
      <div class="list">
        <OfficialListCell v-for="(topList,index) in allTopList.slice(0,4)"
                          :key="index"
                          :official-list-cell="topList"></OfficialListCell>
      </div>
    </div>
    <div class="global">
      <div class="title">全球榜</div>
      <div class="list">
        <play-list-cell v-for="(topList,index) in allTopList.slice(4)"
                      :key="index"
                      :play-list="topList"></play-list-cell>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {getAllTopList} from "../api/music";
import {onBeforeMount, ref} from "vue";
import OfficialListCell from "../components/OfficialListCell.vue"
import PlayListCell from "../components/PlayListCell.vue"

const allTopList = ref(<any[]>[]);
const isLoading = ref(true);

const AllTopList = async () => {
  await getAllTopList().then((response: any) => {
    if (response.code === 200) {
      allTopList.value = response.list;
      isLoading.value = false
    }
  })
}

onBeforeMount(() => {
  AllTopList();
})

</script>

<style scoped>
.top-list {
  width: 92%;
  height: 100%;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  justify-content: left;
  gap: 40px;
}

.top-list .official {

}

.top-list .official .list {
  display: flex;
  flex-direction: column;
  justify-content: left;
  margin-top: 30px;
  gap: 47px;
}

.top-list .title {
  font-size: 20px;
  font-weight: bold;
  text-align: left;
}

.top-list .global {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.top-list .global .list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 40px 2.4em;
}

</style>