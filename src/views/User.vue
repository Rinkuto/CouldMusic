<template>
  <div>
    用户id:{{ prop.userId }}
  </div>
</template>

<script setup lang="ts">

import {defineProps} from "vue";

const prop = defineProps({
  userId: String,
})
</script>

<style scoped>

</style>