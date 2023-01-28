<template>
	<div>
		<a-dropdown   v-if="currentUser && currentUser.name" placement="bottomLeft" >
				<span class="ant-pro-account-avatar">
					<a-avatar size="small" :src="currentUser.avatar" class="antd-pro-global-header-index-avatar" />
					<span>{{ currentUser.name }}</span>
				</span>

				<!-- <a-menu class="ant-pro-drop-down menu" slot="overlay">
					<a-menu-item key="unlock" @click="showModel">
						<a-icon type="unlock" />
						修改密码
					</a-menu-item>
					<a-menu-item key="logout" @click="handleLogout">
						<a-icon type="logout" />
						退出
					</a-menu-item>
				</a-menu> -->
		</a-dropdown>
	
		<span v-else>
			<a-spin size="small" :style="{ marginLeft: 8, marginRight: 8 }" />
		</span>
	</div>
	
</template>

<script>
	import {
		Modal
	} from 'ant-design-vue'
	export default {
		props: {
			currentUser: {
				type: Object,
				default: () => null
			},
			menu: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			showModel(){
				this.$router.push({
					path: '/user/amend'
				})
			},
			handleToCenter() {
				this.$router.push({
					path: '/account/center'
				})
			},
			handleToSettings() {
				this.$router.push({
					path: '/account/settings'
				})
			},
			handleLogout(e) {
				Modal.confirm({
					title: this.$t('layouts.usermenu.dialog.title'),
					content: this.$t('layouts.usermenu.dialog.content'),
					onOk: () => {
						// return new Promise((resolve, reject) => {
						//   setTimeout(Math.random() > 0.5 ? resolve : reject, 1500)
						// }).catch(() => console.log('Oops errors!'))
						return this.$store.dispatch('Logout').then(() => {
							this.$router.push({
								name: 'login'
							})
						})
					},
					onCancel() {}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
.ant-pro-drop-down {
  /deep/ .action {
    margin-right: 8px;
  }
  /deep/ .ant-dropdown-menu-item {
    min-width: 160px;
  }
}
.ant-pro-account-avatar{
	height: 64px;
	display:block;
}
</style>
