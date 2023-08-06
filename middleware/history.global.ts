import { useLocalStorage } from '@vueuse/core';

export default defineNuxtRouteMiddleware((to, from) => {
  const navigationHistory = useLocalStorage('history', []);
  if (to?.path) {
    // @ts-ignore
    navigationHistory.value.push(to.path);
  }
});
