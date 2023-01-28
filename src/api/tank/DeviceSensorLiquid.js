import {request} from '@/utils/request'

/*
*
*tank 为模块名   DeviceSensorLiquid为表名 也就是业务名
*/



//查询列表api
 export function DeviceSensorLiquidQuery(parameter) {
    return request({
      url: '/tank/device_sensor_liquid' ,
      method: 'get',
      params: parameter
    })
  }



  //增加api
 export function DeviceSensorLiquidAdd(parameter) {
  return request({
    url: '/tank/device_sensor_liquid' ,
    method: 'post',
    data: parameter
  })
}


//更新api
export function DeviceSensorLiquidUpdate(parameter) {
  return request({
    url: '/tank/device_sensor_liquid' ,
    method: 'put',
    data: parameter
  })
}

//删除api
export function DeviceSensorLiquidDelete(id) {
  return request({
    url: '/tank/device_sensor_liquid/'+id,
    method: 'delete',
  })
}



  


