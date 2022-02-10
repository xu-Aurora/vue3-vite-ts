<template>
  <div id="app">
    <router-view />
  </div>
</template>


<script lang="ts" setup>
  import nProgress from 'nprogress'
  import customStorage from '@/utils/customStorage'

  // NProgress配置
  nProgress.configure({ 
    showSpinner: false,
    easing: 'ease', // 运行动画
    speed: 500, // 动画速度
  }) 
  
  const router = useRouter()

  // 路由守卫
  router.beforeEach((to, from, next) => {
    if (!nProgress.isStarted()) {
      nProgress.start()
    }

    next()
    // if (to.path === '/login') {
    //   next()
    // } else {
    //   if (customStorage.getItem('token')) {
    //     next()
    //   } else {
    //     next('/login')
    //     nProgress.done()
    //   }
    // }
  })

  router.afterEach(() => {
    nProgress.done()
  })
</script>


<style lang="less">
  @import './assets/css/reset.less';
</style>
