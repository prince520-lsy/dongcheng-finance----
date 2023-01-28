<template>
  <div class="main">
    <a-card style="width:400px">
      <div class="logo">
        <img src="~@/assets/logo.png" class="logo" alt="logo" />
      </div>
      <a-form id="formLogin" class="user-layout-login" ref="formLogin" :form="form" @submit="handleSubmit">
        <a-form-item>
          <a-input
            size="large"
            type="text"
            placeholder="用户名:"
            v-decorator="[
              'username',
              {
                rules: [{ required: true, message: '请输入用户名' }],
                validateTrigger: 'change'
              }
            ]"
          >
            <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }" />
          </a-input>
        </a-form-item>

        <a-form-item>
          <a-input-password
            size="large"
            placeholder="密码:"
            v-decorator="[
              'password',
              { rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur' }
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
            :loading="loginBtn"
            :disabled="loginBtn"
          >登录
          </a-button>
        </a-form-item>

        <a-button type="link">系统使用手册下载</a-button>
      </a-form>
    </a-card>
  </div>
</template>

<script>
import storage from 'store'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { mapActions } from 'vuex'
import { timeFix } from '@/utils/util'
import { register, VerificationCode, OrganizationList } from '@/api/login'
// import { register } from '@/lib/k-form-design-mini.common'
// import Verify from '@/components/verifition/Verify'
export default {
  components: {
    // Verify
  },
  data() {
    return {
      plainOptions: [
        { label: '单位负责人', value: '1' },
        { label: '普通用户', value: '2' },
      ],
      companys: [],
			currentTab: '1',
      roleType: '1',
      loginBtn: false,
      formValue: {},
      form: this.$form.createForm(this),
      registerForm: this.$form.createForm(this),
			text: '',
    }
  },
  created(){
    
      let token = window.location.search
      token = decodeURIComponent(token)
      token = token.split('=')[1]
      storage.set(ACCESS_TOKEN,token, 2 * 60 * 60 * 1000)
      this.$router.push('/sales');
  },

  methods: {
    ...mapActions(['Login']),
    roleChang(e) {
      this.roleType = e.target.value
    },
		// tab栏切换
		tabCut(e) {
			this.currentTab = e
		},
    handleSubmit(e) {
      e.preventDefault()
      const validateFieldsKey = ['username', 'password']
      this.form.validateFields(validateFieldsKey, { force: true }, (err, values) => {
        if (!err) {
          this.formValue = values
          this.Login(this.formValue)
            .then(res => {
              this.loginSuccess(res)
            })
            .catch(err => this.requestFailed(err.data))
            .finally(() => {
              this.loginBtn = false
            })
        } else {
          setTimeout(() => {
            this.loginBtn = false
          }, 600)
        }
      })
    },
    registeredSubmit(e) {
      e.preventDefault()
      const validateFieldsKey = ['username', 'loginPassword', 'password2', 'phone', 'code', 'name', 'organName', 'organId']
      this.registerForm.validateFields(validateFieldsKey, { force: true }, (err, values) => {
        if (values.loginPassword != values.password2) {
          this.$message.warning('密码不一致')
          return
        }
        if (!err) {
          this.formValue = values
          const { password2, ...params } = values
          const l = { ...params, type: this.roleType }
          register(l)
            .then(res => {
							if (res.code == 200) {
								this.$message.success('注册成功')
								setTimeout(() => {
									this.formValue = {}
									this.roleType = '1'
									this.currentTab = '1'
								}, 600)
							}
              // this.loginSuccess(res)
            })
            .catch(err => {
              this.requestFailed(err.data)
              })
            .finally(() => {
              this.loginBtn = false
            })
        } else {
          setTimeout(() => {
            this.loginBtn = false
          }, 600)
        }
      })
    },
    // 发送验证码
    async getCode() {
      let phone = ''
			let count = 60

      const validateFieldsKey = ['phone']
      this.registerForm.validateFields(validateFieldsKey, { force: true }, (err, values) => {
        phone = values.phone
      })
      const res = await VerificationCode({ phone: phone })
      if (res.code == 200) {
        this.$message.success('发送成功')
				const time = setInterval(() => {
					if (count == 0) {
						clearInterval(timer)
						this.text = ''
					} else {
						count--
						this.text = `${count}s后可重发`
					}
				}, 1000)
      } else {
        this.$message.warn(res.message)
      }
    },
    loginSuccess(res) {
      this.$router.push({ path: '/' })
      // 延迟 1 秒显示欢迎信息
      setTimeout(() => {
        this.$notification.success({
          message: '欢迎',
          description: `${timeFix()}，欢迎回来`
        })
      }, 1000)
    },
    requestFailed(err) {
      this.isLoginError = true
      this.$notification['error']({
        message: '错误',
        description: err.message || '请求出现错误，请稍后再试',
        duration: 4
      })
    },
    verifySuccess(params) {
      this.loginBtn = true
      const loginParams = this.formValue
      loginParams.captchaVerification = params.captchaVerification
      this.Login(loginParams)
        .then(res => {
          this.loginSuccess(res)
        })
        .catch(err => this.requestFailed(err))
        .finally(() => {
          this.loginBtn = false
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
    // width: 243px;
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
