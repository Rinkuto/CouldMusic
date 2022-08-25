<template>
  <div>
    <div class="carousel">
      <carousel :img-list="imgURL" :timeout="5000"></carousel>
    </div>
    <div>
      <recommend-music></recommend-music>
    </div>
  </div>
</template>

<script setup lang="ts">
import Carousel from '../components/Carousel.vue'
import RecommendMusic from './RecommendMusic.vue'

const imgURL = ["/src/static/img/1.jfif", "/src/static/img/2.jfif", "/src/static/img/3.jfif", "/src/static/img/4.jfif", "/src/static/img/5.jfif", "/src/static/img/6.jfif", "/src/static/img/7.jfif",]

</script>

<style scoped>
.carousel {
  height: 19.6em;
}
</style>