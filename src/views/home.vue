<template>
  <div>
    <div>Home</div>
    <div>{{ date('2021-02-01') }}</div>
    <van-button @click="goPgae">页面跳转</van-button>

    <van-button v-throttle="throttle">throttle</van-button>

  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { formatDate } from '@/utils'

export default defineComponent({
  name: 'Home',
  setup() {
    const router = useRouter()
    
    const state = reactive({
      date(val: string) { 
        return formatDate(val)
      }
    })

    const goPgae = () => {
      router.push('/vuex')
    }

    const throttle = () => {
      console.log('throttle')
    }

    return {
      ...toRefs(state),
      goPgae,
      throttle
    }
  }
})
</script>
