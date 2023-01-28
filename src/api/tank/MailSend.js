import request from '@/utils/request'

/*
*
*tank 为模块名   MailSend为表名 也就是业务名
*/



//查询列表api
 export function MailSendQuery(parameter) {
    return request({
      url: '/tank/mail_send' ,
      method: 'get',
      params: parameter
    })
  }



  //增加api
 export function MailSendAdd(parameter) {
  return request({
    url: '/tank/mail_send' ,
    method: 'post',
    data: parameter
  })
}


//更新api
export function MailSendUpdate(parameter) {
  return request({
    url: '/tank/mail_send' ,
    method: 'put',
    data: parameter
  })
}

//删除api
export function MailSendDelete(id) {
  return request({
    url: '/tank/mail_send/'+id,
    method: 'delete',
  })
}



  


