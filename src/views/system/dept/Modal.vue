<template>
  <a-modal
    :title="title"
    :width="800"
    :ok="false"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :okButtonProps="{ props: { disabled: disableSubmit } }"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="部门名称" :hidden="false" hasFeedback>
          <a-input id="name" placeholder="请输入机构/部门名称" v-decorator="['name', validatorRules.departName]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" :hidden="seen" label="上级部门" hasFeedback>
          <a-tree-select
            style="width: 100%"
            :dropdownStyle="{ maxHeight: '200px', overflow: 'auto' }"
            :treeData="departTree"
            v-model="model.parentId"
            placeholder="请选择上级部门"
            :disabled="condition"
          >
          </a-tree-select>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="排序">
          <a-input-number min="0" style="width: 100%" v-decorator="['sort', { initialValue: 0 }]" />
        </a-form-item>

        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="领导人" hasFeedback>
          <a-input placeholder="请输入领导人姓名" v-decorator="['leader']" />
        </a-form-item>

        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="联系电话" hasFeedback>
          <a-input placeholder="请输入联系电话" v-decorator="['phone']" />
        </a-form-item>

        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="备注">
          <a-textarea placeholder="请输入备注" v-decorator="['remark', {}]" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import ATreeSelect from 'ant-design-vue/es/tree-select'
import { deptTree, addDept } from '@/api/system/dept'
import pick from 'lodash.pick'
import ATextarea from 'ant-design-vue/es/input/TextArea'
export default {
  name: 'DepartModal',
  components: { ATextarea, ATreeSelect },
  data() {
    return {
      departTree: [],
      orgTypeData: [],
      phoneWarning: '',
      departName: '',
      title: '操作',
      seen: false,
      visible: false,
      condition: true,
      disableSubmit: false,
      model: {},
      menuhidden: false,
      menuusing: true,
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
        departName: { rules: [{ required: true, message: '请输入机构/部门名称!' }] },
        orgCode: { rules: [{ required: true, message: '请输入机构编码!' }] },
        mobile: { rules: [{ validator: this.validateMobile }] },
      },
      dictDisabled: true,
    }
  },
  methods: {
    loadTreeData() {
      var that = this
      deptTree().then((res) => {
        if (res.code == 200) {
          that.departTree = []
          for (let i = 0; i < res.data.length; i++) {
            const temp = res.data[i]
            that.departTree.push(temp)
          }
        }
      })
    },
    add(depart) {
      if (depart) {
        this.seen = false
        this.dictDisabled = false
      } else {
        this.seen = true
        this.dictDisabled = true
      }
      this.edit(depart)
    },
    edit(record) {
      this.form.resetFields()
      this.model = Object.assign({}, {})
      this.visible = true
      this.loadTreeData()
      this.model.parentId = record ? record.toString() : null
      if (this.seen) {
        this.model.parentId = '0'
      } else {
        this.model.parentId = record
      }
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.model, 'parentId', 'name', 'sort', 'leader', 'phone'))
      })
    },
    close() {
      this.$emit('close')
      this.disableSubmit = false
      this.visible = false
    },
    handleOk() {
      const that = this
      // 触发表单验证
      this.form.validateFields((err, values) => {
        if (!err) {
          that.confirmLoading = true
          const formData = Object.assign(this.model, values)
          addDept(formData)
            .then((res) => {
              if (res.code == 200) {
                that.$message.success('添加成功')
                that.loadTreeData()
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
    validateMobile(rule, value, callback) {
      if (!value || new RegExp(/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/).test(value)) {
        callback()
      } else {
        callback('您的手机号码格式不正确!')
      }
    },
  },
}
</script>
