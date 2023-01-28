import request from '@/utils/request'

export function deptTree(parameter) {
    return request({
        url: '/system/dept/listTree',
        method: 'get',
        params: parameter
    })
}

export function addDept(parameter) {
    return request({
        url: '/system/dept',
        method: 'post',
        data: parameter
    })
}

export function updateDept(parameter) {
    return request({
        url: '/system/dept',
        method: 'put',
        data: parameter
    })
}

export function deleteDept(deptId) {
    return request({
        url: '/system/dept?deptId=' + deptId,
        method: 'delete'
    })
}
