<template>
  <a-modal
    title="重置密码"
    style="top: 20px;"
    :width="400"
    centered
    v-model="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
  >
    <a-form :form="form">
      <a-form-item style="display:none">
        <a-input v-decorator="['id']"/>
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="用户名"
      >
        <a-input placeholder="用户名" disabled v-decorator="['username', {rules: [{ required: true, message: '请输入用户名' }]}]" />
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="新密码"
      >
        <a-input type="password" placeholder="新密码" v-decorator="['password', {rules: [{ required: true,min:6,max:16, message: '请输入6到16位密码' }]}]" />
      </a-form-item>

    </a-form>
  </a-modal>
</template>
<script>
import { resetPwd } from '@/api/system/user'
import pick from 'lodash.pick'
export default {
  name: 'UserPwdModal',
  components: {
  },
  data () {
    return {
      visible: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      confirmLoading: false,
      mdl: {},
      form: this.$form.createForm(this)
    }
  },
  methods: {
    edit (record) {
      this.form.resetFields()
      this.mdl = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.mdl, 'id', 'username'))
        // this.form.setFieldsValue({ ...record })
      })
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.confirmLoading = true
          resetPwd({userId:values.id,newPassword:values.password}).then(res => {
            if (res.code === 200) {
              this.$message.success(`${values.username}` + '重置密码成功')
              // this.$emit('ok')
              this.visible = false
            } else {
              this.$message.success(res.message)
            }
          }).catch(() => {
            this.$message.error('系统错误，请稍后再试')
          }).finally(() => {
            this.confirmLoading = false
          })
        }
      })
    }
  },
  watch: {
    /*
      'selectedRows': function (selectedRows) {
        this.needTotalList = this.needTotalList.map(item => {
          return {
            ...item,
            total: selectedRows.reduce( (sum, val) => {
              return sum + val[item.dataIndex]
            }, 0)
          }
        })
      }
      */
  }
}
</script>
