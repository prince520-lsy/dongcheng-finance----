import request from '@/utils/request';

// 筛选

// 财务分析分类
export const getFinancialAnalysisLevel = (parameter) => request({
  url: '/select/getFinancialAnalysisLevel',
  method: 'get',
  params: parameter
})

// 财务分析时间
export const getFinancialAnalysisTime = (parameter) => request({
  url: '/select/getFinancialAnalysisTime',
  method: 'get',
  params: parameter
})

// 经营指标分类
export const getOperationalIndicatorLevel = () => request({
  url: '/select/getOperationalIndicatorLevel',
  method: 'get'
})


//财务分析

// 资产负债表
export const assetsLiability = (data) => request({
  url: '/form/assetsLiability',
  method: 'post',
  data,
})

// 利润表
export const profit = (data) => request({
  url: '/form/profit',
  method: 'post',
  data,
})

// 现金流量表
export const cashFlow = (data) => request({
  url: '/form/cashFlow',
  method: 'post',
  data,
})

// 历年报表
export const allStatements = (data) => request({
  url: '/form/allStatements',
  method: 'post',
  data,
})




//指标分析

// 经营指标分析
export const indicatorAnalysis = (data) => request({
  url: '/indicator/indicatorAnalysis',
  method: 'post',
  data,
})



// 杜邦分析

// 杜邦财务分析
export const financialAnalysis = (parameter) => request({
  url: '/indicator/financialAnalysis',
  method: 'get',
  params: parameter
})