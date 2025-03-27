<template>
  <div id="signup" class="vh-100 d-flex align-items-center justify-content-center fade-in">
    <div class="card shadow-lg p-3 rounded-4" style="max-width: 600px; width: 100%">
      <h2 class="text-center text-primary">Đăng Ký Tài Khoản</h2>
      <hr>
      <h5 v-if="message" class="text-center text-danger">{{ message }}</h5>
      <SignUpForm :customer="customer" @submit:customer="signUp" />
    </div>
  </div>
</template>

<script>
//import CustomerForm from '@/components/Forms/CustomerForm.vue'
import SignUpForm from '@/components/Forms/SignUpForm.vue';
import docgiaService from '@/services/docgia.service';
import { mapActions } from 'vuex';
export default {
  components: {
    //CustomerForm,
    SignUpForm,
  },
  data() {
    return {
      message: '',
      customer: {
        madocgia: '',
        holot: '',
        ten: '',
        ngaysinh: '',
        diachi: '',
        dienthoai: '',
        password: '',
      },
    }
  },
  created() {
    // Ẩn Navbar và Footer khi hiển thị trang đăng ký
    this.toggleVisibility(false);
  },
  beforeUnmount() {
    // Hiển thị lại Navbar và Footer khi rời khỏi trang đăng ký
    this.toggleVisibility(true);
  },
  methods: {
    ...mapActions(['toggleVisibility']), // Map action từ Vuex Store
    async signUp(customer) {
      try {
        console.log(customer)

        const result = await docgiaService.create(customer)
        if (result) {
          if (result.errorMessage) {
            return (this.message = result.errorMessage)
          }
          alert('Đăng ký thành công')
          this.$router.push('/login');
        }
      } catch (error) {
        console.log(error)
        alert('Có lỗi xảy ra vui lòng thử lại sau')
      }
    },
  },
}
</script>
<style scoped>
h1 {
  font-weight: bolder;
}

.text-underline {
  text-decoration: underline;
}

#signup {
  background: url('@/assets/img/library_background.jpg') no-repeat center center fixed;
  /* Đường dẫn đến ảnh */
  background-size: cover;
  /* Đảm bảo hình ảnh phủ toàn bộ màn hình */
  height: 100vh;
}

.card {
  animation: fadeIn 0.8s ease-in-out;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
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