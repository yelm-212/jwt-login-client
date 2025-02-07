// plugins/axios.ts
import axios from 'axios'
import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import type { Router } from 'vue-router'
import type { AuthStore } from '@/stores/auth'
import type { QueueItem } from '@/types/queue'
import type { JsonError } from '@/types/error'


let isRefreshing = false
let failedQueue: QueueItem[] = []

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

export function setupAxiosInterceptors(router: Router, authStore: AuthStore) {
  axios.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError<JsonError>) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

      if (error.response?.status === 401 && originalRequest.url?.includes('/api/reissue')) {
        authStore.clearAuth()
        router.push('/login')
        return Promise.reject(error)
      }

      if (error.response?.status === 401 && !originalRequest._retry) {

        if (isRefreshing) {
          return new Promise<unknown>((resolve, reject) => {
            failedQueue.push({ resolve, reject })
          })
            .then(token => {
              if (originalRequest.headers && typeof token === 'string') {
                originalRequest.headers['Authorization'] = token
              }
              return axios(originalRequest)
            })
            .catch((err: Error) => Promise.reject(err))
        }

        originalRequest._retry = true
        isRefreshing = true

        try {
          const response = await authStore.reissueToken()
          const newToken = response.headers['authorization']

          if (newToken) {
            processQueue(null, newToken)
            if (originalRequest.headers) {
              originalRequest.headers['Authorization'] = newToken
            }
            return axios(originalRequest)
          }
          throw new Error('No token in response')
        } catch (refreshError) {
          processQueue(refreshError instanceof Error ? refreshError : new Error('Unknown error'), null)
          authStore.clearAuth()
          router.push('/login')
          return Promise.reject(refreshError)
        } finally {
          isRefreshing = false
        }
      }

      return Promise.reject(error)
    }
  )
}

export default axios
