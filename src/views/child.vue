<template>
  <div class="container">
    <h1 ref="foo">子组件:</h1>
    <van-button @click="dispatch">发送</van-button>
    <div class="parent">
      接受父组件的值: {{ props.msg }}
    </div>
  </div>
</template>


<!-- vue的setup语法糖写法 -->
<script lang="ts" setup>
  import { defineProps, defineEmits, ref, defineExpose } from 'vue'

  const color = ref('green')

  const props = defineProps<{
    msg: string
  }>()

  const emit = defineEmits(['childClick'])

  const dispatch = () => {
    emit('childClick', '子组件的值')
    color.value = 'red'
  }

  const foo = ref(null)

  // https://v3.cn.vuejs.org/api/sfc-script-setup.html#defineexpose
  defineExpose({
    foo
  })

</script>


<!-- <script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  emits: ['childClick'],
  props: {
    msg: {
      type: String,
      required: true
    }
  },
  setup(props, { emit }) {
    const state = reactive({
      parentVal: props.msg,
    })

    const emitFn = () => emit('childClick', '子组价的值')

    return { 
      ...toRefs(state),
      emitFn
    }
  }
})
</script> -->

<style scoped lang="less">
  h1 {
    margin-top: 30px;
  }

  // 深度选择器
  .container :deep(.van-button) {
    color: red;
  }

  // 动态class
  .parent {
    color: v-bind(color)
  }
</style>