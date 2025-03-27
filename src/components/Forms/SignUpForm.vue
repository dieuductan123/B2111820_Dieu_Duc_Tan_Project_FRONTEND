<template>
  <div class="signup-form">
    <Form :validation-schema="signUpFormSchema" @submit="submitChange">
      <!-- Mã độc giả và Phái (cùng một hàng) -->
      <div class="row mb-3">
        <div class="form-group col-md-6">
          <label for="madocgia" class="form-label">Mã độc giả:</label>
          <Field :disabled="customerLocal._id" placeholder="Nhập mã độc giả..." id="madocgia" name="madocgia"
            type="text" class="form-control" v-model="customerLocal.madocgia" />
          <ErrorMessage name="madocgia" class="error-feedback" />
        </div>
        <div class="form-group col-md-6">
          <label for="phai" class="form-label">Phái:</label>
          <Field as="select" id="phai" name="phai" v-model="customerLocal.phai" class="form-control">
            <option disabled value="">Chọn phái</option>
            <option value="nam">Nam</option>
            <option value="nu">Nữ</option>
            <option value="khac">Khác</option>
          </Field>
          <ErrorMessage name="phai" class="error-feedback" />
        </div>
      </div>

      <!-- Mật khẩu và Số điện thoại (cùng một hàng) -->
      <div class="row mb-3">
        <div class="form-group col-md-6">
          <label for="password" class="form-label">Mật khẩu:</label>
          <div class="input-group">
            <Field id="password" name="password" :type="showPassword ? 'text' : 'password'" class="form-control"
              placeholder="Nhập mật khẩu..." v-model="customerLocal.password" />
            <button type="button" class="btn btn-outline-secondary" @click="togglePassword">
              <i :class="showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'"></i>
            </button>
          </div>
          <ErrorMessage name="password" class="error-feedback" />
        </div>
        <div class="form-group col-md-6">
          <label for="dienthoai" class="form-label">Số điện thoại:</label>
          <Field id="dienthoai" name="dienthoai" type="text" class="form-control" placeholder="Nhập số điện thoại..."
            v-model="customerLocal.dienthoai" />
          <ErrorMessage name="dienthoai" class="error-feedback" />
        </div>
      </div>

      <!-- Ho lot & Ten -->
      <div class="justify-content-between row">
        <div class="form-group col-6">
          <label for="holot" class="form-label">Họ và chữ lót:</label>
          <Field placeholder="Họ và chữ lót" id="holot" name="holot" type="text" class="form-control"
            v-model="customerLocal.holot" />
          <ErrorMessage name="holot" class="error-feedback" />
        </div>
        <div class="form-group col-5">
          <label for="ten" class="form-label">Tên:</label>
          <Field placeholder="Tên" id="ten" name="ten" type="text" class="form-control" v-model="customerLocal.ten" />
          <ErrorMessage name="ten" class="error-feedback" />
        </div>
      </div>

      <!-- Ngay sinh -->
      <div class="row mb-3">
        <div class="form-group col-md-4">
          <label for="ngay" class="form-label">Ngày:</label>
          <Field as="select" id="ngay" name="ngay" class="form-control" v-model="ngay">
            <option disabled value="">Ngày</option>
            <template v-for="i in Array.from(
              { length: 31 },
              (_, index) => index + 1
            )">
              <option :value="i">{{ i }}</option>
            </template>
          </Field>
          <ErrorMessage name="ngay" class="error-feedback" />
        </div>

        <div class="form-group col-md-4">
          <label for="thang" class="form-label">Tháng:</label>
          <Field as="select" id="thang" name="thang" class="form-control" v-model="thang">
            <option disabled value="">Tháng</option>
            <template v-for="i in Array.from(
              { length: 12 },
              (_, index) => index + 1
            )">
              <option :value="i">{{ i }}</option>
            </template>
          </Field>
          <ErrorMessage name="thang" class="error-feedback" />
        </div>

        <div class="form-group col-md-4">
          <label for="nam" class="form-label">Năm:</label>
          <Field as="select" id="nam" name="nam" class="form-control" v-model="nam">
            <option disabled value="">Năm</option>
            <template v-for="i in Array.from(
              { length: 41 },
              (_, index) => 1980 + index
            )">
              <option :value="i">{{ i }}</option>
            </template>
          </Field>
          <ErrorMessage name="nam" class="error-feedback" />
        </div>
      </div>

      <!-- Địa chỉ -->
      <div class="form-group mb-4">
        <label for="diachi" class="form-label">Địa chỉ:</label>
        <Field id="diachi" name="diachi" type="text" class="form-control" placeholder="Nhập địa chỉ..."
          v-model="customerLocal.diachi" />
        <ErrorMessage name="diachi" class="error-feedback" />
      </div>

      <!-- Nút đăng ký -->
      <button v-if="customerLocal._id" class="btn btn-primary w-100" type="submit">
        Cập nhật
      </button>
      <button v-else class="btn btn-primary w-100" type="submit">
        Đăng Ký
      </button>

      <!-- Đã có tài khoản? Đăng nhập và nút Thoát -->
      <div class="d-flex justify-content-between align-items-center mt-4">
        <p class="mb-0">Đã có tài khoản?
          <router-link to="/login" class="text-primary text-decoration-none">Đăng nhập</router-link>
        </p>
        <router-link to="/">
          <button type="button" class="btn btn-outline-secondary">Thoát</button>
        </router-link>
      </div>
    </Form>
  </div>
</template>

<script>
import * as yup from 'yup'
import { Form, Field, ErrorMessage } from 'vee-validate'

export default {
  emits: ['submit:customer'],
  props: {
    customer: { type: Object, required: true },
  },
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const signUpFormSchema = yup.object().shape({
      madocgia: yup
        .string()
        .required('Vui lòng nhập mã độc giả')
        .min(5, 'Mã độc giả phải có ít nhất 5 ký tự'),
      holot: yup.string().required('Vui lòng nhập họ và chữ lót'),
      ten: yup.string().required('Vui lòng nhập tên'),
      diachi: yup.string().required('Vui lòng nhập địa chỉ'),
      dienthoai: yup
        .string()
        .required('Vui lòng nhập số điện thoại')
        .matches(
          /((09|03|07|08|05)+([0-9]{8})\b)/g,
          'Số điện thoại không hợp lệ.',
        ),
      ngay: yup.string().required('Vui lòng chọn ngày'),
      thang: yup.string().required('Vui lòng chọn tháng'),
      nam: yup.string().required('Vui lòng chọn năm'),
      // password: yup.string().required('Vui lòng nhập mật khẩu'),
      phai: yup.string().required('Vui lòng chọn giới tính'),
    })
    return {
      showPassword: false,
      customerLocal: this.customer,
      signUpFormSchema,
      ngay: Number(this.customer.ngaysinh.split('-')[0]) ?? '',
      thang: Number(this.customer.ngaysinh.split('-')[1]) ?? '',
      nam: Number(this.customer.ngaysinh.split('-')[2]) ?? '',
    }
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    submitChange() {
      this.customerLocal = {
        ...this.customerLocal,
        ngaysinh: `${this.ngay}-${this.thang}-${this.nam}`,
      }
      this.$emit('submit:customer', this.customerLocal)
    },
  },
}
</script>

<style scoped>
.error-feedback {
  color: red;
  font-size: 0.875em;
}

.custom-dropdown {
  max-height: 50px;
  /* Chiều cao tối đa */
  overflow-y: auto;
  /* Kích hoạt cuộn dọc nếu nội dung vượt quá chiều cao */
}

.signup-form {
  max-width: 800px;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

form {
  background: #f9f9f9;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 15px;
}

.row>.form-group {
  padding-right: 15px;
  padding-left: 15px;
}

.btn-primary {
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  padding: 10px;
  transition: background-color 0.3s;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-outline-secondary {
  border: 1px solid #6c757d;
}

.btn-outline-secondary:hover {
  background-color: #6c757d;
  color: #fff;
}
</style>
