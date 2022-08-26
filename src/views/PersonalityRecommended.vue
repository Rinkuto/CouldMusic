<template>
  <div>
    <div class="carousel">
      <carousel :img-list="banners" :timeout="5000"></carousel>
    </div>
    <div>
      <recommend-music></recommend-music>
    </div>
  </div>
</template>

<script setup lang="ts">
import Carousel from '../components/Carousel.vue'
import RecommendMusic from './RecommendMusic.vue'
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
.carousel {
  height: 19.6em;
}
</style>