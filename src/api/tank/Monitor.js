import request from '@/utils/request'

// 监测中心


//查询统计信息
export function LiveStatQuery(parameter) {
    return request({
      url: '/tank/liveStat' ,
      method: 'get',
      params: parameter
    })
  }

//监测地图
  export function HomeMap(parameter) {
    return request({
      url: '/tank/map/show' ,
      method: 'get',
      params: parameter
    })
  }

  //检测对象
  export function HomeObj(parameter) {
    return request({
      url: '/tank/map/obj' ,
      method: 'get',
      params: parameter
    })
  }

  export function queryDevice(parameter) {
    return request({
      url: '/tank/liveStat/queryDevice' ,
      method: 'get',
      params: parameter
    })
  }

 
 
 
 //监控设备 录播记录列表
 export function CameraRecord(parameter) {
     return request({
       url: '/tank/camera_record' ,
       method: 'get',
       params: parameter
     })
}

 //监控设备 录播记录视频详情
 export function CameraDetail(parameter) {
     return request({
       url: '/tank/camera_record/getCameraRecord' ,
       method: 'get',
       params: parameter
     })
}
