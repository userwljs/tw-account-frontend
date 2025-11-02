<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, type Ref, inject } from 'vue';
import { api } from '@/main';
import type { EmailDomainRestrictionInfoRestrictEmailDomainsEnum } from '@/../sdk';
import { checkAndDealError } from '@/lib';
import Swal from 'sweetalert2';
import router from '@/router';

const props = defineProps<{
  register: boolean
}>()

const unmounted = ref(false)
const countdown = ref(0)
const countingDown = ref(false)
const sendingCode = ref(false)
const code = ref("")
const email = ref("")
const restrictEmailDomain = ref<EmailDomainRestrictionInfoRestrictEmailDomainsEnum | undefined>(undefined)
const restrictedEmailDomains = ref<Array<string> | undefined>(undefined)
const registeringOrLoggingIn = ref(false)
const logged_in: Ref<boolean, boolean> = inject('logged_in') as Ref<boolean, boolean>

let timer: number | undefined = undefined

async function getDomainRestrictionInfo() {
  if (unmounted.value === undefined || unmounted.value === true || restrictEmailDomain.value !== undefined || restrictedEmailDomains.value !== undefined) return
  const response = (await api.emailDomainRestrictionInfoEmailDomainRestrictionInfoGet().catch(error => { return error }))
  if (response.status !== 200) {
    setTimeout(getDomainRestrictionInfo, 1000)
    return
  }
  restrictEmailDomain.value = response.data.restrict_email_domains
  restrictedEmailDomains.value = response.data.restricted_email_domains
}

onMounted(getDomainRestrictionInfo)

onUnmounted(() => { unmounted.value = true })

async function sendCode() {
  if (sendCodeDisabled.value) return

  sendingCode.value = true

  const response = await api.emailSendVerificationCodeEmailSendVerificationCodePost({ email: email.value }).catch(error => {
    return error
  })

  sendingCode.value = false

  if (checkAndDealError(response)) return

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

async function loginOrRegister() {
  if (loginOrRegisterDisabled.value) return

  registeringOrLoggingIn.value = true
  if (props.register) {
    const response = await api.registerAccountAccountRegisterPost({ email: email.value, verify_code: code.value }).catch(error => { return error })
    registeringOrLoggingIn.value = false
    if (checkAndDealError(response)) return
    Swal.fire({ title: '成功', text: '注册成功', icon: 'success' })
    router.push('/login')
  } else {
    const response = await api.loginAccountLoginPost(email.value, code.value).catch(error => { return error })
    registeringOrLoggingIn.value = false
    if (checkAndDealError(response)) return
    Swal.fire({ title: '成功', text: '登录成功', icon: 'success' })
    localStorage.setItem("access_token", response.data.access_token)
    logged_in.value = true
    router.push('/dashboard')
  }
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

const sendCodeDisabled = computed(() => { return countingDown.value || sendingCode.value || validateEmail().length !== 0 })
const loginOrRegisterDisabled = computed(() => { return validateEmail().length !== 0 || code.value.length !== 6 || registeringOrLoggingIn.value })
</script>

<template>
  <div
    class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-md mx-auto mt-10 transition-all duration-300 hover:shadow-xl">
    <h2 class="text-2xl font-bold text-center text-gray-700 dark:text-gray-200 mb-6">{{ props.register ? '注册' : '登录' }}
    </h2>

    <!-- 邮箱输入框 -->
    <div class="mb-4">
      <input v-model="email" type="email" placeholder="邮箱" :disabled="sendingCode"
        class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />

      <div v-if="restrictEmailDomain === 'whitelist'"
        class="mt-2 text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-3 py-2 rounded-md">
        <i class="i-tabler-info-circle mr-1"></i>
        <span class="inline-block max-w-[calc(100%-20px)] truncate align-middle">
          仅允许以下域名的邮箱：{{ (restrictedEmailDomains as Array<string>).join("、") }}
        </span>
      </div>

      <div v-if="restrictEmailDomain === 'blacklist'"
        class="mt-2 text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-3 py-2 rounded-md">
        <i class="i-tabler-alert-triangle mr-1"></i>
        <span class="inline-block max-w-[calc(100%-20px)] truncate align-middle">
          不允许以下域名的邮箱：{{ (restrictedEmailDomains as Array<string>).join("、") }}
        </span>
      </div>

      <div v-if="validateEmail().includes(EmailValidationError.TooLong)"
        class="mt-2 text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-3 py-2 rounded-md">
        <i class="i-tabler-alert-triangle mr-1"></i>
        <span class="inline-block max-w-[calc(100%-20px)] truncate align-middle">
          邮箱过长
        </span>
      </div>

      <div v-if="validateEmail().includes(EmailValidationError.FormatError)"
        class="mt-2 text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-3 py-2 rounded-md">
        <i class="i-tabler-alert-triangle mr-1"></i>
        <span class="inline-block max-w-[calc(100%-20px)] truncate align-middle">
          邮箱格式错误
        </span>
      </div>

      <div v-if="validateEmail().includes(EmailValidationError.DomainNotAllowed)"
        class="mt-2 text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-3 py-2 rounded-md">
        <i class="i-tabler-alert-triangle mr-1"></i>
        <span class="inline-block max-w-[calc(100%-20px)] truncate align-middle">
          邮箱域名不被允许
        </span>
      </div>
    </div>

    <!-- 验证码输入框 + 发送按钮 -->
    <div class="mb-4 flex items-center space-x-2">
      <input v-model="code" type="text" placeholder="验证码" :disabled="registeringOrLoggingIn"
        class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
      <button @click="sendCode" :disabled="sendCodeDisabled" :class="{
        'bg-gray-400 cursor-not-allowed dark:bg-gray-600 dark:cursor-not-allowed': sendCodeDisabled,
        'bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700': !sendCodeDisabled
      }" class="px-4 py-2 text-white rounded-md transition-colors">
        {{ countingDown ? `${countdown}s` : '发送验证码' }}
      </button>
    </div>

    <!-- 登录/注册按钮 -->
    <button @click="loginOrRegister" class="w-full text-white font-medium py-2 px-4 rounded-md transition-colors"
      :class="{
        'bg-gray-400 cursor-not-allowed dark:bg-gray-600 dark:cursor-not-allowed': loginOrRegisterDisabled,
        'bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700': !loginOrRegisterDisabled
      }" :disabled="loginOrRegisterDisabled">
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
