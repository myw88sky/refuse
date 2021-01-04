import Vue from 'vue'
import App from './App'

//消息组件
import '@/common/msg.js'
import dayjs from 'dayjs'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
