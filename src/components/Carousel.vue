<template>
  <div class="carousel-container"
       @mouseover="pause"
       @mouseleave="play">
    <div class="carousel-content mask">
      <div class="carousel"
           v-for="(item,index) in prop.imgList"
           :key="index"
           :class="setClass(index)"
           :style="setBGImg(item)"></div>
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-chevron-left"
           viewBox="0 0 16 16" @click="prev">
        <path fill-rule="evenodd"
              d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-chevron-right"
           viewBox="0 0 16 16" @click="next">
        <path fill-rule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
      </svg>
    </div>
    <div class="dogs">
      <span v-for="(item,index) in prop.imgList"
            :key="index"
            :style="setActiveDogs(index)"
            @mouseover="onClick(index)">
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">

import {defineProps, onMounted, PropType, ref} from "vue";

const currentIndex = ref(0);
const timePlay = ref<any>(null);
const prop = defineProps({
  imgList: {
    type: Array as PropType<string[]>,
    default: [],
    require: true,
  },
  timeout: {
    type: Number,
    default: 1000,
  }
})

onMounted(() => {
  play();
})


function setBGImg(src: string) {
  return {
    backgroundImage: `url(${src})`
  }
}

function setActiveDogs(i: number) {
  return currentIndex.value === i ? {
    backgroundColor: '#1DCF9f',
  } : {
    backgroundColor: '#CDD0D6',
  }
}

function onClick(i: number) {
  if (i !== currentIndex.value) {
    currentIndex.value = i;
  }
}

function play() {
  pause();
  timePlay.value = setInterval(() => {
    next();
  }, prop.timeout);
}

function pause() {
  clearInterval(timePlay.value);
}

function setClass(i: number) {
  let next = currentIndex.value === (prop.imgList.length - 1) ? 0 : currentIndex.value + 1;
  let prev = currentIndex.value === 0 ? prop.imgList.length - 1 : currentIndex.value - 1;

  switch (i) {
    case currentIndex.value:
      return 'active';
    case next:
      return 'next';
    case prev:
      return 'prev';
    default:
      return '';
  }
}

function next() {
  currentIndex.value = ++currentIndex.value % prop.imgList?.length;
}

function prev() {
  currentIndex.value = (currentIndex.value === 0) ? prop.imgList?.length - 1 : currentIndex.value - 1;
}

</script>

<style scoped>
.carousel-container {
  height: 100%;
  width: 100%;
  text-align: center;
  padding: 10px 0;
  position: relative;
}

.carousel-container .carousel-content {
  position: relative;
  height: calc(100% - 20px);
  left: 0;
  top: 0;
  margin: 0;
  padding: 0;
  background-size: inherit;

}

.carousel-container .carousel-content .carousel {
  position: absolute;
  margin: 0;
  padding: 0;
  top: 0;
  left: 50%;
  max-width: 65%;
  width: 60%;
  height: 100%;
  transition: 500ms all ease-in-out;
  background-color: #fff;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  transform: translate3d(-50%, 0, -80px);
  border-radius: 18px;
  z-index: 1;
}

.carousel-content .carousel:before {
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0);
  transition-delay: 100ms !important;
  transition: all 500ms;
  border-radius: 18px;
  cursor: pointer;
}

.carousel-content .carousel.active {
  transform: translate3d(-50%, 0, 0);
  z-index: 20
}

.carousel-content .carousel.prev {
  transform: translate3d(-75%, 0, -100px);
  z-index: 19;
}

.carousel-content .carousel.next {
  transform: translate3d(-25%, 0, -100px);
  z-index: 18;
}

.carousel-content svg {
  width: 17.5%;
  position: absolute;
  top: 40%;
  font-size: 22px;
  color: rgba(255, 255, 255, 0.5);
  text-shadow: 0 0 24px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  z-index: 21;
}

.carousel-content svg:nth-last-child(2) {
  left: 0;
}

.carousel-content svg:last-child {
  right: 0;
}

.carousel-content svg:hover {
  color: rgba(255, 255, 255, 0.8);
  display: block;
}

.carousel-content .mask .carousel.prev:before, .carousel-content.mask .carousel.next:before {
  background-color: rgba(0, 0, 0, 0.5);
}

.carousel-container .dogs {
  width: 100%;
  height: auto;
}

.carousel-container .dogs span {
  display: inline-block;
  width: 7px;
  height: 7px;
  margin: 1px 5px;
  border-radius: 50%;
  background-color: #CDD0D6;
}
</style>