import request from '@/utils/request'

/*
*
*tank 为模块名   CameraRecord为表名 也就是业务名
*/



//查询列表api
 export function CameraRecordQuery(parameter) {
    return request({
      url: '/tank/camera_record' ,
      method: 'get',
      params: parameter
    })
  }



  //增加api
 export function CameraRecordAdd(parameter) {
  return request({
    url: '/tank/camera_record' ,
    method: 'post',
    data: parameter
  })
}


//更新api
export function CameraRecordUpdate(parameter) {
  return request({
    url: '/tank/camera_record' ,
    method: 'put',
    data: parameter
  })
}

//删除api
export function CameraRecordDelete(id) {
  return request({
    url: '/tank/camera_record/'+id,
    method: 'delete',
  })
}



  


