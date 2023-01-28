import axios from 'axios'
import store from '@/store'
import storage from 'store'
import router from '../router'
import notification from 'ant-design-vue/es/notification'
import { VueAxios } from './axios'
import { ACCESS_TOKEN, LOGIN_KEY } from '@/store/mutation-types'

// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 60000 // 请求超时时间
})

// 异常拦截处理器
const errorHandler = (error) => {
  if (error.response) {
    const data = error.response.data
    // 从 localstorage 获取 token
    const token = storage.get(ACCESS_TOKEN)
    if(error.response.status==400){
      notification.warning({
        message: '警告',
        description: '请求出错,请检查参数'
      })
    }
    if (error.response.status === 500) {
      // router.push({ path: '/500' })
      notification.warning({
        message: '警告',
        description: '请求出错,请检查参数'
      })
    }
    if (data.code === -1 ) {
      console.log('退出3')
      notification.error({
        message: '登录失效',
        description: '登录失效，请重新登录'
      })
      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            console.log('退出2')
            // window.location.reload()
          }, 1500)
        })
      }
    }
  }
  return Promise.reject(error)
}

// request interceptor
request.interceptors.request.use(config => {
  const token = storage.get(ACCESS_TOKEN)
  
  // 如果 token 存在
  // 让每个请求携带自定义 token 请根据实际情况自行修改
  if (token) {
    // config.headers['Token'] = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJxSnIyZmoxOENhV1JjUjVNc1RUS2E5ZnhQWmRtU2w2ZSIsImF1ZCI6IiIsImlhdCI6MTYyNjA3MTgyNCwibmJmIjoxNjI2MDcxODI0LCJleHAiOjE2MjYwNzkwMjQsImRhdGEiOnsiYWRtaW5faWQiOjEsImVudGVycHJpc2VfaWQiOjAsInVzZXJuYW1lIjoiYWRtaW4ifX0.ndNGKMxjmv-kj_avwjZ6hWqd8o14CEIqm-I9FZW3ras'
    config.headers['Token'] = token
  }
  return config
}, errorHandler)

// response interceptor
request.interceptors.response.use((response) => {
  
  const loginKey = storage.get(LOGIN_KEY)
  console.log('loginKey====',loginKey)
  // debugger
  if(response.data.code&&response.data.code!=1){

 
    if(response.data.code==403){
      notification.error({
        message: '权限不足',
        description: '您沒有相关权限'
      })
      router.push({ path: '/403' })
    }
    if(response.data.code==500){
			notification.error({
				message: '错误',
				description: response.data.message
			})
      // router.push({ path: '/500' })
    }
    
    if(response.data.code==-1){
      console.log('loginKey===222=',loginKey)
      location.href ='https://cw.huiningtech.com/qtsXbxopFG/login/index?loginKey='+loginKey
    	notification.error({
    	  message: '登录失效',
    	  description: '登录失效，请重新登录'
    	})
      storage.remove(ACCESS_TOKEN)
      // storage.remove(LOGIN_KEY)
      setTimeout(() => {
        console.log('退出')
        // window.location.reload()
      }, 1500)
      // router.push({ path: '/500' })
    }
   
    
    return Promise.reject(response)
  }
  if(response.config.responseType=='blob'){
    return response
  }
  return response.data
}, errorHandler)

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, request)
  }
}

export default request

export {
  installer as VueAxios,
  request as axios
}
