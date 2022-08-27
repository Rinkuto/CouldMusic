<template>
  <div class="bar">
    <div class="item" v-for="(item,index) in bars"
         :key="item"
         :class="current === index ? 'active':''"
         @click="click(index)">
      <span>{{ item }}</span>
      <div class="indicator"></div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {defineEmits, defineProps, PropType, ref} from "vue";

const current = ref(0);
const prop = defineProps({
  bars: {
    required: true,
    default: [],
    type: Array as PropType<string[]>
  }
})
const emit = defineEmits(['clickBars']);

function click(i: number) {
  current.value = i;
  emit('clickBars', i);
}

</script>

<style scoped>
.bar {
  margin-top: 40px;
  display: flex;
  justify-content: left;
  user-select: none;
  gap: 0 20px;
}

.bar .item {
  cursor: pointer;
}

.bar .active {
  font-size: 22px;
  font-weight: bold;
}

.bar .active .indicator {
  margin-top: 5px;
  margin-left: 50%;
  transform: translate(-50%);
  width: 36px;
  height: 4px;
  background: #1DCF9f;
  border-radius: 20px;
}
</style>