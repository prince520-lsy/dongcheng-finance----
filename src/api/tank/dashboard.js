import request from '@/utils/request'


/*
 *
 *tank 为模块名   dashboard为表名 也就是业务名
 */



//通知列表api
export function NoticeList(parameter) {
	return request({
		url: '/tank/home/noticeList',
		method: 'get',
		params: parameter
	})
}

//告警列表api
export function WarningList(parameter) {
	return request({
		url: '/tank/home/warningList',
		method: 'get',
		params: parameter
	})
}

//报警统计数量api
export function WarningCount(parameter) {
	return request({
		url: '/tank/home/getWarningCount',
		method: 'get',
		params: parameter
	})
}

//报警列表api
export function WarningCountList(parameter) {
	return request({
		url: '/tank/home/getWarningCountList',
		method: 'get',
		params: parameter
	})
}


//监控记录详情api
export function CameraRecord(parameter) {
	return request({
		url: '/tank/home/getCameraRecord',
		method: 'get',
		params: parameter
	})
}

//监控记录视频下载api
export function DownloadVideo(parameter) {
	return request({
		url: '/tank/home/downloadVideo',
		method: 'get',
		params: parameter
	})
}


//获取首页目录列表api
export function HomeSelectCatalog(parameter) {
	return request({
		url: '/tank/home/selectCatalog',
		method: 'get',
		params: parameter
	})
}
