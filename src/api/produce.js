import request from '@/utils/request';


// 料工费变化趋势
export const costAnalysis = (data) => request({
  url: '/production/costAnalysis',
  method: 'post',
  data,
})

// 料工费分别占比
export const costPercent = (data) => request({
  url: '/production/costPercent',
  method: 'post',
  data,
})

// 单位生产成本趋势
export const priceAnalysis = (data) => request({
  url: '/production/priceAnalysis',
  method: 'post',
  data,
})

// 产品产量排行
export const productTop = (data) => request({
  url: '/production/productTop',
  method: 'post',
  data,
})

// 产品生产情况
export const productAnalysis = (data) => request({
  url: '/production/productAnalysis',
  method: 'post',
  data,
})

// 料工费组成累计情况
export const costMakePercent = (data) => request({
  url: '/production/costMakePercent',
  method: 'post',
  data,
})

// 单位生产表
export const unitProduct = (data) => request({
  url: '/production/unitProduct',
  method: 'post',
  data,
})