import {request} from '@/utils/request'

/*
*
*tank 为模块名   DeviceSensorPressure为表名 也就是业务名
*/



//查询列表api
 export function DeviceSensorPressureQuery(parameter) {
    return request({
      url: '/tank/device_sensor_pressure' ,
      method: 'get',
      params: parameter
    })
  }



  //增加api
 export function DeviceSensorPressureAdd(parameter) {
  return request({
    url: '/tank/device_sensor_pressure' ,
    method: 'post',
    data: parameter
  })
}


//更新api
export function DeviceSensorPressureUpdate(parameter) {
  return request({
    url: '/tank/device_sensor_pressure' ,
    method: 'put',
    data: parameter
  })
}

//删除api
export function DeviceSensorPressureDelete(id) {
  return request({
    url: '/tank/device_sensor_pressure/'+id,
    method: 'delete',
  })
}



  


