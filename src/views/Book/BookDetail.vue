<template>
  <div class="px-3">
    <h3 class="text-center"><b>THÔNG TIN SÁCH </b></h3>
    <hr />
    <div class="row align-items-start">
      <!-- Cột hình ảnh -->
      <div class="col-md-5 text-center">
        <img v-if="book.hinhsach" :src="book.hinhsach" alt="Hình bìa sách" class="img-fluid" />
        <span v-else>Không có ảnh</span>
      </div>

      <div class="col-md-7">
        <div class="ps-auto">
          <p><b>Mã sách: </b>{{ book.masach }}</p>
          <p><b>Tên sách: </b>{{ book.tensach }}</p>
          <p><b>Tác giả: </b>{{ book.tacgia_nguongoc }}</p>
          <p><b>Đơn giá: </b>{{ book.dongia }} VNĐ</p>
          <p><b>Tổng số quyển: </b>{{ book.soquyen }}</p>
          <p>
            <b>Số quyển còn lại: </b>
            {{ book.soquyen }}
          </p>
          <p>
            <b>Số quyển bạn đang mượn: </b>
            {{ numberBookThisUserBorrowing }}
          </p>
        </div>
      </div>
    </div>
    <hr />
    <Form :validation-schema="borrowSchema" @submit="onSubmit">
      <div class="py-2">
        <div>
          <b>Số lượng:</b>
          <Field name="quantity" type="number" class="form-control" />
          <ErrorMessage name="quantity" class="text-danger" />
        </div>
        <div>
          <b>Ngày mượn:</b>
          <Field name="borrowDate" type="date" class="form-control" />
          <ErrorMessage name="borrowDate" class="text-danger" />
        </div>
        <div>
          <b>Ngày trả:</b>
          <Field name="returnDate" type="date" class="form-control" />
          <ErrorMessage name="returnDate" class="text-danger" />
        </div>
      </div>
      <button type="submit" class="btn btn-primary form-control">
        Đăng ký mượn
      </button>
    </Form>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import theodoimuonsachService from '@/services/theodoimuonsach.service'

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  props: {
    book: {
      type: Object,
      required: true,
    },
  },
  emits: ['submit:borrowInfo'],
  data() {
    return {
      numberBookBorrowing: 0,
      numberBookThisUserBorrowing: 0,
    }
  },
  computed: {
    borrowSchema() {
      return yup.object().shape({
        quantity: yup
          .number()
          .required('Vui lòng nhập số lượng')
          .min(1, 'Số lượng phải lớn hơn 0')
          .max(
            this.book.soquyen - this.numberBookBorrowing,
            'Số lượng vượt quá số sách còn lại',
          ),
        borrowDate: yup
          .date()
          .required('Vui lòng chọn ngày mượn')
          .typeError('Ngày mượn không hợp lệ'),
        returnDate: yup
          .date()
          .required('Vui lòng chọn ngày trả')
          .typeError('Ngày trả không hợp lệ')
          .min(yup.ref('borrowDate'), 'Ngày trả phải sau ngày mượn'),
      })
    },
  },
  methods: {
    async getNumberBookBorrowed() {
      try {
        const sachDangDuocMuon = await theodoimuonsachService.getNumberFree(
          this.book.masach,
        )

        let total = 0
        sachDangDuocMuon.forEach(element => {
          if (element.trangthai != 'Đã trả') total += element.soquyen
        })

        this.numberBookBorrowing = total
      } catch (error) {
        alert('Có lỗi xảy ra khi tìm sách')
      }
    },
    async getNumberBookUserBorrowing() {
      try {
        const user = JSON.parse(localStorage.getItem('user'))

        const sachDangDuocNguoiDungMuon =
          await theodoimuonsachService.getNumberBorrowedOfReader(
            user.madocgia,
            this.book.masach,
          )

        let total = 0
        sachDangDuocNguoiDungMuon.forEach(element => {
          if (element.trangthai != 'Đã trả') total += element.soquyen
        })

        this.numberBookThisUserBorrowing = total
      } catch (error) {
        alert('Có lỗi xảy ra khi tìm sách')
      }
    },
    async onSubmit(values) {
      if (this.numberBookThisUserBorrowing + values.quantity > 5) {
        alert('Bạn chỉ được mượn tối đa 5 quyển')
      } else {
        this.$emit('submit:borrowInfo', values)
      }
    },
  },
  watch: {
    book: {
      handler() {
        this.getNumberBookBorrowed()
        this.getNumberBookUserBorrowing()
      },
      immediate: true,
      deep: true,
    },
  },
}
</script>

<style scoped>
.img-fluid {
  border: 1px solid black;
  object-fit: cover;
  max-width: 200px;
  max-width: 200px;
}
.row {
  margin-bottom: 20px;
}
</style>
