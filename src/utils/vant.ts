import { App } from 'vue'
import { Button, Notify, Toast } from 'vant'

Toast.setDefaultOptions({
  forbidClick: true
})

const plugins = [
  Button, 
  Notify, 
  Toast
]

const vants = {
  install: (app: App) => {
    plugins.forEach(item => {
      app.component(item.name, item)
    })
  }
}

export default vants
