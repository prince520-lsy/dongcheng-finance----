import request from '@/utils/request';
import qs from 'qs';

// 筛选
// 部门列表
export const getDepartment = (parameter) => request({
    url: '/select/getDepartment',
    method: 'get',
    params: parameter
})

// 客户列表
export const getCustomer = () => request({
    url: '/select/getCustomer',
    method: 'get'
})
// 产品列表
export const getProduct = () => request({
    url: '/select/getProduct',
    method: 'get'
})

// 区域列表
export const getRegion = () => request({
    url: '/select/getRegion',
    method: 'get'
})



///////////////////////////////


// 客户销售额排行
export const customerSaleTop = (data) => request({
    url: '/sale/customerSaleTop',
    method: 'post',
    data,
})

// 应收账款分析
export const collectionAnalysis = (data) => request({
    url: '/sale/collectionAnalysis',
    method: 'post',
    data,
})

// 应收账款账龄比例
export const collectionPercent = (data) => request({
    url: '/sale/collectionPercent',
    method: 'post',
    data,
})

// 销售完成分析
export const saleComplete = (data) => request({
    url: '/sale/saleComplete',
    method: 'post',
    data,
})

// 各部门销售情况
export const departmentAnalysis = (data) => request({
    url: '/sale/departmentAnalysis',
    method: 'post',
    data,
})

// 产品销售占比
export const productPercent = (data) => request({
    url: '/sale/productPercent',
    method: 'post',
    data,
})

// 订单完成情况
export const orderComplete = (data) => request({
    url: '/sale/orderComplete',
    method: 'post',
    data,
})

// 销售热力图
export const saleMap = (data) => request({
    url: '/sale/saleMap',
    method: 'post',
    data,
})

// 贡献度分析
export const departmentContribution = (data) => request({
    url: '/sale/departmentContribution',
    method: 'post',
    data,
})

// 员工销售排行
export const businessSaleTop = (data) => request({
    url: '/sale/businessSaleTop',
    method: 'post',
    data,
})

// 贡献度分析
export const saleContribution = (data) => request({
    url: '/sale/saleContribution',
    method: 'post',
    data,
})

// 产品销售总额表 & 各部门产品销售总额表
export const productSale = (data) => request({
    url: '/sale/productSale',
    method: 'post',
    data,
})

// 各区域销售占比
export const regionSalePercent = (data) => request({
    url: '/sale/regionSalePercent',
    method: 'post',
    data,
})

// 各区域销售排行
export const regionSaleTop = (data) => request({
    url: '/sale/regionSaleTop',
    method: 'post',
    data,
})

// 产品价格变动
export const productPrice = (data) => request({
    url: '/sale/productPrice',
    method: 'post',
    data,
})

// 产品销量变动
export const productUnit = (data) => request({
    url: '/sale/productUnit',
    method: 'post',
    data,
})

// 产品收入成本对比
export const productCompare = (data) => request({
    url: '/sale/productCompare',
    method: 'post',
    data,
})

// 销售额变动
export const saleMoney = (data) => request({
    url: '/sale/saleMoney',
    method: 'post',
    data,
})

// 客户销售情况
export const customerSale = (data) => request({
    url: '/sale/customerSale',
    method: 'post',
    data,
})

// 超期账龄情况
export const accountsReceivable = (data) => request({
    url: '/sale/accountsReceivable',
    method: 'post',
    data,
})