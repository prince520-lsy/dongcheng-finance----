import request from '@/utils/request'

/*
*
*tank 为模块名   DeviceCamera为表名 也就是业务名
*/



//查询列表api
 export function DeviceCameraQuery(parameter) {
    return request({
      url: '/tank/device_camera' ,
      method: 'get',
      params: parameter
    })
  }



  //增加api
 export function DeviceCameraAdd(parameter) {
  return request({
    url: '/tank/device_camera' ,
    method: 'post',
    data: parameter
  })
}


//更新api
export function DeviceCameraUpdate(parameter) {
  return request({
    url: '/tank/device_camera' ,
    method: 'put',
    data: parameter
  })
}

//删除api
export function DeviceCameraDelete(id) {
  return request({
    url: '/tank/device_camera/'+id,
    method: 'delete',
  })
}



  


