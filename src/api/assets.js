import request from '@/utils/request';

//资产

// 筛选

// 仓库列表
export const getWarehouse = () => request({
  url: '/select/getWarehouse',
  method: 'get'
})

// 税种列表
export const getTaxation = () => request({
  url: '/select/getTaxation',
  method: 'get'
})

// 费用类型
export const getExpense = () => request({
  url: '/select/getExpense',
  method: 'get'
})

// 资金存款占比
export const capitalMoneyPercent = (data) => request({
  url: '/assets/capitalMoneyPercent',
  method: 'post',
  data
})

// 资金变动趋势
export const capitalChangeAnalysis = (data) => request({
  url: '/assets/capitalChangeAnalysis',
  method: 'post',
  data
})

// 收入支出趋势
export const capitalMoneyAnalysis = (data) => request({
  url: '/assets/capitalMoneyAnalysis',
  method: 'post',
  data
})

// 资金流入情况
export const capitalIn = (data) => request({
  url: '/assets/capitalIn',
  method: 'post',
  data
})

// 资金流出情况
export const capitalOut = (data) => request({
  url: '/assets/capitalOut',
  method: 'post',
  data
})

// 贷款提示表
export const capitalReminder = (data) => request({
  url: '/assets/capitalReminder',
  method: 'post',
  data
})

/////////////////// 存货  /////////////////

// 存货类别情况
export const stockCategoryAnalysis = (data) => request({
  url: '/assets/stockCategoryAnalysis',
  method: 'post',
  data,
})

// 存货类别金额占比
export const stockCategoryMoneyPercent = (data) => request({
  url: '/assets/stockCategoryMoneyPercent',
  method: 'post',
  data,
})

// 存货价值金额趋势
export const stockMoneyAnalysis = (data) => request({
  url: '/assets/stockMoneyAnalysis',
  method: 'post',
  data,
})

// 存货资金变动趋势
export const stockMoneyChange = (data) => request({
  url: '/assets/stockMoneyChange',
  method: 'post',
  data,
})

// 存货情况
export const stockAnalysis = (data) => request({
  url: '/assets/stockAnalysis',
  method: 'post',
  data,
})

// 安全库位示警
export const stockReminder = (data) => request({
  url: '/assets/stockReminder',
  method: 'post',
  data,
})

// 库存价值库龄占比
export const stockMoneyPercent = (data) => request({
  url: '/assets/stockMoneyPercent',
  method: 'post',
  data,
})

/////////////////// 其它  /////////////////

// 资产价值趋势（总）
export const otherMoneyAnalysis = (data) => request({
  url: '/assets/otherMoneyAnalysis',
  method: 'post',
  data,
})

// 资产价值趋势（分）
export const otherMoneyTimeAnalysis = (data) => request({
  url: '/assets/otherMoneyTimeAnalysis',
  method: 'post',
  data,
})

// 各类资产价值情况
export const otherMoneyLevelAnalysis = (data) => request({
  url: '/assets/otherMoneyLevelAnalysis',
  method: 'post',
  data,
})

// 资产各类价值占比
export const otherMoneyLevelPercent = (data) => request({
  url: '/assets/otherMoneyLevelPercent',
  method: 'post',
  data,
})

// 抵押资产表
export const otherMortgage = (data) => request({
  url: '/assets/otherMortgage',
  method: 'post',
  data,
})