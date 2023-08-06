<script setup lang="ts">
import { useCourse } from '~/composables/useCourse';
import VideoPlayer from '~/components/VideoPlayer.vue';

definePageMeta({
  middleware: [
    function(to, from) {
      const course = useCourse();
      const chapter = course.chapters.find((chapter) => chapter.slug === to.params.chapterSlug);
      if (!chapter) {
        return abortNavigation(createError({
          statusCode: 404,
          message: `Chapter ${to.params.chapterSlug} not found`,
        }));
      }

      const lesson = chapter.lessons.find((lesson) => lesson.slug === to.params.lessonSlug);
      if (!lesson) {
        return abortNavigation(createError({
          statusCode: 404,
          message: `Lesson ${to.params.lessonSlug} not found`,
        }));
      }
    },
    'auth'
  ],
})

const course = useCourse();
const route = useRoute();

const chapter = computed(() => {
  return course.chapters.find((chapter) => chapter.slug === route.params.chapterSlug);
});

const lesson = computed(() => {
  // The route middleware defined for the page prevents this from ever being null so
  // tell the TypeScript compiler to ignore this.
  //
  // @ts-ignore: Object is possibly 'null'.
  return chapter.value.lessons.find((lesson) => lesson.slug === route.params.lessonSlug);
});

const title = computed(() => {
  if (!lesson.value) {
    throw createError({
      statusCode: 404,
      message: `Lesson ${route.params.lessonSlug} not found in Chapter ${route.params.chapterSlug}`,
    });
  }
  return `${lesson.value.title} - ${course.title}`;
});

const chapterIndex = computed(() => {
  return (chapter?.value?.number || 0) - 1;
});

const lessonIndex = computed(() => {
  return (lesson?.value?.number || 0) - 1;
});

useHead({
  title,
});

const progress = useLocalStorage('progress', []);

const isLessonComplete = computed(() => {
  if ((chapterIndex.value < 0 || lessonIndex.value < 0)
    || !progress.value[chapterIndex.value]
    || !progress.value[chapterIndex.value][lessonIndex.value]) {
    return false;
  }

  return progress.value[chapterIndex.value][lessonIndex.value];
});

const toggleComplete = () => {
  if (chapterIndex.value < 0 || lessonIndex.value < 0) {
    console.warn(`chapterIndex = ${chapterIndex.value}, lessonIndex = ${lessonIndex.value}`);
    return;
  }

  if (!progress.value[chapterIndex.value]) {
    progress.value[chapterIndex.value] = [];
  }

  progress.value[chapterIndex.value][lessonIndex.value] = !isLessonComplete.value;
};

</script>

<template>
  <div>
    <p class="mt-0 uppercase font-bolds text-slate-400 mb-1">
      Lesson {{ chapter.number }} - {{ lesson.number }}
    </p>
    <h2 class="my-0">{{ lesson.title }}</h2>
    <div class="flex space-x-4 mt-2 mb-8">
      <NuxtLink
        v-if="lesson.sourceUrl"
        class="font-normal text-md text-gray-500"
        :to="lesson.sourceUrl"
      >
        Download Source Code
      </NuxtLink>
      <NuxtLink
        v-if="lesson.downloadUrl"
        class="font-normal text-md text-gray-500"
        :to="lesson.downloadUrl"
      >
        Download Video
      </NuxtLink>
    </div>
    <VideoPlayer v-if="lesson.videoId" :video-id="lesson.videoId" />
    <p>{{ lesson.text }}</p>
    <LessonCompleteButton
      :model-value="isLessonComplete"
      @update:model-value="throw createError('Could not update');"
    />
  </div>
</template>

<style scoped>

</style>
