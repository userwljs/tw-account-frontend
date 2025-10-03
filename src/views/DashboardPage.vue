<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import { NavBarSelectedPage } from '@/lib'
import router from '@/router'
import { ref } from 'vue'

const logged_in = ref(false)

if (localStorage.getItem('access_token') === null) {
  logged_in.value = false
  router.push('/login')
} else logged_in.value = true
</script>

<template>
  <NavBar :selected="NavBarSelectedPage.Dashboard" />
  <h1 v-if="!logged_in" class="text-black dark:text-white text-9xl">未登录</h1>
</template>
