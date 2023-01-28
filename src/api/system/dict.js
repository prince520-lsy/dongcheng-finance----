import request from '@/utils/request'

//字典相关

/**
 * @description 获取字典目录列表-分页
 * @param {*} parameter 
 * @returns 
 */
export function dictType (parameter) {
    return request({
        url: '/system/dict/type',
        method: 'get',
        params:parameter
    })
}

/**
 * @description 根据code获取字典
 * @param {*} parameter 
 * @returns 
 */
 export function dictTypeByCode (code) {
    return request({
        url: '/system/dict/data/findByCode',
        method: 'get',
        params:{code}
    })
}



/**
 * @description 新增目录
 * @param {*} parameter 
 * @returns 
 */
 export function addDictType (parameter) {
    return request({
        url: '/system/dict/type',
        method: 'post',
        data: parameter
    })
}

/**
 * @description 编辑目录
 * @param {*} parameter 
 * @returns 
 */
 export function putDictType(parameter) {
	return request({
		url: '/system/dict/type',
		method: 'put',
		data: parameter
	})
}

/**
 * @description 查询目录
 * @param {*} id 
 * @returns 
 */
 export function listDictType(id) {
	return request({
		url: `/system/dict/type/${id}`,
		method: 'get'
	})
}


/**
 * @description 删除目录
 * @param {*} id 
 * @returns 
 */
 export function delDictType(id) {
	return request({
		url: `/system/dict/type/${id}`,
		method: 'delete'
	})
}

//////////////字典详情

/**
 * @description 获取字典详情列表-分页
 * @param {*} parameter 
 * @returns 
 */
 export function dictData (parameter) {
    return request({
        url: '/system/dict/data',
        method: 'get',
        params:parameter
    })
}

/**
 * @description 新增字典数据
 * @param {*} parameter 
 * @returns 
 */
 export function addDictData (parameter) {
    return request({
        url: '/system/dict/data',
        method: 'post',
        data: parameter
    })
}

/**
 * @description 编辑字典数据
 * @param {*} parameter 
 * @returns 
 */
 export function putDictData(parameter) {
	return request({
		url: '/system/dict/data',
		method: 'put',
		data: parameter
	})
}

/**
 * @description 查询字典详情
 * @param {*} id 
 * @returns 
 */
 export function listDictData(id) {
	return request({
		url: `/system/dict/data/${id}`,
		method: 'get'
	})
}

/**
 * @description 删除字典数据
 * @param {*} id 
 * @returns 
 */
 export function delDictData(id) {
	return request({
		url: `/system/dict/data/${id}`,
		method: 'delete'
	})
}


