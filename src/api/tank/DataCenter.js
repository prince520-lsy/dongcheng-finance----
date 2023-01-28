import request from '@/utils/request'



//数据中心数据查询api
export function StateRecord(parameter) {
	return request({
		url: '/tank/tank_state_record',
		method: 'get',
		params: parameter
	})
}

//运维日志数据列表api
export function Log(parameter) {
	return request({
		url: '/tank/log',
		method: 'get',
		params: parameter
	})
}

//运维日志用户列表api
export function LogUserList(parameter) {
	return request({
		url: '/tank/notice/getUserList',
		method: 'get',
		params: parameter
	})
}

//温湿度数据列表api
export function SensorTemWet(parameter) {
	return request({
		url: '/tank/sensorTemWet',
		method: 'get',
		params: parameter
	})
}

//温湿度统计图信息api
export function GetTemWetListCount(parameter) {
	return request({
		url: '/tank/sensorTemWet/listCount',
		method: 'get',
		params: parameter
	})
}


//温湿度设备参数信息api
export function GetHumiture(parameter) {
	return request({
		url: '/tank/sensorTemWet/getHumiture',
		method: 'get',
		params: parameter
	})
}

//压力传感器数据列表api
export function SensorPressure(parameter) {
	return request({
		url: '/tank/sensorPressure',
		method: 'get',
		params: parameter
	})
}

//压力传感器统计图信息api
export function GetPressureListCount(parameter) {
	return request({
		url: '/tank/sensorPressure/listCount',
		method: 'get',
		params: parameter
	})
}


//压力传感器设备参数信息api
export function GetPressureDevice(parameter) {
	return request({
		url: '/tank/sensorPressure/getPressureDevice',
		method: 'get',
		params: parameter
	})
}

//液面传感器数据列表api
export function SensorLiquid(parameter) {
	return request({
		url: '/tank/sensorLiquid',
		method: 'get',
		params: parameter
	})
}

//液面传感器统计图信息api
export function GetLiquidListCount(parameter) {
	return request({
		url: '/tank/sensorLiquid/listCount',
		method: 'get',
		params: parameter
	})
}


//液面传感器设备参数信息api
export function GetLiquidDevice(parameter) {
	return request({
		url: '/tank/sensorLiquid/getLiquidDevice',
		method: 'get',
		params: parameter
	})
}

//流量传感器数据列表api
export function SensorFlow(parameter) {
	return request({
		url: '/tank/sensorFlow',
		method: 'get',
		params: parameter
	})
}


//流量传感器统计图信息api
export function GetFlowListCount(parameter) {
	return request({
		url: '/tank/sensorFlow/listCount',
		method: 'get',
		params: parameter
	})
}


//流量传感器设备参数信息api
export function GetFlowDevice(parameter) {
	return request({
		url: '/tank/sensorFlow/getFlowDevice',
		method: 'get',
		params: parameter
	})
}

//有毒气体参数信息api
export function SensorToxicList(parameter) {
	return request({
		url: '/tank/sensorToxic/list',
		method: 'get',
		params: parameter
	})
}


//有毒气体统计图信息api
export function GetToxicListCount(parameter) {
	return request({
		url: '/tank/sensorToxic/listCount',
		method: 'get',
		params: parameter
	})
}