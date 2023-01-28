import request from '@/utils/request'

/*
*
*tank 为模块名   Template为表名 也就是业务名
*/



//查询列表api
 export function TemplateQuery(parameter) {
    return request({
      url: '/tank/template' ,
      method: 'get',
      params: parameter
    })
  }



  //增加api
 export function TemplateAdd(parameter) {
  return request({
    url: '/tank/template' ,
    method: 'post',
    data: parameter
  })
}


//更新api
export function TemplateUpdate(parameter) {
  return request({
    url: '/tank/template' ,
    method: 'put',
    data: parameter
  })
}

//删除api
export function TemplateDelete(id) {
  return request({
    url: '/tank/template/'+id,
    method: 'delete',
  })
}



  


