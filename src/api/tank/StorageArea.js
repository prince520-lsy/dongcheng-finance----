import request from '@/utils/request'

/*
*
*tank 为模块名   StorageArea为表名 也就是业务名
*/



//查询列表api
 export function StorageAreaQuery(parameter) {
    return request({
      url: '/tank/storage_area' ,
      method: 'get',
      params: parameter
    })
  }



  //增加api
 export function StorageAreaAdd(parameter) {
  return request({
    url: '/tank/storage_area' ,
    method: 'post',
    data: parameter
  })
}



//查询列表api
export function StorageAreaQueryByFactory(parameter) {
  return request({
    url: '/tank/storage_area/listByFactory' ,
    method: 'get',
    params: parameter
  })
}



//更新api
export function StorageAreaUpdate(parameter) {
  return request({
    url: '/tank/storage_area' ,
    method: 'put',
    data: parameter
  })
}

//删除api
export function StorageAreaDelete(id) {
  return request({
    url: '/tank/storage_area/'+id,
    method: 'delete',
  })
}






  


