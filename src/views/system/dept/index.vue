<template>
  <a-row :gutter="10">
    <a-col :md="12" :sm="24">
      <a-card :bordered="false">
        <!-- 按钮操作区域 -->
        <a-row style="margin-left: 14px">
          <a-button @click="handleAdd(1)" type="primary">添加一级部门</a-button>
          <a-button @click="refresh" type="default" icon="reload" :loading="loading">刷新</a-button>
        </a-row>
        <div style="background: #fff; padding-left: 16px; height: 100%; margin-top: 5px">
          <a-input-search @search="onSearch" style="width: 100%; margin-top: 10px" placeholder="请输入部门名称" />
          <!-- 树-->
          <a-col :md="10" :sm="24">
            <template>
              <a-dropdown :trigger="[this.dropTrigger]" @visibleChange="dropStatus">
                <span style="user-select: none">
                  <a-tree
                    ref="tree"
                    @select="onSelect"
                    @check="onCheck"
                    @rightClick="rightHandle"
                    :selectedKeys="selectedKeys"
                    :checkedKeys="checkedKeys"
                    :treeData="departTree"
                    :checkStrictly="true"
                    :expandedKeys="iExpandedKeys"
                    :autoExpandParent="autoExpandParent"
                    @expand="onExpand"
                  />
                </span>
                <!--新增右键点击事件,和增加添加和删除功能-->
                <a-menu slot="overlay">
                  <a-menu-item @click="handleAdd(3)" key="1">添加</a-menu-item>
                  <a-menu-item @click="handleDelete" key="2">删除</a-menu-item>
                  <a-menu-item @click="closeDrop" key="3">取消</a-menu-item>
                </a-menu>
              </a-dropdown>
            </template>
          </a-col>
        </div>
      </a-card>
    </a-col>
    <a-col :md="12" :sm="24">
      <a-card :bordered="false">
        <a-form :form="form">
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="机构名称">
            <a-input placeholder="请输入机构/部门名称" v-decorator="['name', validatorRules.departName]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="上级部门">
            <a-tree-select
              style="width: 100%"
              :dropdownStyle="{ maxHeight: '200px', overflow: 'auto' }"
              :treeData="treeData"
              :disabled="disable"
              v-model="model.parentId"
              placeholder="请选择上级部门"
            >
            </a-tree-select>
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="排序">
            <a-input-number v-decorator="['sort', { initialValue: 0 }]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="备注">
            <a-textarea placeholder="请输入备注" v-decorator="['remark']" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="领导人">
            <a-textarea placeholder="请输入领导人" v-decorator="['leader']" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="联系电话">
            <a-textarea placeholder="请输入联系电话" v-decorator="['phone']" />
          </a-form-item>
        </a-form>
        <div class="anty-form-btn">
          <a-button @click="submitCurrForm" type="primary" htmlType="button" icon="form">修改并保存</a-button>
        </div>
      </a-card>
    </a-col>
    <depart-modal ref="departModal" @ok="loadTree"></depart-modal>
  </a-row>
</template>
<script>
import DepartModal from './Modal'
import pick from 'lodash.pick'
import { deptTree, deleteDept, updateDept } from '@/api/system/dept'

export default {
  name: 'DepartList',
  components: {
    DepartModal,
  },
  data() {
    return {
      iExpandedKeys: [],
      loading: false,
      autoExpandParent: true,
      currFlowId: '',
      currFlowName: '',
      disable: true,
      treeData: [],
      visible: false,
      departTree: [],
      rightClickSelectedKey: '',
      hiding: true,
      model: {},
      dropTrigger: '',
      depart: {},
      disableSubmit: false,
      checkedKeys: [],
      selectedKeys: [],
      autoIncr: 1,
      currSelected: {},
      form: this.$form.createForm(this),
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
      graphDatasource: {
        nodes: [],
        edges: [],
      },
      validatorRules: {
        departName: { rules: [{ required: true, message: '请输入机构/部门名称!' }] },
      },
    }
  },
  methods: {
    loadData() {
      this.refresh()
    },
    loadTree(value) {
      var that = this
      that.treeData = []
      that.departTree = []
      deptTree(value).then((res) => {
        if (res.code == 200) {
          for (let i = 0; i < res.data.length; i++) {
            const temp = res.data[i]
            that.treeData.push(temp)
            that.departTree.push(temp)
            that.setThisExpandedKeys(temp)
          }
        }
      })
      this.loading = false
    },
    setThisExpandedKeys(node) {
      if (node.children && node.children.length > 0) {
        this.iExpandedKeys.push(node.key)
        for (let a = 0; a < node.children.length; a++) {
          this.setThisExpandedKeys(node.children[a])
        }
      }
    },
    refresh() {
      this.loading = true
      this.loadTree()
    },
    // 右键操作方法
    rightHandle(node) {
      this.dropTrigger = 'contextmenu'
      this.rightClickSelectedKey = node.node.eventKey
    },
    onExpand(expandedKeys) {
      this.iExpandedKeys = expandedKeys
      this.autoExpandParent = false
    },
    backFlowList() {
      this.$router.back(-1)
    },
    // 右键点击下拉框改变事件
    dropStatus(visible) {
      if (visible == false) {
        this.dropTrigger = ''
      }
    },
    // 右键店家下拉关闭下拉框
    closeDrop() {
      this.dropTrigger = ''
    },
    addRootNode() {
      this.$refs.nodeModal.add(this.currFlowId, '')
    },
    onSearch(value) {
      this.loadTree({ keywords: value })
    },
    nodeModalOk() {
      this.loadTree()
    },
    hide() {
      this.visible = false
    },
    onCheck(checkedKeys, info) {
      this.hiding = false
      this.checkedKeys = checkedKeys.checked
    },
    onSelect(selectedKeys, e) {
      this.hiding = false
      const record = e.node.dataRef
      this.currSelected = Object.assign({}, record)
      this.model = this.currSelected
      this.selectedKeys = [record.key]
      this.setValuesToForm(record)
    },
    // 触发onSelect事件时,为部门树右侧的form表单赋值
    setValuesToForm(record) {
      this.form.setFieldsValue(pick(record, 'name', 'sort', 'remark', 'leader', 'phone'))
    },
    getCurrSelectedTitle() {
      return !this.currSelected.title ? '' : this.currSelected.title
    },
    onClearSelected() {
      this.hiding = true
      this.checkedKeys = {}
      this.currSelected = {}
      this.form.resetFields()
      this.selectedKeys = []
    },
    handleNodeTypeChange(val) {
      this.currSelected.nodeType = val
    },
    notifyTriggerTypeChange(value) {
      this.currSelected.notifyTriggerType = value
    },
    receiptTriggerTypeChange(value) {
      this.currSelected.receiptTriggerType = value
    },
    submitCurrForm() {
      this.form.validateFields((err, values) => {
        if (!err) {
          if (!this.currSelected.id) {
            this.$message.warning('请点击选择要修改部门!')
            return
          }
          values.id = this.currSelected.id
          updateDept(values).then((res) => {
            if (res.code == 200) {
              this.$message.success('保存成功!')
              this.loadTree()
            } else {
              this.$message.error(res.message)
            }
          })
        }
      })
    },
    handleAdd(num) {
      if (num == 1) {
        this.$refs.departModal.add()
        this.$refs.departModal.title = '新增'
      } else if (num == 2) {
        const key = this.currSelected.key
        if (!key) {
          this.$message.warning('请先选中一条记录!')
          return false
        }
        this.$refs.departModal.add(this.selectedKeys)
        this.$refs.departModal.title = '新增'
      } else {
        this.$refs.departModal.add(this.rightClickSelectedKey)
        this.$refs.departModal.title = '新增'
      }
    },
    handleDelete() {
      var that = this
      this.$confirm({
        title: '确认删除',
        content: '确定要删除数据?',
        onOk: function () {
          deleteDept(that.rightClickSelectedKey).then((resp) => {
            if (resp.code == 200) {
              that.$message.success('删除成功!')
              that.loadTree()
            } else {
              that.$message.warning(resp.message)
            }
          })
        },
      })
    },
    selectDirectiveOk(record) {
      console.log('选中指令数据', record)
      this.nodeSettingForm.setFieldsValue({ directiveCode: record.directiveCode })
      this.currSelected.sysCode = record.sysCode
    },
  },
  created() {
    this.loadTree()
  },
}
</script>
<style scoped>
.ant-card-body .table-operator {
  margin: 15px;
}

.anty-form-btn {
  width: 100%;
  text-align: center;
}

.anty-form-btn button {
  margin: 0 5px;
}

.anty-node-layout .ant-layout-header {
  padding-right: 0;
}

.header {
  padding: 0 8px;
}

.header button {
  margin: 0 3px;
}

.ant-modal-cust-warp {
  height: 100%;
}

.ant-modal-cust-warp .ant-modal-body {
  height: calc(100% - 110px) !important;
  overflow-y: auto;
}

.ant-modal-cust-warp .ant-modal-content {
  height: 90% !important;
  overflow-y: hidden;
}

#app .desktop {
  height: auto !important;
}

/** Button按钮间距 */
.ant-btn {
  margin-left: 3px;
}
</style>
