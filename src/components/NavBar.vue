<script setup lang="ts">
import { NavBarSelectedPage } from '@/lib'
import router from '@/router'
import { ref } from 'vue'

defineExpose({ NavBarSelectedPage })

const props = defineProps<{ selected: NavBarSelectedPage }>()

const logged_in = ref(localStorage.getItem('access_token') !== null)

async function logout() {
  localStorage.removeItem('access_token')
  logged_in.value = false
  router.push('/login')
}
</script>

<template>
  <nav class="relative bg-gray-200 dark:bg-gray-800">
    <div class="mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div
          class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start text-black dark:text-white"
        >
          <div class="flex shrink-0 items-center">Tee</div>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <RouterLink
                to="/dashboard"
                class="rounded-md px-3 py-2 text-sm font-medium"
                :class="{
                  'bg-gray-50 dark:bg-gray-950': props.selected === NavBarSelectedPage.Dashboard,
                }"
              >
                仪表盘
              </RouterLink>
              <RouterLink
                to="/login"
                class="rounded-md px-3 py-2 text-sm font-medium"
                :class="{
                  'bg-gray-50 dark:bg-gray-950': props.selected === NavBarSelectedPage.Login,
                }"
                v-if="!logged_in"
              >
                登录
              </RouterLink>
              <RouterLink
                to="/register"
                class="rounded-md px-3 py-2 text-sm font-medium"
                :class="{
                  'bg-gray-50 dark:bg-gray-950': props.selected === NavBarSelectedPage.Register,
                }"
                v-if="!logged_in"
              >
                注册
              </RouterLink>
              <a
                href="#"
                @click="logout()"
                class="rounded-md px-3 py-2 text-sm font-medium"
                v-if="logged_in"
                >登出</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
