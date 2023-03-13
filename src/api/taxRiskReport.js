import request from '@/utils/request';

export const getTaxRiskReport = () => request({
  url: 'form/taxmanagement',
  method: 'get'
})