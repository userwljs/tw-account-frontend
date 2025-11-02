<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import { provide, ref } from 'vue'

const logged_in = ref(localStorage.getItem('access_token') !== null)

provide('logged_in', logged_in)
</script>

<template>
  <main class="bg-gray-50 dark:bg-gray-950 min-h-screen min-w-screen">
    <NavBar />
    <router-view />
  </main>
</template>

<style scoped></style>
