<template>
  <div>
    <h1>父组件:</h1>
    <div>
      接受子组件的值: {{ childVal }}
    </div>

    <Child :msg="parentVal" @childClick='childClick' />
  </div>
</template>

<script lang="ts" setup>
  import Child from './child.vue'

  const parentVal = ref('父组件的值')
  const childVal = ref('132')

  const childClick = (val: string) => {
    childVal.value = val
  }

</script>

<!-- <script lang="ts">
import { defineComponent, ref } from 'vue'
import Child from './child.vue'

/**
 * 父子组件传值
*/
export default defineComponent({
  components: {
    Child
  },
  setup() {
    const parentVal = ref('父组件的值')
    const childVal = ref('')

    const childClick = (val: string) => {
      childVal.value = val
    }

    return { 
      parentVal,
      childClick,
      childVal
    }
  }
})
</script> -->

