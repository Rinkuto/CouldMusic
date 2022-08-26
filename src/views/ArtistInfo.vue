<template>
  歌手id：{{ prop.id }}
</template>

<script setup lang="ts">

import {defineProps} from "vue";

const prop = defineProps({
  id: String,
})
</script>

<style scoped>

</style>