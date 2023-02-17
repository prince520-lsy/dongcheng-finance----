import request from '@/utils/request';

export const getTaskRisk = () => request({
  url: 'form/taxrisk',
  method: 'get'
})