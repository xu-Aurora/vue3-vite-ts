<template>
  <div>
    <h1>Vuex页面</h1>
    <div>state值: {{ myUser.count }}</div>
    <van-button @click="add">增加</van-button>
    <van-button @click="cut">减少</van-button>
  </div>
</template>

<script lang="ts" setup>
import user from '@/store/user'

const myUser = user()

const add = () => {
  myUser.add()
}

const cut = () => {
  myUser.cut()
}
</script>
