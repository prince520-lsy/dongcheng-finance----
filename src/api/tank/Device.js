import request from '@/utils/request'
import qs from 'qs'

/*
*
*tank 为模块名   Device为表名 也就是业务名
*/



//查询列表api
 export function DeviceQuery(parameter) {
    return request({
      url: '/tank/device' ,
      method: 'get',
      params: parameter
    })
  }



  //增加api
 export function DeviceAdd(parameter) {
  return request({
    url: '/tank/device' ,
    method: 'post',
    data: parameter
  })
}


//更新api
export function DeviceUpdate(parameter) {
  return request({
    url: '/tank/device' ,
    method: 'put',
    data: parameter
  })
}

//删除api
export function DeviceDelete(id) {
  return request({
    url: '/tank/device/'+id,
    method: 'delete',
  })
}

//油罐和设备绑定
export function DeviceBindByTank(parameter) {
  return request({
    url: '/tank/oil_tank/bind',
    method: 'post',
    data: qs.stringify(parameter),
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
  })
}

//解绑
export function DeviceUnbind(deviceId) {
  return request({
    url: '/tank/oil_tank/bind/relieve',
    method: 'post',
    data: qs.stringify({deviceId}),
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
  })
}

//获取可用设备
export function getDeviceByArea(parameter) {
  return request({
    url: '/tank/storage_area/listDevice',
    method: 'get',
    params: parameter
  })
}



//联动查询设备
export function SelectFilter(parameter) {
  return request({
    url: `/tank/storage_area/selectFilter`,
    method: 'get',
    params: parameter
  })
}


//获取诊断中心配置列表
export function GetConfig(parameter) {
  return request({
    url: `/tank/config`,
    method: 'get',
    params: parameter
  })
}

//更新诊断中心配置列表
export function UpdateConfig(parameter,data) {
  return request({
    url: `/tank/config`,
    method: 'put',
    params: parameter,
		data, 
		headers: { 'Content-Type': 'application/json' },
  })
}

//获取诊断中心有毒气体列表
export function GetGas(parameter) {
  return request({
    url: `/tank/config/gas`,
    method: 'get',
    params: parameter
  })
}

//更新诊断中心有毒气体列表
export function UpdateGas(parameter) {
  return request({
    url: `/tank/config/gas`,
    method: 'put',
    params: parameter
  })
}


//所有设备列表
export function FacilityQueryAll(parameter) {
  return request({
    url: `/tank/storage_area/selectFilter`,
    method: 'get',
    params: parameter
  })
}

//获取设备信息
export function DeviceInfo(parameter) {
  return request({
    url: `/tank/device/find`,
    method: 'get',
    params: parameter
  })
}




  


