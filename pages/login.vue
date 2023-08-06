<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'login.vue',
  data() {
    const { title } = useCourse();
    return { title };
  }
});
</script>

<template>
  <div class="prose w-full max-w-2xl h-9">
    <h1>Log in to {{ title }}</h1>
    <button
      class="bg-blue-500 text-white font-bold py-2 px-4 rounded"
    >
      Log in with Github
    </button>
  </div>
</template>

<style scoped>

</style>
