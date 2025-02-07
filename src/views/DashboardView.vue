<template>
  <div class="dashboard">
    <el-container>
      <el-header>
        <div class="header-content">
          <h2>Dashboard</h2>
          <div class="header-buttons">
            <el-button type="primary" @click="handleReissue">Reissue</el-button>
            <el-button type="danger" @click="handleLogout">Logout</el-button>
          </div>
        </div>
      </el-header>

      <el-main>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-card>
              <template #header>
                Normal User Endpoint Test
              </template>
              <el-button @click="testHelloEndpoint">Test /hello</el-button>
              <div v-if="helloResponse" class="response-data">
                {{ helloResponse }}
              </div>
            </el-card>
          </el-col>

          <el-col :span="12">
            <el-card>
              <template #header>
                Admin Endpoint Test
              </template>
              <el-button @click="testAdminEndpoint">Test /admin</el-button>
              <div v-if="adminResponse" class="response-data">
                {{ adminResponse }}
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import axios from '@/plugins/axios'
import { ElMessage } from 'element-plus'

const authStore = useAuthStore()
const router = useRouter()
const helloResponse = ref('')
const adminResponse = ref('')

const handleLogout = async () => {
  await authStore.logout()
  router.push('/login')
}

const handleReissue = async () => {
  try {
    await authStore.reissueToken()
  } catch {
    // Error message is handled in the store
  }
}

const testHelloEndpoint = async () => {
  try {
    const response = await axios.get('/api/hello', {
      headers: {
        'Authorization': authStore.token
      }
    })
    helloResponse.value = response.data
  } catch (error) {
    ElMessage.error('Failed to access /hello endpoint')
    console.log(error)
  }
}

const testAdminEndpoint = async () => {
  try {
    const response = await axios.get('/api/admin', {
      headers: {
        'Authorization': authStore.token
      }
    })
    adminResponse.value = response.data
  } catch (error) {
    ElMessage.error('Failed to access /admin endpoint')
    console.log(error)
  }
}
</script>

<style scoped>
.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-buttons {
  display: flex;
  gap: 10px;  /* 버튼 사이 간격 */
}

.response-data {
  margin-top: 10px;
  padding: 10px;
  background-color: #f5f7fa;
  border-radius: 4px;
}
</style>
