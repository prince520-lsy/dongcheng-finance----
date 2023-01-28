import request from '@/utils/request'

export function getRoleList(parameter) {
    return request({
        url: '/system/role',
        method: 'get',
        params: parameter
    })
}

export function checkRoleName(parameter) {
    return request({
        url: '/system/role/hasDuplicatedName',
        method: 'get',
        params: parameter
    })
}

export function checkRoleCode(parameter) {
    return request({
        url: '/system/role/hasDuplicatedCode',
        method: 'get',
        params: parameter
    })
}

export function addRole(parameter) {
    return request({
        url: '/system/role',
        method: 'post',
        data: parameter
    })
}

export function getRoleFunctions(roleId) {
    return request({
        url: '/system/role/getFunctions',
        method: 'get',
        params: { roleId }
    })
}

export function updateRole(role) {
    return request({
        url: '/system/role',
        method: 'put',
        data: role
    })
}

export function removeRole(roleId) {
    return request({
        url: '/system/role/' + roleId,
        method: 'DELETE'
    })
}

export function getByRole(roleId) {
    return request({
        url: '/system/function/getByRole',
        method: 'get',
        params: { roleId }
    })
}