import request from '@/utils/request'

/*
*
*tank 为模块名   Diagnosis为表名 也就是业务名
*/



//查询列表api
 export function DiagnosisQuery(parameter) {
    return request({
      url: '/tank/diagnosis' ,
      method: 'get',
      params: parameter
    })
  }



//诊断api
 export function updateDiagnosis(parameter) {
    return request({
      url: '/tank/diagnosis/updateDiagnosis' ,
      method: 'post',
      data: parameter
    })
  }
	
	
//采纳api
 export function updateDiagnosisByAdopt(parameter) {
    return request({
      url: '/tank/diagnosis/updateDiagnosisByAdopt' ,
      method: 'post',
      data: parameter
    })
  }





  //增加api
 export function DiagnosisAdd(parameter) {
  return request({
    url: '/tank/diagnosis/add' ,
    method: 'post',
    data: parameter
  })
}


//更新api
export function DiagnosisUpdate(parameter) {
  return request({
    url: '/tank/diagnosis' ,
    method: 'put',
    data: parameter
  })
}

//删除api
export function DiagnosisDelete(id) {
  return request({
    url: '/tank/diagnosis/'+id,
    method: 'delete',
  })
}


//
export function FactoryTree() {
  return request({
    url: '/tank/diagnosis/getFactoryList',
    method: 'get',
  })
}

//专家
export function ExpertUserList() {
  return request({
    url: '/tank/diagnosis/getExpertUserList',
    method: 'get',
  })
}

//模板
export function TemplateList() {
  return request({
    url: '/tank/diagnosis/getTemplateList',
    method: 'get',
  })
}







  


