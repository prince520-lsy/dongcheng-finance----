import request from '@/utils/request';


// 收入列表
export const getIncomTable = () => request({
  url: 'form/Profits',
  method: 'get'
})

// 月份列表
export const getIncomMonthTable = () => request({
  url: 'form/Month',
  method: 'get'
})