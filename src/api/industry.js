
import request from '@/utils/request';
//industry

export const getIndustryTable1Data = () => request({
  url: 'form/Industry',
  method: 'get'
})