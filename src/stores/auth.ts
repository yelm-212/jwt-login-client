import { defineStore } from 'pinia'
import axios from '@/plugins/axios'
// import { ElMessage } from 'element-plus'
import type { APIError } from '@/types/error'
import type { UserState } from '@/types/user_state.ts'

export type AuthStore = ReturnType<typeof useAuthStore>

export const useAuthStore = defineStore('auth', {
  state: (): UserState => ({
    token: localStorage.getItem('token'),
    username: null,
    isAdmin: false,
  }),

  actions: {
    clearAuth() {
      this.token = null
      this.username = null
      this.isAdmin = false
      localStorage.removeItem('token')
    },

    async login(username: string, password: string) {
      try {
        const response = await axios.post('/api/login', {
          username,
          password,
        })

        const token = response.headers['authorization']
        if (token) {
          this.token = token
          localStorage.setItem('token', token)
          return true
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.data) {
          const apiError = error.response.data as APIError
          throw apiError // 에러 객체를 상위로 전달
        }
        throw error
      }
      return false
    },

    async logout() {
      try {
        if (this.token) {
          await axios.post('/api/logout', null, {
            headers: {
              Authorization: this.token,
            },
          })
        }
      } finally {
        this.token = null
        this.username = null
        this.isAdmin = false
        localStorage.removeItem('token')
      }
    },

    async reissueToken() {
      try {
        const response = await axios.post('/api/reissue', null, {
          headers: {
            Authorization: this.token,
          },
        })

        const newToken = response.headers['authorization']
        if (newToken) {
          this.token = newToken
          localStorage.setItem('token', newToken)
          return response
        }
        throw new Error('No token in response')
      } catch (error) {
        throw error
      }
    },
  },
})
