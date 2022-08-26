<template>
  <div class="layout">
    <layout></layout>
    <Message></Message>
  </div>
</template>

<script setup lang="ts">
import Layout from "./components/Layout.vue"
import Message from "./components/Message.vue"
import {AnonymousRegister} from "./api/user"
import {onMounted, ref} from "vue";
import Cookie from "js-cookie";

const register = async () => {
  await AnonymousRegister().then((response: any) => {
    if (response.code === 200) {
      console.log(response)
    }
  })
}

onMounted(() => {
  if (Cookie.get('MUSIC_A') === undefined) {
    register();
  }
})

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
