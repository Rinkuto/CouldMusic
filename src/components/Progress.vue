<template>
  <div class="progress"
       @mouseenter="showSlider = true"
       @mouseleave="showSlider = false">
    <div class="progress-outer"
         :style="{width:prop.progressWidth+'px'}">
      <div class="progress-inner"
           :style="setProgressInnerWidth"></div>
      <div v-show="showSlider" class="progress-show-slider"
           @mousedown="showSliderMouseListen"
           :style="setSliderLeft"
           ref="Slider"></div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {computed, defineEmits, defineProps, ref, watch} from "vue";

const emits = defineEmits(['percentChange'])
const prop = defineProps({
  percent: {
    type: Number,
    default: 0,
  },
  progressWidth: {
    type: Number,
    default: 300,
  },
})

watch(() => prop.percent, () => {
  currentWidth.value = prop.percent * prop.progressWidth / 100;
})
const showSlider = ref(false);
const sliderWidth = ref(8); //滑块的宽度
const currentWidth = ref(0);
const Slider = ref();//进度条滑块

const setProgressInnerWidth = computed(() => {
  return {
    width: currentWidth.value + 'px',
  }
})
const setSliderLeft = computed(() => {
  return {
    left: (currentWidth.value - sliderWidth.value / 2) + 'px',
  }
})
const percentChange = computed(() => {
  return (currentWidth.value / prop.progressWidth * 100).toFixed(2)
})

function showSliderMouseListen(e: { clientX: number; clientY: number; }) {
  let disX = e.clientX - Slider.value.offsetLeft;
  document.onmousemove = (e: any) => {
    let left = e.clientX - disX;
    if (left < 0) {
      currentWidth.value = 0;
    } else if (left > prop.progressWidth) {
      currentWidth.value = prop.progressWidth;
    } else {
      currentWidth.value = left;
    }
    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
      emits('percentChange', percentChange);
    }
  }
}

</script>

<style scoped>
.progress {
  width: auto;
  display: flex;
  align-items: center;
}

.progress .progress-outer {
  width: 300px;
  height: 5px;
  border-radius: 5px;
  background: #CCCCCC;
  position: relative;
  display: flex;
  align-items: center;
}

.progress .progress-outer:hover {
  height: 5px;
}

.progress .progress-outer .progress-inner {
  width: 100px;
  height: 5px;
  background: #1DCF9f;
  border-radius: 10px;
}

.progress .progress-outer .progress-show-slider {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #1DCF9f;
  position: absolute;
  z-index: 10;
  left: 96px;
}
</style>