<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UserCard',
  components: { },
  props: { },
  data() {
    const auth = useSupabaseClient()?.auth;
    const user = useSupabaseUser();

    return {
      auth,
      user,
    };
  },
  computed: {
    name: () => {
      return this.user.value?.user_metadata.full_name;
    },
    profile: () => {
      return this.user.value?.user_metadata.avatar_url;
    },
  },
  methods: {
    logout: async () => {
      const { error } = await this.auth.signOut();

      if (error) {
        console.error(error);
        return;
      }

      await navigateTo('/login');
    }
  }
});
</script>

<template>
  <div
    v-if="user"
    class="rounded p-3 flex items-center space-x-3 bg-white"
  >
    <img
      class="rounded-full w-12 h-12 border-2 border-blue-400"
      :src="profile"
    />
    <div class="text-right">
      <div class="font-medium">{{ name }}</div>
      <button class="text-sm underline text-slate-500" @click="logout">
        Log out
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>
