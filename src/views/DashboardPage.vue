<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import { NavBarSelectedPage } from '@/lib'
import router from '@/router'

if (localStorage.getItem('access_token') === null) {
  router.push('/login')
}
</script>

<template>
  <NavBar :selected="NavBarSelectedPage.Dashboard" />
</template>
