<template>
  <div>
    <Transition name="msg">
      <div v-show="show" class="message">
        <div class="svg">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x-circle"
               viewBox="0 0 16 16" style="color: red">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
          </svg>
        </div>
        <div>
          {{ message }}
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import {getMessage, setMessage} from "../unit/message";
import {reactive, ref, watch} from "vue";

const message = reactive(getMessage());
const show = ref(false);

let time: number | undefined;
watch(message, () => {
  if (message.value !== '') {
    show.value = true;
    clearTimeout(time);
    time = setTimeout(() => {
      show.value = false;
      setMessage('');
    }, 1500);
  }
})

</script>

<style scoped>
.message {
  position: absolute;
  display: flex;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
  margin: 25px 0;
  width: auto;
  border-radius: 5px;
  border: #CDD0D6 1px solid;
  box-shadow: -25px 20px 22px -7px rgba(0, 0, 0, 0.1);
  padding: 17px;
  user-select: none;
  gap: 10px;
  background-color: white;
  text-align: center;
  font-size: 20px;
}

.message .svg svg {
  height: 100%;
  margin: auto 0;
}

.msg-enter-active,
.msg-leave-active {
  transition: opacity 0.25s ease;
}

.msg-enter-from,
.msg-leave-to {
  opacity: 0;
}
</style>