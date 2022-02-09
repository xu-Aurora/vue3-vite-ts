import { defineStore } from 'pinia'

const user = defineStore({
  id: 'user',
  state: () => ({
    count: 0
  }),
  actions: {
    add() {
      this.count += 1
    },
    cut() {
      this.count -= 1
    }
  }
})

export default user