<template>
  <div class="mb-5" v-if="staff">
    <h1 class="py-5 text-center"><b>QUẢN LÝ THÔNG TIN CÁ NHÂN</b></h1>
    <h5 v-if="message" class="text-primary text-center">{{ message }}</h5>
    <StaffForm :staff="staff" @edit:staff="editStaff" />
  </div>
</template>
<script>
import StaffForm from '@/components/Forms/StaffForm.vue'
import nhanvienService from '@/services/nhanvien.service'
export default {
  props: {
    id: { type: String, required: true },
  },
  components: {
    StaffForm,
  },
  data() {
    return {
      staff: null,
      message: '',
    }
  },
  computed: {
    userId() {
      return this.$store.getters.getUser?._id
    },
  },
  methods: {
    async editStaff(updatedStaff) {
      try {
        const result = await nhanvienService.update(this.id, updatedStaff)
        if (result) {
          if (result.errorMessage) {
            return (this.message = result.errorMessage)
          }

          // Cập nhật thông tin trong Vuex
          this.$store.dispatch('updateUser', updatedStaff)

          this.message = 'Cập nhật thành công thông tin cá nhân'
          await this.getStaff()
          //return (this.message = 'Cập nhật thành công thông tin cá nhân')
        } else {
          alert('Có lỗi xảy ra vui lòng thử lại sau')
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
    async getStaff() {
      try {
        this.staff = await nhanvienService.get(this.id)
        console.log(this.staff)
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
  },
  created() {
    this.getStaff()
  },
}
</script>

<style></style>
