import request from '@/utils/request'

export function resetPwd(parameter) {
    return request({
        url: '/system/user/reset/password',
        method: 'put',
        params: parameter
    })
}

export function delUser(id) {
    return request({
        url: '/system/user/' + id,
        method: 'delete'
    })
}

export function changUserStatus(parameter) {
    return request({
        url: '/system/user/changUserStatus',
        method: 'put',
        params: parameter
    })
}

export function getRoleAll() {
    return request({
        url: '/system/role',
        method: 'get',
        params: { state:1,pageNum: 1, pageSize: 1000 }
    })
}

export function getUser(id) {
    return request({
        url: '/system/user/' + id,
        method: 'get'
    })
}

export function addUser(parameter) {
    return request({
        url: '/system/user',
        method: 'post',
        data: parameter
    })
}

export function getDeptlist(parameter) {
    return request({
        url: '/system/dept/listTree',
        method: 'get',
        params: parameter
    })
}

export function getUserList(parameter) {
    return request({
        url: '/system/user',
        method: 'get',
        params: parameter
    })
}

export function editUser(parameter) {
    return request({
        url: '/system/user',
        method: 'put',
        data: parameter
    })
}

export function queryUserRole(parameter) {
    return request({
        url: '/system/user/role',
        method: 'get',
        params: parameter
    })
}

export function queryJobAll() {
    return request({
        url: '/system/profession',
        method: 'get',
        params: { state:0,pageNum: 1, pageSize: 1000 }
    })
}

export function getUserRoles(parameter) {
    return request({
        url: '/system/role/getUserRoles',
        method: 'get',
        params: parameter
    })
}