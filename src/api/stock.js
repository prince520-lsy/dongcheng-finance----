import request from '@/utils/request';
import qs from 'qs';

// 筛选
// 供应商列表
export const getSupplier = () => request({
    url: '/select/getSupplier',
    method: 'get'
})
// 物料类别列表
export const getCategory = () => request({
    url: '/select/getCategory',
    method: 'get'
})

///////////////////

// 供应商采购分析
export const supplierAnalysis = (data) => request({
    url: '/purchase/supplierAnalysis',
    method: 'post',
    data,
})
// 采购完成情况
export const purchaseComplete = (data) => request({
    url: '/purchase/purchaseComplete',
    method: 'post',
    data,
})
// 采购完成分析
export const purchaseAnalysis = (data) => request({
    url: '/purchase/purchaseAnalysis',
    method: 'post',
    data,
})
// 供应商排行
export const supplierTop = (data) => request({
    url: '/purchase/supplierTop',
    method: 'post',
    data,
})
// 应收账款分析
export const collectionAnalysis = (data) => request({
  url: '/purchase/collectionAnalysis',
  method: 'post',
  data,
})

// 应收账款账龄占比
export const collectionPercent = (data) => request({
  url: '/purchase/collectionPercent',
  method: 'post',
  data,
})

// 采购类别支出占比
export const purchaseCategory = (data) => request({
  url: '/purchase/purchaseCategory',
  method: 'post',
  data,
})

// 采购金额（数量）变动
export const purchasePriceNum = (data) => request({
  url: '/purchase/purchasePriceNum',
  method: 'post',
  data,
})

// 材料采购分析
export const categoryMaterialAnalysis = (data) => request({
  url: '/purchase/categoryMaterialAnalysis',
  method: 'post',
  data,
})

// 单价因数分析
export const categoryPriceAnalysis = (data) => request({
  url: '/purchase/categoryPriceAnalysis',
  method: 'post',
  data,
})

// 供货周期表
export const categoryMaterialSupplyPeriod = (data) => request({
  url: '/purchase/categoryMaterialSupplyPeriod',
  method: 'post',
  data,
})

// 类别占比
export const categoryPercent = (data) => request({
  url: '/purchase/categoryPercent',
  method: 'post',
  data,
})

// 类别采购完成率
export const categoryPurchasePercent = (data) => request({
  url: '/purchase/categoryPurchasePercent',
  method: 'post',
  data,
})

// 平均单价变化
export const categoryPrice = (data) => request({
  url: '/purchase/categoryPrice',
  method: 'post',
  data,
})

// 实际采购总额与预算对比
export const categoryMoneyCompare = (data) => request({
  url: '/purchase/categoryMoneyCompare',
  method: 'post',
  data,
})

// 各类别采购总额排行
export const categoryPurchaseTop = (data) => request({
  url: '/purchase/categoryPurchaseTop',
  method: 'post',
  data,
})