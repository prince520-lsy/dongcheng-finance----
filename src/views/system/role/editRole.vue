<template>
	<a-modal :title="title" :width="800" :visible="visible" :maskClosable="false" :confirmLoading="confirmLoading"
		@ok="handleOk" @cancel="handleCancel" cancelText="关闭">
		<a-spin :spinning="confirmLoading">
			<k-form-build :value="jsonData" :dynamicData="dynamicData" @change="formChang" ref="KFB" />
		</a-spin>
	</a-modal>
</template>

<script>
	import {
		getByRole,
		updateRole,
		checkRoleName,
		checkRoleCode,
		addRole
	} from '@/api/system/role'
	const validatorCodeTimer = null

	export default {
		name: 'JobModal',
		data() {
			return {
				title: '操作',
				visible: false,
				model: {},
				id: null,
				jsonData: {
					"list": [{
						"type": "input",
						"label": "角色名称",
						"options": {
							"type": "text",
							"width": "100%",
							"defaultValue": "",
							"placeholder": "请输入角色名称",
							"clearable": false,
							"maxLength": null,
							"hidden": false,
							"disabled": false
						},
						"model": "name",
						"key": "input_1616131939346",
						"help": "",
						"prefix": "",
						"suffix": "",
						"rules": [{
							"required": true,
							"message": "必填项"
						}]
					}, {
						"type": "input",
						"label": "唯一编码",
						"options": {
							"type": "text",
							"width": "100%",
							"defaultValue": "",
							"placeholder": "请输入编码",
							"clearable": false,
							"maxLength": null,
							"hidden": false,
							"disabled": false
						},
						"model": "code",
						"key": "input_1616132139650",
						"help": "",
						"prefix": "",
						"suffix": "",
						"rules": [{
							"required": true,
							"message": "必填项"
						}]
					}, {
						"type": "number",
						"label": "角色排序",
						"icon": "icon-number",
						"options": {
							"width": "100%",
							"defaultValue": 0,
							"min": 0,
							"max": null,
							"precision": null,
							"step": 1,
							"hidden": false,
							"disabled": false,
							"placeholder": "请输入角色排序"
						},
						"model": "sort",
						"key": "number_1616131959482",
						"help": "",
						"prefix": "",
						"suffix": "",
						"rules": [{
							"required": true,
							"message": "必填项"
						}]
					}, {
						"type": "treeSelect",
						"label": "权限选择",
						"options": {
							"disabled": false,
							"multiple": true,
							"hidden": false,
							"clearable": true,
							"showSearch": false,
							"treeCheckable": true,
							"treeCheckStrictly": false,
							"placeholder": "请选择权限",
							"dynamicKey": "roleIds",
							"dynamic": true,
							"options": [{
								"value": "1",
								"label": "选项1",
								"children": [{
									"value": "11",
									"label": "选项11"
								}]
							}, {
								"value": "2",
								"label": "选项2",
								"children": [{
									"value": "22",
									"label": "选项22"
								}]
							}]
						},
						"model": "permissions",
						"key": "treeSelect_1616380057244",
						"help": "",
						"prefix": "",
						"suffix": "",
						"rules": [{
							"required": true,
							"message": "必填项"
						}]
					}, {
						"type": "textarea",
						"label": "角色描述",
						"options": {
							"width": "100%",
							"minRows": 4,
							"maxRows": 6,
							"maxLength": null,
							"defaultValue": "",
							"clearable": false,
							"hidden": false,
							"disabled": false,
							"placeholder": "请输入角色描述"
						},
						"model": "remark",
						"key": "textarea_1616131985155",
						"help": "",
						"rules": [{
							"required": false,
							"message": "必填项"
						}]
					}],
					"config": {
						"layout": "horizontal",
						"labelCol": {
							"xs": 4,
							"sm": 4,
							"md": 4,
							"lg": 4,
							"xl": 4,
							"xxl": 4
						},
						"wrapperCol": {
							"xs": 18,
							"sm": 18,
							"md": 18,
							"lg": 18,
							"xl": 18,
							"xxl": 18
						},
						"hideRequiredMark": false,
						"customStyle": ""
					}
				},
				// jsonData: {"list":[{"type":"input","label":"角色名称","options":{"type":"text","width":"100%","defaultValue":"","placeholder":"请输入角色名称","clearable":false,"maxLength":null,"hidden":false,"disabled":false},"model":"name","key":"input_1616131939346","help":"","prefix":"","suffix":"","rules":[{"required":true,"message":"必填项"}]},{"type":"input","label":"唯一编码","options":{"type":"text","width":"100%","defaultValue":"","placeholder":"请输入编码","clearable":false,"maxLength":null,"hidden":false,"disabled":false},"model":"code","key":"input_1616132139650","help":"","prefix":"","suffix":"","rules":[{"required":true,"message":"必填项"}]},{"type":"number","label":"角色排序","icon":"icon-number","options":{"width":"100%","defaultValue":0,"min":0,"max":null,"precision":null,"step":1,"hidden":false,"disabled":false,"placeholder":"请输入角色排序"},"model":"sort","key":"number_1616131959482","help":"","prefix":"","suffix":"","rules":[{"required":true,"message":"必填项"}]},{"type":"treeSelect","label":"权限选择","options":{"disabled":false,"multiple":true,"hidden":false,"clearable":true,"showSearch":false,"treeCheckable":true,"placeholder":"请选择权限","dynamicKey":"roleIds","dynamic":true,"options":[{"value":"1","label":"选项1","children":[{"value":"11","label":"选项11"}]},{"value":"2","label":"选项2","children":[{"value":"22","label":"选项22"}]}]},"model":"permissions","key":"treeSelect_1616132010715","help":"","prefix":"","suffix":"","rules":[{"required":true,"message":"必填项"}]},{"type":"textarea","label":"角色描述","options":{"width":"100%","minRows":4,"maxRows":6,"maxLength":null,"defaultValue":"","clearable":false,"hidden":false,"disabled":false,"placeholder":"请输入角色描述"},"model":"remark","key":"textarea_1616131985155","help":"","rules":[{"required":false,"message":"必填项"}]}],"config":{"layout":"horizontal","labelCol":{"xs":4,"sm":4,"md":4,"lg":4,"xl":4,"xxl":4},"wrapperCol":{"xs":18,"sm":18,"md":18,"lg":18,"xl":18,"xxl":18},"hideRequiredMark":false,"customStyle":""}},
				confirmLoading: false,
				dynamicData: {
					roleIds: []
				},
				permissions: []
			}
		},
		created() {},
		methods: {
			getParentId(list, value) {
				for (let i in list) {
					if (list[i].value == value) {
						return [list[i]]
					}
					if (list[i].children) {
						let node = this.getParentId(list[i].children, value);
						if (node !== undefined) {
							return node.concat(list[i])
						}
					}
				}
			},
			formChang(val, key) {


			},
			add(roleIds) {
				this.visible = true
				this.dynamicData.roleIds = roleIds
				this.id = null
				this.$nextTick(() => {
					this.$refs.KFB.reset()
				})

			},
			edit(record) {
				this.visible = true
				this.dynamicData.roleIds = record.roleIds
				this.$nextTick(() => {
					this.$refs.KFB.setData(record)
				})
				getByRole(record.id).then(res => {
					let roleId = []
					if (res.code == 200) {
						res.data && res.data.map(item => {
							let temp = this.getParentId([...this.dynamicData.roleIds], item.id)
							console.log(temp)
							if (temp.length > 1) {
								roleId.push(item.id)
							}
						})
						record.permissions = roleId
						this.$nextTick(() => {
							this.$refs.KFB.setData(record)
						})

					}
				})

				this.id = record.id || null
			},
			close() {
				this.$emit('close')
				this.visible = false
			},
			async getByRole(record) {},
			handleOk() {
				// 通过函数获取数据
				let that = this
				this.$refs.KFB.getData().then(res => {
						that.isName(res)
					})
					.catch(err => {
						console.log(err, '校验失败')
					})
			},
			isName(res) {
				let that = this
				checkRoleName({
					name: res.name,
					id: that.id
				}).then((r) => {
					if (!r.data) {
						that.isCode(res)
					} else {
						that.$message.warn('抱歉，该角色名称已存在')
					}
				})
			},
			isCode(res) {
				let that = this
				checkRoleCode({
					code: res.code,
					id: that.id
				}).then((r) => {
					if (!r.data) {
						that.Action(res)
					} else {
						that.$message.warn('抱歉，该角色CODE已存在')
					}
				})
			},
			Action(res) {
				let that = this
				// 获取数据成功
				let Action = [addRole, updateRole]
				let index = that.id ? 1 : 0
				let a = []

				res.permissions.forEach(item => {
					let temp = this.getParentId([...this.dynamicData.roleIds], item) //找出所有父级
					for (let i = 0; i < temp.length; i++) { //排除自己本身，把层级父级全部加进去
						a.push(temp[i].value)
					}
				});
				res.permissions = Array.from(new Set(res.permissions.concat(a)))
				let newres = {
					...res,
					id: that.id
				}

				Action[index](newres).then(ret => {

					if (ret.code == 200) {
						that.$message.success('操作成功')
						that.close()
						that.$emit('ok')
					}
				}, err => {
					that.$message.error(err.data.message)
				})

			},
			handleCancel() {
				this.close()
			},
		},
	}
</script>
