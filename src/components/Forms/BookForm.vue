<template>
  <div class="container">
    <div class="row justify-content-center">
      <!-- Phần hình ảnh -->
      <div class="col-md-4 text-center">
        <div v-if="previewImage">
          <p>Xem trước hình ảnh:</p>
          <img :src="previewImage || bookLocal.hinhsach" alt="Hình bìa sách" class="img-fluid border" />
        </div>
      </div>

      <!-- Đường kẻ màu xanh -->
      <div class="col-md-1 d-flex justify-content-center align-items-center">
        <div class="separator"></div>
      </div>

      <div class="col-12 col-md-7 col-lg-5">
        <!-- Sử dụng VeeValidate Form component -->

        <Form :validation-schema="bookFormSchema" @submit="createBook">

          <!-- Hàng chứa Mã sách và Tên sách -->
          <div class="form-group row mt-4">
            <!-- Ma sach -->
            <div class="col-md-6">
              <label for="masach">Mã sách:</label>
              <Field :disabled="bookLocal._id" id="masach" name="masach" type="text" v-model="bookLocal.masach"
                class="form-control" />
              <ErrorMessage name="masach" class="error-feedback" />
            </div>

            <!-- Ten sach -->
            <div class="col-md-6">
              <label for="tensach">Tên sách:</label>
              <Field id="tensach" name="tensach" type="text" v-model="bookLocal.tensach" class="form-control" />
              <ErrorMessage name="tensach" class="error-feedback" />
            </div>
          </div>

          <div class="form-group mt-4">
            <label for="manxb">Nhà xuất bản:</label>

            <!-- Dropdown cho chọn lựa Chức vụ -->
            <Field as="select" id="manxb" name="manxb" v-model="bookLocal.manxb" class="form-control">
              <option disabled value="">---Chọn nhà xuất bản---</option>
              <template v-for="publisher in publishers">
                <option :value="publisher.manxb">
                  {{ publisher.manxb + ' - ' + publisher.tennxb }}
                </option>
              </template>
            </Field>

            <!-- Hiển thị lỗi nếu có -->
            <ErrorMessage name="manxb" class="error-feedback" />
          </div>

          <div class="form-group row mt-4">
            <!-- Don gia -->
            <div class="col-md-6">
              <label for="dongia">Đơn giá:</label>
              <Field id="dongia" name="dongia" type="number" v-model="bookLocal.dongia" class="form-control" />
              <ErrorMessage name="dongia" class="error-feedback" />
            </div>

            <!-- So quyen -->
            <div class="col-md-6">
              <label for="soquyen">Số quyển:</label>
              <Field id="soquyen" name="soquyen" type="number" v-model="bookLocal.soquyen" class="form-control" />
              <ErrorMessage name="soquyen" class="error-feedback" />
            </div>
          </div>

          <div class="form-group row mt-4">
            <!-- Tác giả -->
            <div class="col-md-6">
              <label for="tacgia_nguongoc">Tác giả:</label>
              <Field id="tacgia_nguongoc" name="tacgia_nguongoc" type="text" v-model="bookLocal.tacgia_nguongoc"
                class="form-control" />
              <ErrorMessage name="tacgia_nguongoc" class="error-feedback" />
            </div>

            <!-- Nam xuat ban -->
            <div class="col-md-6">
              <label for="namxuatban">Năm xuất bản:</label>

              <Field id="namxuatban" name="namxuatban" type="number" v-model="bookLocal.namxuatban"
                class="form-control" />

              <ErrorMessage name="namxuatban" class="error-feedback" />
            </div>
          </div>

          <!-- Trường mô tả -->
          <div class="form-group mt-4">
            <label for="mota">Mô tả:</label>
            <Field id="mota" name="mota" as="textarea" rows="4" v-model="bookLocal.mota" class="form-control" />
            <ErrorMessage name="mota" class="error-feedback" />
          </div>

          <!-- Trường thêm hình ảnh bìa sách -->
          <div class="form-group mt-4">
            <label for="hinhsach">Hình ảnh bìa sách:</label>
            <input id="hinhsach" type="file" accept="image/*" class="form-control" @change="onImageChange" />
          </div>

          <div class="form-group mt-4 text-center mt-2">
            <RouterLink to="/">
              <button class="btn btn-outline-primary mx-2" type="button">
                Quay lại
              </button>
            </RouterLink>
            <button v-if="bookLocal._id" class="btn btn-primary" @click="editBook">
              Sửa
            </button>
            <button v-if="bookLocal._id" class="mx-2 btn btn-danger" @click="deleteBook">
              Xóa
            </button>
            <button v-else class="btn btn-primary" type="submit">Thêm</button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import * as yup from 'yup'
import { Form, Field, ErrorMessage } from 'vee-validate'
import nhaxuatbanService from '@/services/nhaxuatban.service'

export default {
  props: {
    book: { type: Object, required: true },
  },
  emits: ['create:book', 'edit:book', 'delete:book'],
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const bookFormSchema = yup.object().shape({
      masach: yup.string().trim().required('Vui lòng nhập mã sách'),
      tensach: yup.string().trim().required('Vui lòng nhập tên sách'),
      manxb: yup.string().required('Vui lòng chọn mã nhà xuất bản'),
      dongia: yup
        .number()
        .typeError('Đơn giá phải là một số')
        .required('Vui lòng nhập đơn giá')
        .moreThan(0, 'Đơn giá không hợp lệ'),
      soquyen: yup
        .number()
        .required('Vui lòng nhập số quyển')
        .typeError('Số quyển phải là một số')
        .moreThan(0, 'Số quyển không hợp lệ'),
      namxuatban: yup
        .number()
        .required('Vui lòng chọn năm xuất bản')
        .typeError('Năm xuất bản phải là một năm hợp lệ')
        .moreThan(0, 'Năm xuất bản không hợp lệ'),
      tacgia_nguongoc: yup.string().required('Vui lòng nhập tác giả'),
      mota: yup.string().required('Vui lòng nhập mô tả'),
    })
    return {
      bookLocal: {...this.book},
      bookFormSchema,
      publishers: [],
      previewImage: this.book?.hinhsach || null,
    }
  },
  methods: {
    onImageChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.bookLocal.hinhsach = reader.result; // Lưu hình ảnh dưới dạng Base64
          this.previewImage = reader.result; // Hiển thị hình ảnh xem trước
        };
        reader.readAsDataURL(file); // Đọc file và chuyển sang Base64
      } else {
        // Không thay đổi nếu không có hình ảnh mới
        this.previewImage = this.bookLocal.hinhsach || null; 
      }
    },
    createBook() {
      this.$emit('create:book', this.bookLocal)
    },
    editBook() {
      this.$emit('edit:book', this.bookLocal)
    },
    deleteBook() {
      const accept = confirm('Bạn có muốn xóa sách này không')
      if (accept) {
        this.$emit('delete:book')
      }
    },
    async getPublishers() {
      try {
        this.publishers = await nhaxuatbanService.getAll()
      } catch (error) {
        alert('Có lỗi xảy ra khi lấy danh sách nhà xuất bản')
      }
    },
  },
  created() {
    this.getPublishers()
  },
}
</script>

<style scoped>
.error-feedback {
  color: red;
  font-size: 0.875em;
}

.img-fluid {
  max-width: 100%;
  height: auto;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.separator {
  width: 2px;
  height: 100%;
  background-color: #00f;
  /* Màu xanh */
}
</style>
