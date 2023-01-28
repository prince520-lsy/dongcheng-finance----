import request from '@/utils/request'

/*
*
*tank 为模块名   DeviceSensorHumiture为表名 也就是业务名
*/



//查询列表api
 export function DeviceSensorHumitureQuery(parameter) {
    return request({
      url: '/tank/device_sensor_humiture' ,
      method: 'get',
      params: parameter
    })
  }



  //增加api
 export function DeviceSensorHumitureAdd(parameter) {
  return request({
    url: '/tank/device_sensor_humiture' ,
    method: 'post',
    data: parameter
  })
}


//更新api
export function DeviceSensorHumitureUpdate(parameter) {
  return request({
    url: '/tank/device_sensor_humiture' ,
    method: 'put',
    data: parameter
  })
}

//删除api
export function DeviceSensorHumitureDelete(id) {
  return request({
    url: '/tank/device_sensor_humiture/'+id,
    method: 'delete',
  })
}



  


