import request from '@/utils/request'

/*
*
*tank 为模块名   Gateway为表名 也就是业务名
*/



//查询列表api
 export function GatewayQuery(parameter) {
    return request({
      url: '/tank/gateway' ,
      method: 'get',
      params: parameter
    })
  }



  //增加api
 export function GatewayAdd(parameter) {
  return request({
    url: '/tank/gateway' ,
    method: 'post',
    data: parameter
  })
}


//更新api
export function GatewayUpdate(parameter) {
  return request({
    url: '/tank/gateway' ,
    method: 'put',
    data: parameter
  })
}

//删除api
export function GatewayDelete(id) {
  return request({
    url: '/tank/gateway/'+id,
    method: 'delete',
  })
}



  


