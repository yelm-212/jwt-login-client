<template>
  <div class="signup-container">
    <el-card class="signup-card">
      <template #header>
        <h2>Sign Up</h2>
      </template>

      <el-form :model="signupForm" @submit.prevent="handleSignup">
        <el-form-item label="Username">
          <el-input v-model="signupForm.username" />
        </el-form-item>

        <el-form-item label="Password">
          <el-input v-model="signupForm.password" type="password" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" native-type="submit">Sign Up</el-button>
          <router-link to="/login">
            <el-button type="text">Already have an account? Login</el-button>
          </router-link>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { ElMessage } from 'element-plus'

const router = useRouter()

const signupForm = reactive({
  username: '',
  password: ''
})

const handleSignup = async () => {
  try {
    await axios.post('/api/join', {
      username: signupForm.username,
      password: signupForm.password
    })
    ElMessage.success('Sign up successful')
    router.push('/login')
  } catch (error) {
    ElMessage.error('Sign up failed')
    console.log(error)
  }
}
</script>

<style scoped>
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f7fa;
}

.signup-card {
  width: 400px;
}
</style>
