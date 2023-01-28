import request from '@/utils/request'

/*
*
*tank 为模块名   Notice为表名 也就是业务名
*/



//查询列表api
 export function NoticeQuery(parameter) {
    return request({
      url: '/tank/notice' ,
      method: 'get',
      params: parameter
    })
  }



  //增加api
 export function NoticeAdd(parameter) {
  return request({
    url: '/tank/notice/addNoticeVo' ,
    method: 'post',
    data: parameter
  })
}


//更新api
export function NoticeUpdate(parameter) {
  return request({
    url: '/tank/notice' ,
    method: 'put',
    data: parameter
  })
}

//删除api
export function NoticeDelete(id) {
  return request({
    url: '/tank/notice/'+id,
    method: 'delete',
  })
}



  


