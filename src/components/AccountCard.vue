<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Swal from 'sweetalert2';
import { api } from '@/main';
import type { EmailDomainRestrictionInfoRestrictEmailDomainsEnum } from '@/sdk';

const props = defineProps<{
  register: boolean
}>()

const countdown = ref(0)
const countingDown = ref(false)
const sendingCode = ref(false)
const code = ref("")
const email = ref("")
const rememberMe = ref(false)
const restrictEmailDomain = ref<EmailDomainRestrictionInfoRestrictEmailDomainsEnum | undefined>(undefined)
const restrictedEmailDomains = ref<Array<string> | undefined>(undefined)

let timer: number | undefined = undefined

onMounted(async () => {
  const restrictionInfo = (await api.emailDomainRestrictionInfoEmailDomainRestrictionInfoGet()).data
  restrictEmailDomain.value = restrictionInfo.restrict_email_domains
  restrictedEmailDomains.value = restrictionInfo.restricted_email_domains
})

async function sendCode() {
  if (countingDown.value || sendingCode.value || validateEmail().length !== 0) {
    return
  }

  sendingCode.value = true

  const response = await api.emailSendVerificationCodeEmailSendVerificationCodePost({ email: email.value })

  sendingCode.value = false

  if (response.status !== 200) {
    Swal.fire({ "titleText": "错误", "text": "发生错误", icon: 'error' })
    return
  }

  countingDown.value = true
  countdown.value = 60

  timer = setInterval(() => {
    countdown.value -= 1
    if (countdown.value <= 0) {
      clearInterval(timer)
      countingDown.value = false
    }
  }, 1000)
}

function loginOrRegister() {
  // TODO
}

enum EmailValidationError {
  FormatError,
  DomainNotAllowed,
  TooLong
}

/**
 * 检查邮箱要求，并返回一个包含错误项的数组
 */
function validateEmail(): Array<EmailValidationError> {
  const result: Array<EmailValidationError> = []

  if (email.value.length > 129) result.push(EmailValidationError.TooLong)

  if (isEmailFormatWrong()) {
    result.push(EmailValidationError.FormatError)
    return result
  }

  if (restrictEmailDomain.value !== undefined && restrictedEmailDomains.value !== undefined && restrictEmailDomain.value !== "no") {
    const domain = email.value.split('@')[1]
    if (restrictEmailDomain.value === 'whitelist') {
      if (!restrictedEmailDomains.value.includes(domain as string)) result.push(EmailValidationError.DomainNotAllowed)
    }
    if (restrictEmailDomain.value === 'blacklist') {
      if (restrictedEmailDomains.value.includes(domain as string)) result.push(EmailValidationError.DomainNotAllowed)
    }
  }
  return result
}

/**
 * 检查邮箱格式是否正确
 */
function isEmailFormatWrong(): boolean {
  if (email.value.length === 0) return true

  const atParts = email.value.split('@')

  if (atParts.length !== 2) return true

  const [localPart, domainPart] = atParts

  if (localPart?.length === 0 || localPart?.includes('.')) return true

  if (!domainPart?.includes('.')) return true

  const dotIndex = domainPart?.indexOf('.')

  if (dotIndex === undefined || dotIndex === 0 || dotIndex === domainPart.length - 1) return true

  return false
}
</script>

<template>
  <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md max-w-md mx-auto mt-10">
    <h2 class="text-2xl font-bold text-center text-gray-700 dark:text-gray-200 mb-6">{{ props.register ? '注册' : '登录' }}
    </h2>

    <!-- 邮箱输入框 -->
    <div class="mb-4">
      <input v-model="email" type="email" placeholder="邮箱" :disabled="sendingCode"
        class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />

      <div v-if="restrictEmailDomain === 'whitelist'"
        class="mt-2 text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-3 py-2 rounded-md">
        <i class="i-tabler-info-circle mr-1"></i>
        仅允许以下域名的邮箱：{{ (restrictedEmailDomains as Array<string>).join("、") }}
      </div>

      <div v-if="restrictEmailDomain === 'blacklist'"
        class="mt-2 text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-3 py-2 rounded-md">
        <i class="i-tabler-alert-triangle mr-1"></i>
        不允许以下域名的邮箱：{{ (restrictedEmailDomains as Array<string>).join("、") }}
      </div>
    </div>

    <!-- 验证码输入框 + 发送按钮 -->
    <div class="mb-4 flex items-center space-x-2">
      <input v-model="code" type="text" placeholder="验证码"
        class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
      <button @click="sendCode" :disabled="countingDown || sendingCode" :class="{
        'bg-gray-400 cursor-not-allowed dark:bg-gray-600 dark:cursor-not-allowed': countingDown || sendingCode || validateEmail().length !== 0,
        'bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700': !(countingDown || sendingCode || validateEmail().length !== 0)
      }" class="px-4 py-2 text-white rounded-md transition-colors">
        {{ countingDown ? `${countdown}s` : '发送验证码' }}
      </button>
    </div>

    <!-- 记住我 -->
    <div class="flex items-center mb-6" v-if="!props.register">
      <input id="remember" v-model="rememberMe" type="checkbox"
        class="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:checked:bg-blue-600 dark:checked:border-blue-600" />
      <label for="remember" class="text-sm text-gray-700 dark:text-gray-300">记住我</label>
    </div>

    <!-- 登录按钮 -->
    <button @click="loginOrRegister"
      class="w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
      {{ props.register ? '注册' : '登录' }}
    </button>

    <!-- 注册/登录链接 -->
    <div class="mt-6 text-center text-sm text-gray-600 dark:text-gray-400" v-if="!register">
      还没有账户？
      <router-link to="/register"
        class="text-blue-500 hover:underline dark:text-blue-400 dark:hover:text-blue-300">立即注册</router-link>
    </div>
    <div class="mt-6 text-center text-sm text-gray-600 dark:text-gray-400" v-if="register">
      已有账户？
      <router-link to="/login"
        class="text-blue-500 hover:underline dark:text-blue-400 dark:hover:text-blue-300">立即登录</router-link>
    </div>
  </div>
</template>
