import request from '@/utils/request'

/*
*
*tank 为模块名   SystemUser为表名 也就是业务名
*/



//查询列表api
 export function SystemUserQuery(parameter) {
    return request({
      url: '/platform/user' ,
      method: 'get',
      params: parameter
    })
  }



  //增加api
 export function SystemUserAdd(parameter) {
  return request({
    url: '/platform/user/add' ,
    method: 'post',
    data: parameter
  })
}


//更新api
export function SystemUserUpdate(parameter) {
  return request({
    url: '/platform/user/edit' ,
    method: 'post',
    data: parameter
  })
}

//删除api
export function SystemUserDelete(id) {
  return request({
    url: '/platform/user/'+id,
    method: 'delete',
  })
}

//审核单位账户
export function ExamineUserInfo(parameter) {
  return request({
    url: '/platform/user/examineUserInfo' ,
    method: 'post',
    data: parameter
  })
}

//审核员工账户
export function YuanUserInfo(parameter) {
  return request({
    url: '/platform/user/yuanUserInfo' ,
    method: 'post',
    data: parameter
  })
}

//提供单位信息
export function getOrganizationList(parameter) {
  return request({
    url: '/platform/user/listAll' ,
    method: 'post',
    data: parameter
  })
}

//获取用户列表,筛选框专属
export function UserList(parameter) {
  return request({
    url: '/platform/user/listEmployee' ,
    method: 'get',
    params: parameter
  })
}