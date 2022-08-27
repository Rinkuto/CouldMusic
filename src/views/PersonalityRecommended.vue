<template>
  <div class="index">
    <div class="carousel">
      <carousel :img-list="banners" :timeout="5000"></carousel>
    </div>
    <div>
      <recommend-music></recommend-music>
    </div>
    <div class="hot">
    </div>
  </div>
</template>

<script setup lang="ts">
import Carousel from '../components/Carousel.vue'
import RecommendMusic from '../components/RecommendMusic.vue'
import {onBeforeMount, ref} from "vue";
import {getBanner} from "../api/music";

const banners = ref([]);

const getBanners = async () => {
  await getBanner().then((response: any) => {
    if (response.code === 200) {
      banners.value = response.banners.map((item: any) => item.imageUrl);
    }
  })
}

onBeforeMount(() => {
  getBanners();
})

</script>

<style scoped>
.index{
  display: flex;
  flex-direction: column;
}

.carousel {
  height: 19.6em;
}

.index .hot{
  margin-top: 4em;
}
</style>