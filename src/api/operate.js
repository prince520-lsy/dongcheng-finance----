import request from '@/utils/request';

// 经营

// 收入费用情况
export const moneyAnalysis = (data) => request({
  url: '/operate/moneyAnalysis',
  method: 'post',
  data,
})

// 税负率
export const taxesAnalysis = (data) => request({
  url: '/operate/taxesAnalysis',
  method: 'post',
  data,
})

// 各类税占比
export const taxesPercent = () => request({
  url: '/operate/taxesPercent',
  method: 'get'
})

// 经营费用占比
export const taxesExpensePercent = (data) => request({
  url: '/operate/taxesExpensePercent',
  method: 'post',
  data,
})

// 费用预算趋势
export const taxesMoneyAnalysis = (data) => request({
  url: '/operate/taxesMoneyAnalysis',
  method: 'post',
  data,
})

// 经营费用预算对比
export const taxesBudgetMoneyAnalysis = (data) => request({
  url: '/operate/taxesBudgetMoneyAnalysis',
  method: 'post',
  data,
})