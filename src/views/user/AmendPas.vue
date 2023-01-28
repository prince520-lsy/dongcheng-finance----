<template>
  <div class="main">
    <a-card style="width:400px">
			<h2 class="text-center">修改密码</h2>
      <a-form id="formLogin" class="user-layout-login" ref="formLogin" :form="form" @submit="handleSubmit">
        <a-form-item label="原密码:">
          <a-input-password
            size="large"
            type="text"
            placeholder="输入原密码:"
            v-decorator="[
              'oldPassword',
              {
                rules: [{ required: true, message: '请输入原密码' }],
                validateTrigger: 'change'
              }
            ]"
          >
            <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
          </a-input-password>
        </a-form-item>
      
        <a-form-item label="新密码:">
          <a-input-password
            size="large"
            placeholder="输入新密码:"
            v-decorator="[
              'password',
              { rules: [{ required: true, message: '请输入新密码' }], validateTrigger: 'blur' }
            ]"
          >
            <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
          </a-input-password>
        </a-form-item>
      	
        <a-form-item>
          <a-button
            size="large"
            type="primary"
            htmlType="submit"
            class="login-button"
            >确定
          </a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script>
import {ChangePassword} from '@/api/login'
export default {
  data() {
    return {
      formValue: {},
      form: this.$form.createForm(this),
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      const validateFieldsKey = ['oldPassword', 'password']
      this.form.validateFields(validateFieldsKey, { force: true }, (err, values) => {
        if (!err) {
          this.formValue = values
					ChangePassword({...this.formValue}).then(res=>{
						if(res.code==200){
							this.$message.success('操作成功,请重新登陆')
							setTimeout(()=>{
								return this.$store.dispatch('Logout').then(() => {
									this.$router.push({
										path: '/user/login'
									})
								})
							},1000)
						}
					})
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.logo {
  padding-bottom: 10px;
  text-align: center;
  img {
    width: 243px;
    height: 56px;
  }
}
.main /deep/ .ant-tabs-nav{
  width: 100%;
}
.main /deep/ .ant-tabs-tab{
  width: 50%;text-align: center;margin: 0;
}
.main /deep/ .ant-tabs-ink-bar{
  width: 40%;
}

.captcha{width: 106px;height: 40px;}
.user-layout-login {
  label {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 17px;
    height: 40px;
    width: 100%;
  }
}
</style>
