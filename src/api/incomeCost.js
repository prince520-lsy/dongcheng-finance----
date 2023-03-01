import request from '@/utils/request';

// 收入列表
export const initTaxRiskTable = () => request({
  url: 'form/financialriskreport',
  method: 'get'
})