<template>
    <span class="sex female" v-if="prop.gender === 2">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
           class="bi bi-gender-female"
           viewBox="0 0 16 16">
        <path fill-rule="evenodd"
              d="M8 1a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM3 5a5 5 0 1 1 5.5 4.975V12h2a.5.5 0 0 1 0 1h-2v2.5a.5.5 0 0 1-1 0V13h-2a.5.5 0 0 1 0-1h2V9.975A5 5 0 0 1 3 5z"/>
      </svg>
    </span>
  <span class="sex male" v-else-if="prop.gender === 1">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
           class="bi bi-gender-male"
           viewBox="0 0 16 16">
      <path fill-rule="evenodd"
            d="M9.5 2a.5.5 0 0 1 0-1h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V2.707L9.871 6.836a5 5 0 1 1-.707-.707L13.293 2H9.5zM6 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/>
      </svg>
    </span>
</template>

<script setup lang="ts">


import {defineProps} from "vue";

const prop = defineProps({
  gender: {
    type: Number,
    require: true,
    default: 0,
  }
})
</script>

<style scoped>
.sex {
  width: 20px;
  height: 20px;
  position: relative;
  border-radius: 50%;
}

.sex span {
  width: 100%;
  height: 100%;
}

.female {
  background-color: pink;
  color: red;
}

.male {
  background-color: #a0cfff;
  color: #79bbff;
}

.sex svg {
  position: relative;
  left: 50%;
  top: 45%;
  transform: translate(-50%, -50%);
}
</style>