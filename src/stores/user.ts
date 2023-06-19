import { defineStore, acceptHMRUpdate } from 'pinia'

const useUser = defineStore('user', {
  state: () => {
    return {
      name: '',
      avatar: '',
      isLogin: false
    }
  },
  actions: {
    login() {
      this.$patch({
        name: '风清扬',
        avatar: '',
        isLogin: true
      })
    },
    logout() {
      this.$patch({
        name: '',
        avatar: '',
        isLogin: false
      })
    }
  }
})

export default useUser

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUser, import.meta.hot))
}