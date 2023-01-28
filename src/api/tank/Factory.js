import request from '@/utils/request'

/*
*
*tank 为模块名   Factory为表名 也就是业务名
*/



//查询列表api
 export function FactoryQuery(parameter) {
    return request({
      url: '/tank/factory' ,
      method: 'get',
      params: parameter
    })
  }


  //获取所有厂区
 export function FactoryQueryAll() {
  return request({
    url: '/tank/factory/listAll' ,
    method: 'get'
  })
}


  



  //增加api
 export function FactoryAdd(parameter) {
  return request({
    url: '/tank/factory' ,
    method: 'post',
    data: parameter
  })
}


//更新api
export function FactoryUpdate(parameter) {
  return request({
    url: '/tank/factory' ,
    method: 'put',
    data: parameter
  })
}

//删除api
export function FactoryDelete(id) {
  return request({
    url: '/tank/factory/'+id,
    method: 'delete',
  })
}



  


