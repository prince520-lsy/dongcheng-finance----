import request from '@/utils/request'

const userApi = {
  Login: '/login/index',
  Logout: '/login/out',
  UserInfo: '/auth/user/info',
  UserMenu: '/auth/user/nav',
  GetCaptcha: '/captcha/get',
  CheckCaptcha: '/captcha/check',
  Register: '/auth/register',
  SendVerificationCode: '/auth/sendVerificationCode'
}

export function login(parameter) {
  return request({
      url: userApi.Login,
      method: 'post',
      data: parameter
  })
}


export function getToken() {
  return request({
      url: '/index/index',
      method: 'get',
  })
}


export function getInfo() {
  return request({
      url: userApi.UserInfo,
      method: 'get',
      headers: {
          'Content-Type': 'application/json;charset=UTF-8'
      }
  })
}

export function getCurrentUserNav() {
  return request({
      url: userApi.UserMenu,
      method: 'get'
  })
}

export function logout() {
  return request({
      url: userApi.Logout,
      method: 'post',
      headers: {
          'Content-Type': 'application/json;charset=UTF-8'
      }
  })
}

export function reqGet(data) {
  return request({
      url: userApi.GetCaptcha,
      method: 'post',
      data
  })
}

export function reqCheck(data) {
  return request({
      url: userApi.CheckCaptcha,
      method: 'post',
      data
  })
}

export function getSmsCaptcha() {
  return ''
}

// 注册
export function register(data) {
  return request({
      url: userApi.Register,
      method: 'post',
      data
  })
}

// 验证码
export function VerificationCode(data) {
  return request({
      url: userApi.SendVerificationCode,
      method: 'post',
      data
  })
}


// 获取单位列表
export function OrganizationList(data) {
  return request({
      url: `/platform/user/getOrganizationList`,
      method: 'post',
      data
  })
}

// 修改密码
export function ChangePassword(parameter) {
  return request({
      url: `/auth/changePassword`,
      method: 'put',
      params: parameter
  })
}

// 重置密码
export function ResetPassword(parameter) {
  return request({
      url: `/auth/resetPassword`,
      method: 'put',
      params: parameter
  })
}