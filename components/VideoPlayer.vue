<script lang="ts" setup>
const props = defineProps({
  videoId: {
    type: Number,
    required: true,
  }
});
</script>

<template>
  <iframe style="border: 0"
    width="500"
    height="315"
    :src="`https://player.vimeo.com/video/${props.videoId}`"
    title="Video Player"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  ></iframe>
</template>

<style scoped></style>
