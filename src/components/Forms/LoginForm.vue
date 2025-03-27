<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-md-8 col-lg-8">
        <hr />
        <Form :validation-schema="loginFormSchema" @submit="submitLogin">
          <Field as="select" id="vaitro" name="vaitro" v-model="loginInfoLocal.vaitro" class="form-control text-center">
            <option class="text-center" disabled value="">
              --- Vui lòng chọn vai trò của bạn ---
            </option>

            <option value="docgia">Độc giả</option>
            <option value="nhanvien">Nhân viên</option>
          </Field>

          <!-- Hiển thị lỗi nếu có -->
          <ErrorMessage name="vaitro" class="error-feedback" />
          <div class="form-group mt-4">
            <label for="ms">Mã số người dùng:</label>
            <Field v-model="loginInfoLocal.ms" id="ms" name="ms" type="text" class="form-control" />
            <ErrorMessage name="ms" class="error-feedback" />
          </div>
          <div class="form-group mt-4">
            <label for="matKhau">Mật khẩu:</label>
            <div class="input-group">
              <Field v-model="loginInfoLocal.matKhau" id="matKhau" name="matKhau"
                :type="showPassword ? 'text' : 'password'" class="form-control" />
              <button type="button" class="btn btn-outline-secondary" @click="togglePassword">
                <i :class="showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'"></i>
              </button>
            </div>

            <ErrorMessage name="matKhau" class="error-feedback" />
          </div>
          <div class="form-group mt-4 text-center mt-2">
            <button class="btn w-100 btn-primary" type="submit">
              Đăng nhập
            </button>
            <div class="d-flex justify-content-between align-items-center mt-3">
              <p class="text-center mt-3">Chưa có tài khoản?
                <router-link to="/signup" class="text-decoration-none text-primary">Đăng ký ngay</router-link>
              </p>

              <RouterLink to="/">
                <button class="btn btn-outline-primary" type="button">
                  Thoát
                </button>
              </RouterLink>
            </div>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>

import * as yup from 'yup'
import { Form, Field, ErrorMessage } from 'vee-validate'

export default {
  emits: ['submit:loginInfo'],
  props: {
    loginInfo: { type: Object, required: true },
  },
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const loginFormSchema = yup.object().shape({
      vaitro: yup.string().required('Vui lòng chọn vai trò'),
      ms: yup.string().required('Vui lòng nhập mã số người dùng'),
      matKhau: yup.string().required('Vui lòng nhập mật khẩu'),
    })
    return {
      loginInfoLocal: this.loginInfo,
      loginFormSchema,
      showPassword: false,
    }
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    submitLogin() {
      this.$emit('submit:loginInfo', this.loginInfoLocal)
    },
  },
}
</script>

<style scoped>
.error-feedback {
  color: red;
  font-size: 0.875em;
}
</style>
