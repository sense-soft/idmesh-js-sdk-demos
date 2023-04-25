<script setup lang="ts">
import { useIDMesh } from 'idmesh-vue';
import { watch, ref, unref } from 'vue';

const { loginWithRedirect, user, isAuthenticated, logout, isLoading, getAccessTokenSilently } = useIDMesh();
const accessToken = ref('');

watch(() => unref(isAuthenticated), async (v: boolean) => {
  if (v) {
    accessToken.value = await getAccessTokenSilently();
  } else {
    accessToken.value = '';
  }
}, { immediate: true });

const onLogin = () => loginWithRedirect();
const onLogout = () => {
  logout({ logoutParams: { returnTo: window.location.origin } });
};
</script>

<template>
  <div>
    <h1>Welcome to IDMesh</h1>
    <button @click="onLogin" :disabled="isLoading || isAuthenticated" :style="{ marginRight: '6px' }">Log in</button>
    <button @click="onLogout" :disabled="isLoading || !isAuthenticated">Log out</button>
    <div v-if="isLoading">loading...</div>
    <template v-if="accessToken">
      <h2>Access Token:</h2>
      <pre>{{ accessToken }}</pre>
    </template>
    <template v-if="isAuthenticated">
      <h2>User Info:</h2>
      <pre>{{ user }}</pre>
    </template>
  </div>
</template>

<style scoped>
</style>
