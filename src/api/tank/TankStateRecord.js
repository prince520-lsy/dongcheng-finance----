import request from '@/utils/request'

/*
*
*tank 为模块名   TankStateRecord为表名 也就是业务名
*/



//查询列表api
 export function TankStateRecordQuery(parameter) {
    return request({
      url: '/tank/tank_state_record' ,
      method: 'get',
      params: parameter
    })
  }



  //增加api
 export function TankStateRecordAdd(parameter) {
  return request({
    url: '/tank/tank_state_record' ,
    method: 'post',
    data: parameter
  })
}


//更新api
export function TankStateRecordUpdate(parameter) {
  return request({
    url: '/tank/tank_state_record' ,
    method: 'put',
    data: parameter
  })
}

//删除api
export function TankStateRecordDelete(id) {
  return request({
    url: '/tank/tank_state_record/'+id,
    method: 'delete',
  })
}



  


