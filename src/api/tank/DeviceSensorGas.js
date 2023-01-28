import request from '@/utils/request'

/*
*
*tank 为模块名   DeviceSensorGas为表名 也就是业务名
*/



//查询列表api
 export function DeviceSensorGasQuery(parameter) {
    return request({
      url: '/tank/device_sensor_gas' ,
      method: 'get',
      params: parameter
    })
  }



  //增加api
 export function DeviceSensorGasAdd(parameter) {
  return request({
    url: '/tank/device_sensor_gas' ,
    method: 'post',
    data: parameter
  })
}


//更新api
export function DeviceSensorGasUpdate(parameter) {
  return request({
    url: '/tank/device_sensor_gas' ,
    method: 'put',
    data: parameter
  })
}

//删除api
export function DeviceSensorGasDelete(id) {
  return request({
    url: '/tank/device_sensor_gas/'+id,
    method: 'delete',
  })
}



  


