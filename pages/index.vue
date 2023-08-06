<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'index',
  data() {
    const firstLesson = useFirstLesson()
    return {
      firstLesson
    };
  },
});
</script>

<template>
  <div>
    <NuxtLink
      class="underline font-medium"
      :href="firstLesson.path"
    >
      Go to first lesson
    </NuxtLink>
  </div>
</template>

<style scoped>

</style>
