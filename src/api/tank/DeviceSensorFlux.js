import request from '@/utils/request'

/*
*
*tank 为模块名   DeviceSensorFlux为表名 也就是业务名
*/



//查询列表api
 export function DeviceSensorFluxQuery(parameter) {
    return request({
      url: '/tank/device_sensor_flux' ,
      method: 'get',
      params: parameter
    })
  }



  //增加api
 export function DeviceSensorFluxAdd(parameter) {
  return request({
    url: '/tank/device_sensor_flux' ,
    method: 'post',
    data: parameter
  })
}


//更新api
export function DeviceSensorFluxUpdate(parameter) {
  return request({
    url: '/tank/device_sensor_flux' ,
    method: 'put',
    data: parameter
  })
}

//删除api
export function DeviceSensorFluxDelete(id) {
  return request({
    url: '/tank/device_sensor_flux/'+id,
    method: 'delete',
  })
}



  


