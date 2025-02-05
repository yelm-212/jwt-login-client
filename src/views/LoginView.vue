<template>
  <div class="login-container">
    <el-card class="login-card">
      <template #header>
        <h2>Login</h2>
      </template>

      <el-form :model="loginForm" @submit.prevent="handleLogin">
        <el-form-item label="Username">
          <el-input v-model="loginForm.username" />
        </el-form-item>

        <el-form-item label="Password">
          <el-input v-model="loginForm.password" type="password" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" native-type="submit">Login</el-button>
        </el-form-item>

        <el-form-item>
          <router-link to="/signup">
            <el-button type="text">Need an account? Sign up</el-button>
          </router-link>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const loginForm = reactive({
  username: '',
  password: ''
})

const handleLogin = async () => {
  try {
    await authStore.login(loginForm.username, loginForm.password)
    ElMessage.success('Login successful')
    router.push('/dashboard')
  } catch (error) {
    ElMessage.error('Login failed')
    console.log(error)
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f7fa;
}

.login-card {
  width: 400px;
}
</style>
