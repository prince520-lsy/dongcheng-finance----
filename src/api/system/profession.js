import request from '@/utils/request'

export function listJob (arg) {
    return request({
        url: '/system/profession',
        method: 'get',
        params: arg
    })
}

export function saveOrUpdateJob (parameter) {
    return request({
        url: '/system/profession',
        method: parameter.id ? 'put' : 'post',
        data: parameter
    })
}

export function delJob (id) {
    return request({
        url: '/system/profession/' + id,
        method: 'delete'
    })
}
