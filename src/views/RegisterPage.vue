<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import AccountCard from '@/components/AccountCard.vue';
import { NavBarSelectedPage } from '@/lib';
</script>

<template>
  <NavBar :selected=NavBarSelectedPage.Register />
  <AccountCard :register=true />
</template>
