<!-- 字典详情 -->
<template>
  <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8">
            <a-form-item label="名称">
              <a-input placeholder="请输入名称" v-model="queryParam.name"></a-input>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8">
            <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
              <a-button type="primary" @click="$refs.table.refresh(true)" icon="search">查询</a-button>
              <a-button type="primary" @click="rebirth()" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <div>
      <div class="table-operator">
        <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      </div>
      <s-table ref="table" size="middle" bordered rowKey="id" :columns="columns" :data="loadData" :loading="loading">
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a-dropdown>
          <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
          <a-menu slot="overlay">
              <a-menu-item>
              <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
              </a-popconfirm>
              </a-menu-item>
          </a-menu>
          </a-dropdown>
        </span>
      </s-table>
    </div>

    <edit-modal ref="modalForm" @ok="modalFormOk" :type="queryParam.type"></edit-modal>
  </a-card>
</template>
<script>
// import { functionTree } from '@/api/system/function'
import { STable } from '@/components'
import { dictData, delDictData } from '@/api/system/dict'
import editModal from './components/editDictInfo';

export default {
  name: 'RoleInfo',
  props: {},
  data () {
    return {
      list: [],
      loadData: (parameter) => {
        return dictData(Object.assign(parameter, this.queryParam))
      },
      id:null,
      loading: false,
      columns: [
        {
          title: '#',
          dataIndex: '',
          key: 'rowIndex',
          width: 60,
          align: 'center',
          customRender: function (t, r, index) {
            return parseInt(index) + 1
          },
        },
        {
          title: '字典类型',
          align: 'center',
          dataIndex: 'typeName',
        },
         {
          title: '主键标识',
          align: 'center',
          dataIndex: 'id',
        },
         {
          title: '名称',
          align: 'center',
          dataIndex: 'name',
        },
        {
          title: '创建时间',
          align: 'center',
          dataIndex: 'createTime',
        },
         {
          title: '排序值',
          align: 'center',
          dataIndex: 'sort',
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' },
        },
      ],
      queryParam: {
        type:1,
        name:'',
        pageNum: 1,
        pageSize: 10
      },
    }
  },
  components:{
    STable,
    editModal
  },
  created(){
    this.queryParam.type = this.$route.query.id
  },
  methods: {
    close () {
      this.$emit('close')
      this.checkedKeys = []
    },
    async dictData(){
      let that = this
      dictData(this.queryParam).then((res) => {
        if (res.code == 200) {
          that.loadData = res.data.records
          debugger
          this.$message.success('操作成功')
          this.$refs.table.refresh()
        } else {
          this.$message.warn(res.message)
        }
      });
    },
    modalFormOk() {
      this.$refs.table.refresh()
    },
    
    handleAdd: function () {
      this.$refs.modalForm.add(this.queryParam.type)
      this.$refs.modalForm.title = '新增'
    },
    handleEdit: function (record) {
      this.$refs.modalForm.edit(record)
      this.$refs.modalForm.title = '编辑'
    },
    handleDelete(id) {
      delDictData(id).then((resp) => {
        if (resp.code == 200) {
          this.$message.success('操作成功')
          this.$refs.table.refresh()
        } else {
          this.$message.warn(resp.message)
        }
        })
    },
    rebirth(){
      this.queryParam = {
        ...this.queryParam,
        name:'',
        pageNum: 1,
        pageSize: 10
      }
      this.$refs.table.refresh()
    }
  },
  watch: {
    // roleInfoVisiable () {
    //   if (this.roleInfoVisiable) {
    //     functionTree().then((r) => {
    //       this.menuTreeData = r.data
    //       getRoleFunctions(this.roleInfoData.id).then((r) => {
    //         const length = this.checkedKeys.length
    //         this.checkedKeys.splice(0, length, r.data)
    //         this.key = +new Date()
    //       })
    //     })
    //   }
    // }
  }
}
</script>
<style scoped>
span.info-display{
 margin-left: 15px;
}
</style>
