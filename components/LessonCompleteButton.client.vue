<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name:  'LessonCompleteButton',
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
});
</script>

<template>
  <label
    class="rounded text-white font-bold py-2 px-4 cursor-pointer"
    :class="{
      'bg-green-500': modelValue,
      'bg-gray-500': !modelValue,
    }"
  >
    <input
      type="checkbox"
      :value="modelValue"
      @input="() => $emit('update:modelValue', !modelValue)"
      class="hidden"
    />
    {{ modelValue ? 'Completed!' : 'Mark as complete' }}
  </label>
</template>

<style scoped>
::selection {
  display: none;
}
</style>
