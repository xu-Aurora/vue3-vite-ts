import { useRouter } from 'vue-router'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { Notify, Toast } from 'vant'
import { ComponentInstance } from 'vant/lib/utils'

const router = useRouter()

const instance = axios.create({
  baseURL: import.meta.env.VITE_API as string,
  timeout: 1000 * 15
})

let loading: ComponentInstance

// 防止多次请求loading重复加载
let loadingNum = 0
function startLoading() {
  if (loadingNum === 0) {
    loading = Toast.loading({
      duration: 0,
      loadingType: 'spinner'
    })
  }
  loadingNum++
}
function endLoading() {
  loadingNum--
  if (loadingNum <= 0) {
    loading.clear()
  }
}

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const erroeHandle = (status: number, other: string) => {
  switch (status) {
    case 401:
      Notify({
        type: 'warning',
        message: other
      })
      router.replace('/login')
      break
    case 403:
      Notify({
        type: 'warning',
        message: other
      })
      router.replace('/login')
      break
  }
}

// 请求拦截
instance.interceptors.request.use((config: AxiosRequestConfig) => {
  const { method } = config

  // 请求头添加token
  const headers: any = {
    token: ''
  }

  // 不缓存get请求
  if (method === 'get') {
    headers['Cache-Control'] = 'no-cache'
  }

  startLoading()

  return {
    ...config,
    headers
  }
})

// 响应拦截
instance.interceptors.response.use(
  (res: AxiosResponse<any>) => {
    const { status, data } = res

    if (status === 200) {
      Promise.resolve(res)
    } else {
      Promise.reject(res)

      router.replace('/login')
    }

    endLoading()

    return data
  },
  error => {
    const { response } = error

    endLoading()

    if (response) {
      erroeHandle(response.status, response.msg)
      return Promise.reject(error)
    } else {
      Toast.fail('没有网络!')
    }
  }
)

export default instance
