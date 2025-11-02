<script setup lang="ts">
import { api } from '@/main'
import router from '@/router'
import { onMounted, onUnmounted, ref } from 'vue'

const unmounted = ref(false)
const logged_in = ref(false)
const id = ref<string | undefined>(undefined)
const email = ref<string | undefined>(undefined)

if (localStorage.getItem('access_token') === null) {
  logged_in.value = false
  router.push('/login')
} else logged_in.value = true

async function getInfo() {
  if (
    unmounted.value === undefined ||
    unmounted.value ||
    !logged_in.value ||
    id.value !== undefined ||
    email.value !== undefined
  )
    return
  const response = await api
    .myInfoAccountMeInfoGet({
      headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
    })
    .catch((error) => {
      return error
    })
  if (response.status !== 200) {
    setTimeout(getInfo, 1000)
    return
  }
  id.value = response.data.id
  email.value = response.data.email
}

onMounted(getInfo)
onUnmounted(() => {
  unmounted.value = true
})
</script>

<template>
  <h1 v-if="!logged_in" class="text-black dark:text-white text-9xl">
    未登录，<RouterLink class="text-blue-500" to="/login"> 前往登录</RouterLink>
  </h1>
  <div v-else class="flex items-center justify-center">
    <div class="w-full max-w-md">
      <div
        class="bg-white dark:bg-gray-800 mt-10 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
      >
        <div class="p-6">
          <div class="text-center mb-6">
            <h2 class="text-2xl font-bold text-gray-800 dark:text-white">账户信息</h2>
          </div>

          <div class="space-y-4">
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <p>ID：{{ id === undefined ? '-' : id }}</p>
              <p>邮箱：{{ email === undefined ? '-' : email }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
