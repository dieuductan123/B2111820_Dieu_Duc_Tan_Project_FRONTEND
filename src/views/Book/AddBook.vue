<template>
  <div class="mb-5">
    <h1 class="py-5 text-center">THÊM SÁCH MỚI VÀO THƯ VIỆN</h1>
    <h5 v-if="message" class="text-center text-danger">{{ message }}</h5>
    <BookForm :book="book" @create:book="addBook" />
  </div>
</template>

<script>
import BookForm from '@/components/Forms/BookForm.vue'
import sachService from '@/services/sach.service'
export default {
  components: { BookForm },
  data() {
    return {
      book: {
        masach: '',
        tensach: '',
        dongia: '',
        soquyen: '',
        namxuatban: '',
        manxb: '',
        tacgia_nguongoc: '',
        mota: '',
        hinhsach: null,
      },
      message: '',
    }
  },
  methods: {
    async addBook(book) {
      try {
        const result = await sachService.create(book); // Gửi dữ liệu dưới dạng JSON
        if (result) {
          if (result.errorMessage) {
            return (this.message = result.errorMessage);
          }
          alert(`Thêm thành sách mới "${book.tensach}" vào danh sách`);
          this.$router.push({
            name: 'home-page',
          });
        }
      } catch (error) {
        console.error(error);
        alert('Có lỗi xảy ra, vui lòng thử lại.');
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
</style>
