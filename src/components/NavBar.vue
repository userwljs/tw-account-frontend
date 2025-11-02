<script setup lang="ts">
import { NavBarSelectedPage } from '@/lib'
import router from '@/router'
import { inject, type Ref } from 'vue'

defineExpose({ NavBarSelectedPage })

const logged_in: Ref<boolean, boolean> = inject('logged_in') as Ref<boolean, boolean>

async function logout() {
  localStorage.removeItem('access_token')
  logged_in.value = false
}
</script>

<template>
  <header>
    <el-menu mode="horizontal" :default-active="router.currentRoute.value.path" router>
      <div class="flex items-center pl-8 pr-8">
        <el-text size="large">Tee</el-text>
      </div>
      <el-menu-item index="/dashboard">仪表盘</el-menu-item>
      <el-menu-item index="/login" v-if="!logged_in">登录</el-menu-item>
      <el-menu-item index="/register" v-if="!logged_in">注册</el-menu-item>
      <el-menu-item index="/login" v-if="logged_in" @click="logout()">登出</el-menu-item>
    </el-menu>
  </header>
</template>
