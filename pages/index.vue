<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'index',
  data() {
    return {
      firstLesson: useFirstLesson()
    };
  },
});
</script>

<template>
  <div>
    <NuxtLink
      class="underline font-medium"
      :href="firstLession.path"
    >
      Go to first lesson
    </NuxtLink>
  </div>
</template>

<style scoped>

</style>
