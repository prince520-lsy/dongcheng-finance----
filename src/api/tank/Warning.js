import request from '@/utils/request'

/*
*
*tank 为模块名   Warning为表名 也就是业务名
*/



//查询列表api
 export function WarningQuery(parameter) {
    return request({
      url: '/tank/warning' ,
      method: 'get',
      params: parameter
    })
  }



  //增加api
 export function WarningAdd(parameter) {
  return request({
    url: '/tank/warning' ,
    method: 'post',
    data: parameter
  })
}


//更新api
export function WarningUpdate(parameter) {
  return request({
    url: '/tank/warning' ,
    method: 'put',
    data: parameter
  })
}

//删除api
export function WarningDelete(id) {
  return request({
    url: '/tank/warning/'+id,
    method: 'delete',
  })
}



  


