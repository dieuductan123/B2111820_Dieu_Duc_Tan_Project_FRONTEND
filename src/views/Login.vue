<template>
  <div id="login" class="vh-100 d-flex align-items-center justify-content-center">
    <div class="card shadow-lg p-4 rounded-4" style="max-width: 600px; width: 100%">
      <h2 class="text-center text-primary mb-4">Đăng Nhập</h2>
      <h5 v-if="message" class="text-center text-danger">{{ message }}</h5>
      <LoginForm @submit:loginInfo="submitLogin" :loginInfo="loginInfo" />
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/Forms/LoginForm.vue'
import docgiaService from '@/services/docgia.service'
import nhanvienService from '@/services/nhanvien.service'
import { mapActions } from 'vuex'
export default {
  components: {
    LoginForm,
  },
  data() {
    return {
      loginInfo: {
        vaitro: '',
        ms: '',
        matKhau: '',
      },
      message: '',
    }
  },
  created() {
    // Ẩn Navbar và Footer khi trang đăng nhập được hiển thị
    this.toggleVisibility(false);
  },
  beforeUnmount() {
    // Hiển thị lại Navbar và Footer khi rời khỏi trang đăng nhập
    this.toggleVisibility(true);
  },
  methods: {
    ...mapActions(['login']),

    loginCustomer() {},
    async loginStaff() {
      try {
        const response = await nhanvienService.login({
          msNV: this.loginInfo.ms,
          matKhau: this.loginInfo.matKhau,
        })

        if (response.success) {
          const { token, user } = response

          alert('Đăng nhập thành công với vai trò nhân viên')
          this.login({ token, user })

          this.$router.push('/')
        } else {
          this.message = response.message
        }
      } catch (error) {
        console.log(error)
        this.$router.push({
          name: 'not_found',
          params: {
            pathMatch: this.$route.path.split('/').slice(1),
          },
          query: this.$route.query,
          hash: this.$route.hash,
        })
      }
    },
    async loginCustomer() {
      try {
        const response = await docgiaService.login({
          madocgia: this.loginInfo.ms,
          password: this.loginInfo.matKhau,
        })
        console.log(response)

        if (response.success) {
          const { token, user } = response

          alert('Đăng nhập thành công với vai trò độc giả')

          this.login({ token, user })
          this.$router.push('/')
        } else {
          this.message = response.errorMessage
        }
      } catch (error) {}
    },
    ...mapActions(['toggleVisibility']),
    submitLogin() {
      if (this.loginInfo.vaitro === 'docgia') {
        this.loginCustomer()
      }
      if (this.loginInfo.vaitro === 'nhanvien') {
        this.loginStaff()
      }
    },
  },
}
</script>

<style scoped>
#login {
  background: url('@/assets/img/library_background.jpg') no-repeat center center fixed;
    /* Đường dẫn đến ảnh */
  background-size: cover;
  /* Đảm bảo hình ảnh phủ toàn bộ màn hình */
  height: 100vh;
  /* Chiếm toàn bộ chiều cao màn hình */

  /* background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
      url('@/assets/img/login_background.jpg') no-repeat center center fixed;
  background-size: cover;
  height: 100vh; */
}

.card {
  animation: fadeIn 0.8s ease-in-out;
  background-color: rgba(255, 255, 255, 0.9);
    /* Nền trắng mờ */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  /* Bóng mềm */
  border-radius: 10px;
  /* Bo góc */
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
