import storage from 'store'
import { login, getInfo, logout,getToken } from '@/api/login'
import { ACCESS_TOKEN, USER_INFO } from '@/store/mutation-types'
import { welcome } from '@/utils/util'

const user = {
  state: {
    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJxSnIyZmoxOENhV1JjUjVNc1RUS2E5ZnhQWmRtU2w2ZSIsImF1ZCI6IiIsImlhdCI6MTY3NDg4NTY2NSwibmJmIjoxNjc0ODg1NjY1LCJleHAiOjE2NzQ4OTI4NjUsImRhdGEiOnsiYWRtaW5faWQiOjcsImVudGVycHJpc2VfaWQiOjUsInVzZXJuYW1lIjoiMDA5In19.OT3kbWFc9X9AbJzN1ICiBgNE1DuI9nIUCrLQr0unh_s',
    name: '中大公司',
    welcome: '',
    avatar: 'https://img0.baidu.com/it/u=251289958,1860898046&fm=26&fmt=auto&gp=0.jpg',
    roles: [],
    info: {
      name:'009',
      avatar:'https://img0.baidu.com/it/u=251289958,1860898046&fm=26&fmt=auto&gp=0.jpg'
    },
    selectType:{
      type:'',
      branch:[] ,
      time:'', // 
    }, // 筛选类型
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
        state.name = name
        state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
    },
    SET_INFO: (state, info) => {
        state.info = info
    },
    SET_ACTIONS: (state, actions) =>{
        state.actions = actions
    }
  },

  actions: {
    getToken ({ commit,state}, userInfo) {
      return new Promise((resolve, reject) => {
        getToken({}).then(response => {
          const result = response.result
          // debugger
          console.log(52,response.data);
          storage.set(ACCESS_TOKEN, response.data.token, 2 * 60 * 60 * 1000)
          let info = JSON.stringify({ ...state.info ,name:response.data.username})
          storage.set(USER_INFO, info)
          commit('SET_TOKEN', response.data.token)
          commit('SET_INFO', { ...state.info ,name:response.data.username})
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登录
    Login ({ commit,state}, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          const result = response.result
          console.log(68,result);
          storage.set(ACCESS_TOKEN, response.data.token, 2 * 60 * 60 * 1000) //7 * 24 * 60 * 60 * 1000
          let info = JSON.stringify({ ...state.info ,name:response.data.username})
          storage.set(USER_INFO, info)
          commit('SET_TOKEN', response.data.token)
          commit('SET_INFO', { ...state.info ,name:response.data.username})
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const result = response.data
          console.log(87,result);
          commit('SET_ROLES', result.roles)
          commit('SET_ACTIONS', result.functions)
          commit('SET_INFO', result)
          commit('SET_NAME', { name: result.name, welcome: welcome() })
          commit('SET_AVATAR', result.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    Logout ({ commit, state }) {
      return new Promise((resolve) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          storage.remove(ACCESS_TOKEN)
          storage.remove(USER_INFO)
          resolve()
        }).catch(() => {
          resolve()
        }).finally(() => {
        })
      })
    }

  }
}

export default user
