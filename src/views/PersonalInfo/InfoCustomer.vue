<template>
  <div class="mb-5" v-if="customer">
    <h1 class="py-5 text-center">QUẢN LÝ THÔNG TIN CÁ NHÂN</h1>
    <h5 v-if="message" class="text-center text-success">{{ message }}</h5>
    <CustomerForm :customer="customer" @submit:customer="changeInfo" />
  </div>
</template>

<script>
import CustomerForm from '@/components/Forms/CustomerForm.vue'
import docgiaService from '@/services/docgia.service'
export default {
  components: {
    CustomerForm,
  },
  data() {
    return {
      message: '',
      customer: null,
    }
  },
  computed: {
    userId() {
      return this.$store.getters.getUser?._id
    },
  },
  methods: {
    async getCustomer() {
      try {
        this.customer = await docgiaService.get(
          JSON.parse(localStorage.getItem('user'))._id,
        )
      } catch (error) {
        alert('Có lỗi xảy ra vui lòng thử lại sau')
      }
    },
    async changeInfo(newInfo) {
      delete newInfo.password

      try {
        const result = await docgiaService.update(
          JSON.parse(localStorage.getItem('user'))._id,
          newInfo,
        )
        if (result) {
          this.message = 'Cập nhật thông tin thành công'
          // Cập nhật thông tin trong Vuex (đồng bộ navbar)
          this.$store.dispatch('updateUser', newInfo)
          this.getCustomer()
        }

        // Xóa thông báo sau 3 giây
        setTimeout(() => {
          this.message = ''
        }, 3000)
      } catch (error) {
        console.error('Lỗi cập nhật thông tin:', error)
        alert('Có lỗi xảy ra vui lòng thử lại sau')
      }
    },
  },
  created() {
    this.getCustomer()
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
