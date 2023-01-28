<template>
  <a-card :bordered="false">
    <a-row :gutter="8">
      <a-col :span="5">
        <span>部门：</span>
        <a-tree-select
          v-model="value"
          style="width: 80%"
          :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
          placeholder="请选择部门"
          allow-clear
          tree-default-expand-all
          :tree-data="dataList"
          :select="onchangeSelect(value)"
        >
        </a-tree-select>

      </a-col>
      <a-col :span="19">
        <div class="table-page-search-wrapper">
          <a-form layout="inline">
            <a-row :gutter="48">
              <a-col :md="5" d:sm="15">
                <a-form-item label="用户昵称">
                  <a-input placeholder="请输入" v-model="queryParam.name" />
                </a-form-item>
              </a-col>
              <a-col :md="5" d:sm="15">
                <a-form-item label="状态">
                  <a-select placeholder="请选择" v-model="queryParam.state">
                    <a-select-option :value="''">全部</a-select-option>
                    <a-select-option :value="'1'">正常</a-select-option>
                    <a-select-option :value="'2'">离职</a-select-option>
                    <a-select-option :value="'0'">锁定</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="5" d:sm="15">
                <span class="table-page-search-submitButtons">
                  <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                  <a-button style="margin-left: 8px" @click="()=>{queryParam ={};value=undefined;$refs.table.refresh(true)}">重置</a-button>
                </span>
              </a-col>
            </a-row>
          </a-form>
        </div>
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="24">
        <div class="table-operator">
          <a-button type="primary" icon="plus" @click="handleAdd()">新建</a-button>
        </div>
        <s-table size="default" ref="table" rowKey="id" :columns="columns" :data="loadData">
          <span slot="avatar" slot-scope="text, record">
            <a-popover placement="right">
              <template slot="content">
                <img :src="record.avatar" width="200px" height="200px" />
              </template>
              <img :src="record.thumbAvatar" width="50px" height="50px" />
            </a-popover>
          </span>
          <span slot="phone" slot-scope="text, record">
            {{record.phone}}<br/>{{record.email}}
          </span>
          <span slot="cpId" slot-scope="text, record">
            <a-popover :title="record.cpId" placement="right">
              <template slot="content">
                <img :src="record.cpQrCode" width="200px" height="200px" />
              </template>
              {{record.cpId}}
            </a-popover>
          </span>
          <!-- <span slot="state" slot-scope="text, record">
            <a-switch :checked="record.state == '1'" @change="onChangeStatus(record)" />
          </span> -->
          <span slot="state" slot-scope="text, record">
            <a-dropdown>
            <a>{{record.state==0?'锁定':record.state==1?'正常':'离职'}} <a-icon type="down" /></a>
            <a-menu slot="overlay">
                <a-menu-item>
                <a-popconfirm title="确定锁定吗?" @confirm="() => onChangeStatus(record,0)">
                    <a>锁定</a>
                </a-popconfirm>
                </a-menu-item>

                <a-menu-item>
                <a-popconfirm title="确定操作吗?" @confirm="() => onChangeStatus(record,1)">
                    <a>正常</a>
                </a-popconfirm>
                </a-menu-item>

                <a-menu-item>
                <a-popconfirm title="确定离职吗?" @confirm="() => onChangeStatus(record,2)">
                    <a>离职</a>
                </a-popconfirm>
                </a-menu-item>
            </a-menu>
            </a-dropdown>
          </span>

          <span slot="type" slot-scope="text, record">
            <a-tag :color="record.type==0?'':'green' ">
              {{record.type==0?'普通用户':'管理员'}}
            </a-tag>
          </span>

          <span slot="gender" slot-scope="text, record">
            <a-tag :color="record.gender==0?'':record.gender==1?'green':'red' ">
              {{record.gender==0?'未定义':record.gender==1?'男':'女'}}
            </a-tag>
          </span>

          <span slot="action" slot-scope="text, record">
            <a @click="handleEdit(record)">编辑</a>
            <a-divider type="vertical" />
            <a @click="delByIds([record.id])">删除</a>
            <a-divider type="vertical" />
            <a @click="resetPwd(record)">重置密码</a>
          </span>

        </s-table>
      </a-col>
    </a-row>

    <user-modal ref="modalForm" @ok="handleOk" :deptTree="deptTree" />
    <user-pwd-modal ref="pwdmodal" />
  </a-card>
</template>

<script>

import { STable, SearchTree } from '@/components'
import { getUserList, delUser, changUserStatus, getDeptlist } from '@/api/system/user'
import UserModal from './Modal'
import UserPwdModal from './PasswordModal'
import pick from 'lodash.pick'
export default {
  name: 'UserList',
  components: {
    SearchTree,
    STable,
    UserModal,
    UserPwdModal
  },
  data() {
    return {
      treeExpandedKeys: [],
      value: undefined,

      visible: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      mdl: {},
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '头像',
          dataIndex: 'avatar',
          scopedSlots: { customRender: 'avatar' }
        },
        {
          title: '姓名',
          dataIndex: 'name'
        },
        {
          title: '用户名',
          dataIndex: 'username'
        },
        {
          title: '性别',
          dataIndex: 'gender',
          scopedSlots: { customRender: 'gender' }
        },
        {
          title: '电话号码',
          dataIndex: 'phone',
          scopedSlots: { customRender: 'phone' }
        },
        // {
        //   title: '企业微信ID',
        //   dataIndex: 'cpId',
        //   scopedSlots: { customRender: 'cpId' }
        // },
        {
          title: '部门',
          dataIndex: 'deptName'
        },
        {
          title: '权限',
          dataIndex: 'type',
          scopedSlots: { customRender: 'type' }
        },
        {
          title: '状态',
          dataIndex: 'state',
          scopedSlots: { customRender: 'state' }
        },
        {
          title: '创建时间',
          dataIndex: 'createTime'
        },
        {
          title: '操作',
          width: '200px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return getUserList(Object.assign(parameter, this.queryParam))
      },
      deptTree: [],
      expandedKeys: [],
      dataList: [],
      holderText: '搜索部门',
      selectedRowKeys: [],
      selectedRows: []
    }
  },
  created() {
    this.getDeptlist()
  },
  methods: {
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    handleAdd: function () {
     this.$refs.modalForm.add()
      this.$refs.modalForm.title = '新增'
    },
    handleEdit(record) {
      let data = {...record,password:''}
      this.$refs.modalForm.edit(data)
      this.$refs.modalForm.title = '编辑'
    },
    resetPwd(record) {
      this.$refs.pwdmodal.edit(record)
    },
    onChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    handleOk() {
      this.$refs.table.refresh()
      console.log('handleSaveOk')
    },
    delByIds(id) {
      var that = this
      this.$confirm({
        title: '确认删除',
        content: '确定要删除数据?',
        onOk: function() {
          delUser(id).then(res => {
            if (res.code === 200) {
              that.$message.success(`删除成功`)
              that.handleOk()
            } else {
              that.$message.error(res.message)
            }
          })
        }
      })
    },
    onChangeStatus(record,newstate) {
      record.state = newstate
      // record.state = record.state === 0 ? 1 : 0
      // changUserStatus(pick(record, 'id', 'state')).then(res => {
        changUserStatus({userId:record.id,state:newstate}).then(res => {
        if (res.code === 200) {
          this.$message.success('保存成功')
        } else {
          this.$message.error(res.message)
        }
      })
      // 发送状态到服务器
    },
    buildtree(list, arr, parentId) {
      list.forEach(item => {
        if (item.parentId === parentId) {
          var child = {
            key: item.id,
            value: item.id + '', // value是给modal的select用的，2者属性不一样
            title: item.name,
            scopedSlots: { title: 'title' },
            children: []
          }
          this.buildtree(list, child.children, item.id)
          if (child.children.length === 0) {
            delete child.children
          }
          arr.push(child)
        }
      })
    },
    getDeptlist(){
      getDeptlist().then(res => {
        if (res.code == 200) {
          console.log(res)
          let newdept = []
          res.data.map(item=> {
            item.children.map(b=>{
              newdept.push({key:b.id,title:b.name})
            })
          })
          this.dataList = res.data

        }
      })
    },
    onchangeSelect(value){
      if(value){
        this.queryParam.deptId = parseInt(value)
        console.log('deptid',value)
        this.$nextTick(()=>{
          this.handleOk()
        }) 
        // this.$refs.table.refresh(true)
      }
    }
  }
}
</script>
