import Vuex from 'vuex';

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
    showNavbarAndFooter: true,
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setUser(state, user) {
      state.user = user
    },
    clearAuthData(state) {
      state.token = null
      state.user = null
    },
    // Mutation cập nhật thông tin người dùng
    updateUserInfo(state, updatedUser) {
      state.user = { ...state.user, ...updatedUser }
      localStorage.setItem('user', JSON.stringify(state.user))
    },
    setVisibility(state, isVisible) {
      // Mutation để cập nhật trạng thái hiển thị
      state.showNavbarAndFooter = isVisible
    },
  },
  actions: {
    login({ commit }, authData) {
      commit('setToken', authData.token)
      commit('setUser', authData.user)

      // Lưu token và user vào localStorage
      localStorage.setItem('token', authData.token)
      localStorage.setItem('user', JSON.stringify(authData.user))
    },
    logout({ commit }) {
      commit('clearAuthData')
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
    // Action cập nhật thông tin người dùng
    updateUser({ commit }, updatedUser) {
      commit('updateUserInfo', updatedUser)
    },
    toggleVisibility({ commit }, isVisible) {
      // Action để thay đổi trạng thái hiển thị
      commit('setVisibility', isVisible)
    },
  },
  getters: {
    isAuthenticated(state) {
      return !!state.token
    },
    getUser(state) {
      if (!state.user) {
        return null
      }
      return state.user
    },
    getRole(state) {
      if (state.user) {
        if (state.user.madocgia) {
          return 'ĐG'
        }
        if (state.user.chucvu) {
          return state.user.chucvu === 'Quản lý' ? 'QL' : 'NV'
        }
      }

      return null
    },
    showNavbarAndFooter(state) {
      return state.showNavbarAndFooter // Getter để lấy trạng thái hiển thị
    },
  },
})
