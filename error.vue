<script lang="ts">
import { defineComponent } from 'vue';
import useFirstLesson from './composables/useFirstLesson';

// useError and clearError only work on server-side errors so
// they do not work with the NuxtErrorBoundary component.
//
export default defineComponent({
  name:  'ErrorPage',
  data() {
    const error = useError();
    return {
      error: error.value,
    };
  },
  methods: {
    handleError: () => {
      const firstLesson = useFirstLesson();
      clearError({
        redirect: firstLesson.path,
      });
    },
  },
});
</script>

<template>
  <div>
    <NuxtLayout>
      <div class="flex flex-col">
        <div v-if="error.statusCode === '404'" class="prose">
          <h1>404</h1>
          <p>I guess that page doesn't exist!</p>
        </div>
        <div v-else class="prose">
          <h1>Dang</h1>
          <p>It looks like something broke.</p>
          <p>Sorry about that.</p>
        </div>
        <div class="prose">
          <p>
            <strong>{{ error.message }}</strong>
          </p>
          <p>Go to the <a class="hover:cursor-pointer" @click="handleError">first lesson</a></p>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<style scoped>

</style>
