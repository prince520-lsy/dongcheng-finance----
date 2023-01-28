<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    :maskClosable="false"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="职务编码">
          <a-input placeholder="请输入职务编码" v-decorator="['code', validatorRules.code]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="职务名称">
          <a-input placeholder="请输入职务名称" v-decorator="['name', validatorRules.name]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="描述">
          <a-textarea :rows="5" placeholder="..." v-decorator="['remark', {}]" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import { saveOrUpdateJob } from '@/api/system/profession'

const validatorCodeTimer = null

export default {
  name: 'JobModal',
  data() {
    return {
      title: '操作',
      visible: false,
      model: {},
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
      confirmLoading: false,
      form: this.$form.createForm(this),
      validatorRules: {
        code: {
          rules: [{ required: true, message: '请输入职务编码' }],
        },
        name: { rules: [{ required: true, message: '请输入职务名称' }] },
      },
    }
  },
  methods: {
    add() {
      this.edit({})
    },
    edit(record) {
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.model, 'code', 'name', 'remark'))
      })
    },
    close() {
      this.$emit('close')
      this.visible = false
    },
    handleOk() {
      const that = this
      // 触发表单验证
      this.form.validateFields((err, values) => {
        if (!err) {
          that.confirmLoading = true
          const formData = Object.assign(this.model, values)
          saveOrUpdateJob(formData)
            .then((res) => {
              if (res.code == 200) {
                that.$message.success('操作成功')
                that.$emit('ok')
              } else {
                that.$message.warning(res.message)
              }
            })
            .finally(() => {
              that.confirmLoading = false
              that.close()
            })
        }
      })
    },
    handleCancel() {
      this.close()
    },
  },
}
</script>
