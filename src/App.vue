<template>
  <div class="app">
    <header v-if="showNavbarAndFooter" class="">
      <Navbar></Navbar>
    </header>
    <footer v-if="showNavbarAndFooter">
      <Footer></Footer>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Navbar from '@/components/Layout/Navbar.vue'
import Footer from '@/components/Layout/Footer.vue'

export default {
  components: { Navbar, Footer },
  computed: {
    ...mapGetters(['showNavbarAndFooter']), // Lấy trạng thái từ Vuex Store
  },
};
</script>

<style scoped></style>

