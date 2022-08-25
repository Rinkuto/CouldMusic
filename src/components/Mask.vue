<template>
  <div class="mask">
    <div class="close-svg" @click="$emit('closeMask',false)">
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-chevron-down"
           viewBox="0 0 16 16">
        <path fill-rule="evenodd"
              d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">

import {defineEmits} from "vue";

const emits = defineEmits(['closeMask'])

</script>

<style scoped>
.mask {
  position: absolute;
  display: flex;
  z-index: 100;
  width: 100%;
  top: 0;
  height: 100%;
  opacity: 0.9;
  background-image: linear-gradient(to top, #d5d4d0 0%, #d5d4d0 1%, #eeeeec 31%, #efeeec 75%, #e9e9e7 100%);
  padding: 1em 2em;
}

.mask .close-svg {

}

.mask .close-svg:hover {
  cursor: pointer;
}
</style>