import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { UserInfo } from '@/types/api'
import { post } from '@/utils/api'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string>(localStorage.getItem('token') || '')
  const user = ref<UserInfo | null>(null)

  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    try {
      user.value = JSON.parse(storedUser)
    } catch {
      localStorage.removeItem('user')
    }
  }

  const isLoggedIn = computed(() => !!token.value)
  const username = computed(() => user.value?.uname || '')

  async function login(uname: string, pwd: string) {
    const res = await post<{ user: UserInfo; token: string }>('/login', { uname, pwd })
    token.value = res.date.token
    user.value = res.date.user
    localStorage.setItem('token', res.date.token)
    localStorage.setItem('user', JSON.stringify(res.date.user))
  }

  async function register(uname: string, pwd: string) {
    await post('/register', { uname, pwd })
  }

  function logout() {
    token.value = ''
    user.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  return { token, user, isLoggedIn, username, login, register, logout }
})