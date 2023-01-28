import request from '@/utils/request'

/*
*
*tank 为模块名   OilTank为表名 也就是业务名
*/



//查询列表api
 export function OilTankQuery(parameter) {
    return request({
      url: '/tank/oil_tank' ,
      method: 'get',
      params: parameter
    })
  }



  //增加api
 export function OilTankAdd(parameter) {
  return request({
    url: '/tank/oil_tank' ,
    method: 'post',
    data: parameter
  })
}

export function OilTankQueryByArea(parameter) {
  return request({
    url: '/tank/oil_tank/listByArea' ,
    method: 'get',
    params: parameter
  })
}

export function OilTankQueryBind(parameter) {
  return request({
    url: '/tank/oil_tank/bind/list' ,
    method: 'get',
    params: parameter
  })
}




//更新api
export function OilTankUpdate(parameter) {
  return request({
    url: '/tank/oil_tank' ,
    method: 'put',
    data: parameter
  })
}

//删除api
export function OilTankDelete(id) {
  return request({
    url: '/tank/oil_tank/'+id,
    method: 'delete',
  })
}



  


