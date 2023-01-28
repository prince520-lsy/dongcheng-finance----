import request from '@/utils/request'

/*
*
*tank 为模块名   Expert为表名 也就是业务名
*/



//查询列表api
 export function ExpertQuery(parameter) {
    return request({
      url: '/tank/expert' ,
      method: 'get',
      params: parameter
    })
  }



  //增加api
 export function ExpertAdd(parameter) {
  return request({
    url: '/tank/expert' ,
    method: 'post',
    data: parameter
  })
}


//更新api
export function ExpertUpdate(parameter) {
  return request({
    url: '/tank/expert' ,
    method: 'put',
    data: parameter
  })
}

//删除api
export function ExpertDelete(id) {
  return request({
    url: '/tank/expert/'+id,
    method: 'delete',
  })
}



  


