<template>
  <div class="album">
<!--    <div class="button">-->
<!--      <div class="item"-->
<!--           @click="isActive = true"-->
<!--           :class="{'active':isActive}">新歌速递-->
<!--      </div>-->
<!--      <div class="item"-->
<!--           @click="isActive = false"-->
<!--           :class="{'active':!isActive}">新碟上架-->
<!--      </div>-->
<!--    </div>-->
    <new-song></new-song>
<!--    <div class="component">-->
<!--      <keep-alive>-->
<!--        <Transition name="album" mode="out-in">-->
<!--          <component :is="isActive ? NewSong : NewAlbum"/>-->
<!--        </Transition>-->
<!--      </keep-alive>-->
<!--    </div>-->
  </div>
</template>

<script setup lang="ts">
import NewSong from "../components/NewSong.vue"
import NewAlbum from "../components/NewAlbum.vue"
import {defineComponent, ref} from "vue";

const isActive = ref(true);

</script>

<style scoped>
.album {
  width: 92%;
  display: flex;
  margin: 0 auto;
}

.album .button {
  display: flex;
  justify-content: center;
  width: 250px;
  border-radius: 30px;
  border: #909399 1px solid;
  margin: 0 auto;
  user-select: none;
  font-size: 12px;
}

.album .button .item {
  padding: 3px 13px;
  width: 50%;
  border-radius: 30px;
}

.album .button .item:hover {
  background-color: #F0F2F5;
}

.album .button .active {
  background-color: #909399 !important;
  color: white;
  border: #909399 1px solid;
}

.album-enter-active,
.album-leave-active {
  transition: opacity 0.5s ease;
}

.album-enter-from,
.album-leave-to {
  opacity: 0;
}

.album .component {
  margin: 32px;
}
</style>