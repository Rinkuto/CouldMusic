<template>
  <div>
    <router-link :to="{name:prop.routerName}" class="title">
      <span>{{ prop.title }}</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-chevron-right"
           viewBox="0 0 16 16">
        <path fill-rule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
      </svg>
    </router-link>
  </div>
</template>

<script setup lang="ts">

import {defineProps} from "vue";

const prop = defineProps({
  title: {
    type: String,
    required: true,
    default: '',
  },
  routerName: {
    type: String,
    required: true,
    default: '',
  }
})
</script>

<style scoped>
.title {
  display: flex;
  padding: 10px 0;
}

.title > * {
  color: #303133;
  margin: auto 0;
  font-size: 24px;
  font-weight: bold;
}

.title > *:hover {
  color: #000000;
}
</style>