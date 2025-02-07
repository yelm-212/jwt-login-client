// src/plugins/axios.ts
import axios from 'axios'
import type { Router } from 'vue-router'
import type { AuthStore } from '@/stores/auth'

export function setupAxiosInterceptors(router: Router, authStore: AuthStore) {
  axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response?.status === 401) {
        authStore.clearAuth()
        router.push('/login')
      }
      return Promise.reject(error)
    }
  )
}

export default axios
