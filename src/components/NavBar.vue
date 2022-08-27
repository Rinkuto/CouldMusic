<template>
  <div class="nav">
    <div class="item"
         v-for="(item,index) in prop.options"
         :key="index"
         :class="index === current ? 'active':''"
         @click="click(index)">{{ item.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineEmits, defineProps, PropType, ref} from "vue";

const current = ref(0);

const prop = defineProps({
  options: {
    type: Array as PropType<Option[]>,
    required: true,
    default: [],
  }
})

const emit = defineEmits(['clickOption'])

export interface Option {
  name: string,
  id: string | number,
}

function click(n: number) {
  current.value = n;
  emit('clickOption', n);
}
</script>

<style scoped>
.nav {
  display: flex;
  justify-content: left;
  user-select: none;
  gap: 36px;
}

.nav .item {
  font-size: 13px;
  color: #606266;
}

.nav .item:hover {
  color: #303133;
  cursor: pointer;
}

.active {
  font-size: 16px !important;
  font-weight: bold;
  color: black !important;
}
</style>