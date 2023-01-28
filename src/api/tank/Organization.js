import request from '@/utils/request'

/*
*
*tank 为模块名   Organization为表名 也就是业务名
*/



//查询列表api
 export function OrganizationQuery(parameter) {
    return request({
      url: '/tank/organization' ,
      method: 'get',
      params: parameter
    })
  }



  //增加api
 export function OrganizationAdd(parameter) {
  return request({
    url: '/tank/organization' ,
    method: 'post',
    data: parameter
  })
}


//更新api
export function OrganizationUpdate(parameter) {
  return request({
    url: '/tank/organization' ,
    method: 'put',
    data: parameter
  })
}

//删除api
export function OrganizationDelete(id) {
  return request({
    url: '/tank/organization/'+id,
    method: 'delete',
  })
}



  


