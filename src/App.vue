<template>
  <div class="layout">
    <layout></layout>
    <Message></Message>
  </div>
</template>

<script setup lang="ts">
import Layout from "./components/Layout.vue"
import Message from "./components/Message.vue"

</script>

<style>
html, body {
  padding: 0;
  margin: 0;
  height: 100%;
}

.layout {
  height: 100%;
}
</style>
