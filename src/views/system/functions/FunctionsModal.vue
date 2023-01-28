<template>
  <a-drawer
    :title="title"
    :width="drawerWidth"
    @close="handleCancel"
    :visible="drawerVisible"
    :confirmLoading="confirmLoading"
    :wrapStyle="{ height: 'calc(100% - 108px)', overflow: 'auto', paddingBottom: '108px' }"
  >
    <div :style="{ width: '100%', border: '1px solid #e9e9e9', padding: '10px 16px', background: '#fff' }">
      <a-spin :spinning="confirmLoading">
        <a-form :form="form">
          <a-form-item label="菜单类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-radio-group @change="onChangeMenuType" v-decorator="['type', { initialValue: 'D' }]">
              <a-radio value="D">目录</a-radio>
              <a-radio value="M">菜单</a-radio>
              <a-radio value="B">按钮/权限</a-radio>
            </a-radio-group>
          </a-form-item>

          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" :label="menuLabel" hasFeedback>
            <a-input placeholder="请输入名称" v-decorator="['name', validatorRules.name]" :readOnly="disableSubmit" />
          </a-form-item>

          <a-form-item label="上级节点" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-tree-select
              style="width: 100%"
              :dropdownStyle="{ maxHeight: '200px', overflow: 'auto' }"
              :tree-data="treeData"
              tree-data-simple-mode
              v-model="model.parentId"
              placeholder="请选择父级节点"
              :disabled="disableSubmit"
            >
            </a-tree-select>
          </a-form-item>

          <a-form-item v-show="localMenuType === 'M'" :labelCol="labelCol" :wrapperCol="wrapperCol" label="组件路径">
            <a-input placeholder="请输入组件路径" v-decorator="['component', {}]" :readOnly="disableSubmit" />
          </a-form-item>


          <a-form-item v-show="localMenuType === 'D'" :labelCol="labelCol" :wrapperCol="wrapperCol" label="组件路径">
            <a-select v-decorator="['component', {}]" :readOnly="disableSubmit" >
              <a-select-option key="RouteView" value="RouteView">RouteView</a-select-option>
              <a-select-option key="BlankLayout" value="BlankLayout">BlankLayout</a-select-option>
              <a-select-option key="UserLayout" value="UserLayout">UserLayout</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item v-show="localMenuType !== 'B'" :labelCol="labelCol" :wrapperCol="wrapperCol" label="组件名称">
            <a-input placeholder="请输入组件名称" v-decorator="['componentName', {}]" :readOnly="disableSubmit" />
          </a-form-item>

          <a-form-item v-show="localMenuType == 'D'" :labelCol="labelCol" :wrapperCol="wrapperCol" label="重定向地址">
            <a-input placeholder="请输入重定向地址" v-decorator="['redirectUrl', {}]" :readOnly="disableSubmit" />
          </a-form-item>

          <a-form-item v-show="localMenuType === 'M'" :labelCol="labelCol" :wrapperCol="wrapperCol" label="菜单路径">
            <a-input placeholder="请输入路径" v-decorator="['path', {}]" :readOnly="disableSubmit" />
          </a-form-item>

          <a-form-item v-show="localMenuType === 'B'" :labelCol="labelCol" :wrapperCol="wrapperCol" label="授权标识">
            <a-input
              placeholder="多个用逗号分隔, 如: user:list,user:create"
              v-decorator="['expression', {}]"
              :readOnly="disableSubmit"
            />
          </a-form-item>

          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="排序">
            <a-input-number
              placeholder="请输入排序值"
              :min="0"
              style="width: 100%"
              v-decorator="['sort']"
              :readOnly="disableSubmit"
            />
          </a-form-item>

          <a-form-item v-show="localMenuType !== 'B'" :labelCol="labelCol" :wrapperCol="wrapperCol" label="图标">
            <a-input placeholder="点击右侧按钮选择图标" v-model="model.icon" :readOnly="disableSubmit">
              <a-icon slot="addonAfter" type="setting" @click="selectIcons" />
            </a-input>
          </a-form-item>

          <a-form-item v-show="localMenuType === 'M'" :labelCol="labelCol" :wrapperCol="wrapperCol" label="打开方式">
            <a-select default-value="" v-model="model.target">
              <a-select-option value=""> 页签 </a-select-option>
              <a-select-option value="_blank"> 新窗口 </a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item v-show="localMenuType !== 'B'" :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否可见">
            <a-switch checkedChildren="是" unCheckedChildren="否" v-model="visible" />
          </a-form-item>

          <a-form-item v-show="localMenuType === 'M'" :labelCol="labelCol" :wrapperCol="wrapperCol" label="缓存路由">
            <a-switch checkedChildren="是" unCheckedChildren="否" v-model="cache" />
          </a-form-item>
        </a-form>

        <!-- 选择图标 -->
        <icons @choose="handleIconChoose" @close="handleIconCancel" :iconChooseVisible="iconChooseVisible"></icons>
      </a-spin>
      <a-row :style="{ textAlign: 'right' }">
        <a-button :style="{ marginRight: '8px' }" @click="handleCancel"> 关闭 </a-button>
        <a-button :disabled="disableSubmit" @click="handleOk" type="primary">确定</a-button>
      </a-row>
    </div>
  </a-drawer>
</template>

<script>
import { addFunction, updateFunction, functionSelectTree, listFunctions } from '@/api/system/function'
import Icons from './Icons'
import pick from 'lodash.pick'

export default {
  name: 'PermissionModal',
  components: { Icons },
  data() {
    return {
      drawerWidth: 700,
      treeData: [],
      title: '操作',
      disableSubmit: false,
      model: {},
      localMenuType: 'D',
      cache: true, // 是否路由缓存
      drawerVisible: false,
      visible: true, // 表单元素-隐藏路由
      menuLabel: '菜单名称',
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
        name: { rules: [{ required: true, message: '请输入名称!' }] },
        // path:{rules: [{ required: true, message: '请输入菜单路径!' }]},
        // component:{rules: [{ required: true, message: '请输入前段路由!' }]},
        // componentName:{rules: [{ required: true, message: '请输入路由名称!' }]},
        // redirect:{rules: [{ required: true, message: '请输入跳转地址!' }]},
        // permission:{rules: [{ required: true, message: '请输入权限标识!' }]}
      },
      iconChooseVisible: false,
    }
  },
  created() {},
  methods: {
    loadTree() {
      var that = this

      listFunctions().then((res) => {
        if (res.code == 200) {
          // this.dataSource = res.data
          let dataSource = []
          // that.listToTree(res.data, dataSource, 0)
          function listToTree2(arr){
            arr.forEach(item=>{
               var child = {
                  ...item,
                  title:item.name,
                  key:item.id,
                  value:item.id,
                }
                if(child.children&&child.children.length){
                  listToTree2(child.children)
                  delete child.children
                }
                dataSource.push(child)
            })
          }
          listToTree2(res.data)
          let tree =[]
          this.listToTree(dataSource,tree,0)
          that.treeData = [{id:0,key:0,value:0,title:'根目录',children:tree,parentId:-1}]
          console.log([{id:0,key:0,value:0,title:'根目录',children:tree,parentId:-1}])
        }
      })

      // functionSelectTree().then((res) => {
      //   if (res.code == 200) {
      //     that.treeData = res.data
      //   }
      // })
    },
    listToTree(list, tree, parentId) {
      list.forEach((item) => {
        if (item.parentId === parentId) {
          var child = {
            ...item,
            title:item.name,
            key:item.id,
            value:item.id,
            children: [],
          }
          this.listToTree(list, child.children, item.id)
          if (child.children.length === 0) {
            delete child.children
          }
          tree.push(child)
        }
      })
    },
    add() {
      // 默认值
      this.edit()
    },
    edit(record) {
      this.drawerVisible = true
      this.resetScreenSize() // 调用此方法,根据屏幕宽度自适应调整抽屉的宽度
      this.loadTree()
      this.form.resetFields()
      this.model = {}
      if (record) {
        this.localMenuType = record.type
        this.reactFunctionType()
      }
      var fieldValue = pick(
        record,
        'id',
        'name',
        'parentId',
        'component',
        'componentName',
        'redirectUrl',
        'path',
        'target',
        'type',
        'visible',
        'expression',
        'icon',
        'sort',
        'cache'
      )
      this.model = fieldValue
      this.$nextTick(() => {
        this.form.setFieldsValue(fieldValue)
      })
    },
    close() {
      this.$emit('close')
      this.localMenuType = 'D'
      this.disableSubmit = false
      this.drawerVisible = false
    },
    handleOk() {
      const that = this
      // 触发表单验证
      this.form.validateFields((err, values) => {
        if (!err) {
          that.confirmLoading = true
          this.model.cache = this.cache ? 1 : 0
          this.model.visible = this.visible ? 1 : 0
          const formData = Object.assign(this.model, values)
          let obj
          if (!this.model.id) {
            obj = addFunction(formData)
          } else {
            obj = updateFunction(formData)
          }
          obj
            .then((res) => {
              if (res.code == 200) {
                that.$message.success('操作成功')
                that.$emit('ok')
                that.close()
              } else {
                that.$message.warning(res.message)
              }
            })
            .finally(() => {
              that.confirmLoading = false
              // that.close();
            })
        }
      })
    },
    handleCancel() {
      this.close()
    },
    reactFunctionType() {
      if (this.localMenuType === 'D') {
        this.menuLabel = '目录名称'
      } else if (this.localMenuType === 'B') {
        this.menuLabel = '按钮/权限'
      } else {
        this.menuLabel = '菜单名称'
      }
    },
    onChangeMenuType(e) {
      // console.log('localMenuType checked', e.target.value)
      this.localMenuType = e.target.value
      this.reactFunctionType()
    },
    selectIcons() {
      this.iconChooseVisible = true
    },
    handleIconCancel() {
      this.iconChooseVisible = false
    },
    handleIconChoose(value) {
      this.model.icon = value
      this.iconChooseVisible = false
    },
    // 根据屏幕变化,设置抽屉尺寸
    resetScreenSize() {
      const screenWidth = document.body.clientWidth
      if (screenWidth < 500) {
        this.drawerWidth = screenWidth
      } else {
        this.drawerWidth = 700
      }
    },
  },
}
</script>
