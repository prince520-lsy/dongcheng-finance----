import request from '@/utils/request'

export function functionTree () {
    return request({
        url: '/system/function/tree',
        method: 'get'
    })
}

export function functionSelectTree () {
    return request({
        url: '/system/function/selectTree',
        method: 'get'
    })
}

export function listFunctions () {
    return request({
        url: '/system/function',
        method: 'get'
    })
}

export function addFunction (parameter) {
    return request({
        url: '/system/function',
        method: 'post',
        data: parameter
    })
}

export function updateFunction (parameter) {
    return request({
        url: '/system/function',
        method: 'put',
        data: parameter
    })
}

export function deleteFunction (id) {
    return request({
        url: '/system/function/' + id,
        method: 'delete'
    })
}


export function getLog (parameter) {
    return request({
        url: '/system/operationLog' ,
        method: 'get',
        params:parameter
    })
}

