import request from '@/utils/request';

export const getFinanceEarlyWarning = (parameter) => request({
  url: 'form/financialearlywarning',
  method: 'get',
  params: parameter
})

