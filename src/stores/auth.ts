import { defineStore } from 'pinia'
import axios from 'axios'
import { ElMessage } from 'element-plus'

interface UserState {
  token: string | null
  username: string | null
  isAdmin: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): UserState => ({
    token: localStorage.getItem('token'),
    username: null,
    isAdmin: false
  }),

  actions: {
    async login(username: string, password: string) {
      try {
        const response = await axios.post('/api/login', {
          username,
          password
        })

        const token = response.headers['authorization']
        if (token) {
          this.token = token
          localStorage.setItem('token', token)
          return true
        }
      } catch (error) {
        console.error('Login error:', error)
        throw error
      }
      return false
    },

    async logout() {
      try {
        if (this.token) {
          await axios.post('/api/logout', null, {
            headers: {
              'Authorization': this.token
            }
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
        if (this.token) {
          const response = await axios.post('/api/reissue', null, {
            headers: {
              'Authorization': this.token
            }
          })

          const newToken = response.headers['authorization']
          if (newToken) {
            this.token = newToken
            localStorage.setItem('token', newToken)
            ElMessage.success('Token reissued successfully')
            return true
          }
        }
      } catch (error) {
        console.error('Token reissue error:', error)
        ElMessage.error('Failed to reissue token')
        throw error
      }
      return false
    }
  }
})
