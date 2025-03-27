<template>
  <div class="text-center row justify-content-center">
    <div class="col-10 col-md-6 form-group pb-4">
      <div class="input-group">
        <input v-model="searchKey" type="text" class="form-control" placeholder="Nhập tên sách . . ."
          @keyup.enter="search" />
        <button @click="search" class="btn btn-primary">Tìm kiếm</button>
      </div>
    </div>
  </div>
  <div class="container" v-if="getRole == 'NV' || getRole == 'QL'">
    <RouterLink :to="{ name: 'add-book' }">
      <button class="btn btn-outline-success">Thêm sách</button>
    </RouterLink>
    <hr />
  </div>

  <h4 class="text-center text-warning" v-if="books.length === 0 && !loading">
    Không tìm được sách phù hợp.
  </h4>
  <div v-else class="container">
    <table class="pt-5 table text-truncate table-hover table-bordered">
      <thead class="table-info">
        <tr class="bg-primary">
          <th>Mã sách</th>
          <th>Hình ảnh</th>
          <th>Tên sách</th>
          <th>Năm xuất bản</th>
          <th>Tác giả</th>
          <th>Số quyển</th>
          <th v-if="getRole == 'NV' || getRole == 'QL'">Đơn giá</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="book in bookShow">
          <tr @click="
            getRole == 'QL' || getRole == 'NV' ? goToEdit(book._id) : ''
            ">
            <td>
              {{ book.masach }}
            </td>
            <td>
              <!-- Hiển thị hình ảnh -->
              <img v-if="book.hinhsach" :src="book.hinhsach" alt="Hình bìa sách" class="img-fluid"
                style="max-width: 100px; max-height: 100px; object-fit: contain;" />
              <span v-else>Không có ảnh</span>
            </td>
            <td>
              {{ book.tensach }}
            </td>
            <td>
              {{ book.namxuatban }}
            </td>
            <td>
              {{ book.tacgia_nguongoc }}
            </td>
            <td>
              {{ book.soquyen }}
            </td>
            <td v-if="getRole == 'NV' || getRole == 'QL'">
              {{ book.dongia }}
            </td>
            <td>
              <!-- Nút hiển thị modal -->
              <button class="btn btn-info" @click="showBookDetails(book)">
                <i class="fa fa-eye"></i> <!-- Bootstrap icon hình con mắt -->
              </button>
            </td>
          </tr>
        </template>
      </tbody>
    </table>

    <!-- Modal hiển thị thông tin sách -->
    <div v-if="selectedBook" class="modal fade show d-block" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <!-- Phần đầu modal -->
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title">Thông Tin Chi Tiết Sách</h5>
            <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
          </div>
          <!-- Phần nội dung modal -->
          <div class="modal-body d-flex">
            <!-- Bên trái: Hình ảnh sách -->
            <div class="col-md-4 text-center">
              <img v-if="selectedBook.hinhsach" :src="selectedBook.hinhsach" alt="Hình bìa sách"
                class="img-modal border border-dark" style="max-width: 100%; object-fit: contain;" />
            </div>
            <!-- Bên phải: Thông tin sách -->
            <div class="col-md-8">
              <p><strong>Mã sách:</strong> {{ selectedBook.masach }}</p>
              <p><strong>Tên sách:</strong> {{ selectedBook.tensach }}</p>
              <p><strong>Năm xuất bản:</strong> {{ selectedBook.namxuatban }}</p>
              <p><strong>Tác giả:</strong> {{ selectedBook.tacgia_nguongoc }}</p>
              <p><strong>Số quyển:</strong> {{ selectedBook.soquyen }}</p>
              <p v-if="getRole == 'NV' || getRole == 'QL'"><strong>Đơn giá:</strong> {{ selectedBook.dongia }}</p>
              <!-- Mô tả: Cho phép cuộn nếu nội dung dài -->
              <p><strong>Mô tả: </strong></p>
              <div class="scrollable-description">
                {{ selectedBook.mota }}
              </div>
            </div>
          </div>
          <!-- Phần footer modal -->
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Đóng</button>
          </div>
        </div>
      </div>
    </div>

    <Paging @changeCurrentPage="changeCurrentPage" :totalElement="books.length" :numberPerPage="numberPerPage"></Paging>
  </div>
</template>
<script>
import sachService from '@/services/sach.service'
import Paging from './Paging.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    Paging,
  },
  data() {
    return {
      books: [],
      numberPerPage: 4,
      currentPage: 1,
      searchKey: '',
      loading: true,
      selectedBook: null,
    }
  },
  async created() {
    try {
      this.loading = true
      this.books = await sachService.getAll()
    } catch (error) {
      alert('Có lỗi xảy ra vui lòng thử lại sau')
    } finally {
      this.loading = false
    }
  },
  methods: {
    changeCurrentPage(page) {
      this.currentPage = page
    },
    goToEdit(id) {
      this.$router.push(`/book/edit/${id}`)
    },
    async search() {
      this.loading = true
      this.books = await sachService.getAll(this.searchKey)
      this.changeCurrentPage(1)
      this.loading = false
    },
    showBookDetails(book) {
      this.selectedBook = book // Hiển thị sách trong modal
    },
    closeModal() {
      this.selectedBook = null // Đóng modal
    },
  },
  computed: {
    bookShow() {
      const from = (this.currentPage - 1) * this.numberPerPage
      const to = this.currentPage * this.numberPerPage
      let bookShow = this.books.slice(from, to)
      return bookShow
    },

    ...mapGetters(['getRole']),
  },
}
</script>
<style scoped>
tr {
  cursor: pointer;
}

.img-fluid {
  max-width: 100px;
  max-height: 100px;
  object-fit: contain;
  border: 1px solid #ccc;
}

.modal {
  background-color: rgba(0, 0, 0, 0.5);
  /* Làm tối nền khi hiển thị modal */
}

.modal-content {
  border-radius: 8px;
}

.img-modal {
  border-radius: 10px;
}

.modal-body {
  display: flex;
  gap: 20px;
}

.modal-lg {
  max-width: 900px;
}
</style>