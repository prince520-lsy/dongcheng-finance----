import request from '@/utils/request'

/*
*
*tank 为模块名   Explain为表名 也就是业务名
*/



//查询列表api
 export function ExplainQuery(parameter) {
    return request({
      url: '/tank/explain' ,
      method: 'get',
      params: parameter
    })
  }



  //增加api
 export function ExplainAdd(parameter) {
  return request({
    url: '/tank/explain' ,
    method: 'post',
    data: parameter
  })
}


//更新api
export function ExplainUpdate(parameter) {
  return request({
    url: '/tank/explain' ,
    method: 'put',
    data: parameter
  })
}

//删除api
export function ExplainDelete(id) {
  return request({
    url: '/tank/explain/'+id,
    method: 'delete',
  })
}



  


