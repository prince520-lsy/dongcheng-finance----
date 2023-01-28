<!-- 字典维护 -->
<template>
<page-header-wrapper :title="false" content="">
  <a-card>
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8">
            <a-form-item label="名称">
              <a-input placeholder="请输入名称" v-model="queryParam.name"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="编码">
              <a-input placeholder="请输入编码" v-model="queryParam.code"></a-input>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8">
            <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
              <a-button type="primary" @click="$refs.table.refresh(true)" icon="search">查询</a-button>
              <a-button type="primary" @click="()=>{queryParam ={};$refs.table.refresh(true)}" style="margin-left: 8px">重置</a-button>
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
        <span slot="type" slot-scope="type">
          <a-tag :color="type ==0? 'red':'green'">
            {{type ==0? '冻结':'正常'}}
          </a-tag>
        </span>
        <span slot="action" slot-scope="text, record">
          <a @click="goInfoList(record.id)">列表</a>
          <a-divider type="vertical" />
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
  <edit-modal ref="modalForm" @ok="modalFormOk"></edit-modal>
  </a-card>
</page-header-wrapper>
</template>

<script>
import { STable } from '@/components'
import { dictType, delDictType } from '@/api/system/dict'
import editModal from './components/editDict';
export default {
  data() {
    return {
      loadData: (parameter) => {
        return dictType(Object.assign(parameter, this.queryParam))
      },
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
          title: '名称',
          align: 'center',
          dataIndex: 'name',
        },
         {
          title: '字典描述',
          align: 'center',
          dataIndex: 'remark',
        },
        {
          title: '编码',
          align: 'center',
          dataIndex: 'code',
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
          title: '	状态',
          align: 'center',
          dataIndex: 'state',
           scopedSlots: { customRender: 'type' },
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' },
        },
      ],
      queryParam: {},
    }
  },

  components:{
    STable,
    editModal
  },

  computed: {},

  // mounted: {},

  methods: {
    changType(e){
        this.queryParam.type =e
    },
    modalFormOk() {
      this.$refs.table.refresh()
    },
    handleAdd: function () {
      this.$refs.modalForm.add()
      this.$refs.modalForm.title = '新增'
    },
    handleEdit: function (record) {
      this.$refs.modalForm.edit(record)
      this.$refs.modalForm.title = '编辑'
    },
    handleDelete(id) {
      delDictType(id).then((resp) => {
        if (resp.code == 200) {
          this.$message.success('操作成功')
          this.$refs.table.refresh()
        } else {
          this.$message.warn(resp.message)
        }
        })
    },
    goInfoList(id){
      this.$router.push({ 
        name: 'dictInfoList',
        query: {
            id: id
          }
        })
    }
  },
}
</script>
<style lang='less' scoped>
</style>