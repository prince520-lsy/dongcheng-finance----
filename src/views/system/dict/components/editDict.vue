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
          <k-form-build
            :value="jsonData"
            ref="KFB"
            />
    </a-spin>
  </a-modal>
</template>

<script>

import {dictType, addDictType, putDictType } from '@/api/system/dict'
const validatorCodeTimer = null

export default {
  name: 'JobModal',
  data() {
    return {
      title: '操作',
      visible: false,
      model: {},
      id:null,
      jsonData:  {"list":[{"type":"input","label":"名称","options":{"type":"text","width":"100%","defaultValue":"","placeholder":"请输入名称","clearable":false,"maxLength":null,"hidden":false,"disabled":false},"model":"name","key":"input_1615628583345","rules":[{"required":true,"message":"请输入名称"}]},{"type":"input","label":"编码","options":{"type":"text","width":"100%","defaultValue":"","placeholder":"请输入编码","clearable":false,"maxLength":null,"hidden":false,"disabled":false},"model":"code","key":"input_1615628515672","rules":[{"required":true,"message":"请输入编码"}]},{"type":"number","label":"排序值","options":{"width":"100%","defaultValue":null,"min":0,"max":null,"precision":null,"step":1,"hidden":false,"disabled":false,"placeholder":"请输入排序值"},"model":"sort","key":"number_1615628650899","rules":[{"required":true,"message":"主输入排序值"}]},{"type":"radio","label":"状态","options":{"disabled":false,"hidden":false,"defaultValue":"1","dynamicKey":"","dynamic":false,"options":[{"value":"0","label":"冻结"},{"value":"1","label":"正常"}]},"model":"state","key":"radio_1615857422613","rules":[{"required":false,"message":"必填项"}]},{"type":"textarea","label":"字典描述","options":{"width":"100%","minRows":4,"maxRows":6,"maxLength":null,"defaultValue":"","clearable":false,"hidden":false,"disabled":false,"placeholder":"请输入字典描述"},"model":"remark","key":"textarea_1615628610654","rules":[{"required":false,"message":"请输入字典描述"}]}],"config":{"layout":"horizontal","labelCol":{"xs":4,"sm":4,"md":4,"lg":4,"xl":4,"xxl":4},"wrapperCol":{"xs":18,"sm":18,"md":18,"lg":18,"xl":18,"xxl":18},"hideRequiredMark":false,"customStyle":""}},
      confirmLoading: false,
      queryParam: {
        pageNum: 1,
        pageSize: 10
      },
    }
  },
  methods: {
    add() {
      this.edit({})
    },
    edit(record) {
      this.visible = true
      this.$nextTick(() => {
        if(JSON.stringify(record) == "{}"){
          this.$refs.KFB.reset()
        }else{
          record.state = record.state+''
          this.$refs.KFB.setData(record)
        }
      })
      this.id = record.id||null
    },
    close() {
      this.$emit('close')
      this.visible = false
    },
    handleOk() {
      // 通过函数获取数据
      let that = this
       this.$refs.KFB.getData().then(res => {
         that.queryParam.code = res.code
         // code不能重复, 是个唯一标识.通过筛选判断编码是否存在
          dictType(that.queryParam).then(ret => {
            if(ret.code==200){
              // 新增
              if(!that.id && ret.data.records.length == 0){
                that.Action(res)
                return
              }
              // 编辑
              if(that.id && ret.data.records.length == 0){
                  that.Action(res)
                }else if(ret.data.records.length >0 && that.id && that.id == ret.data.records[0].id && res.code == ret.data.records[0].code){
                  that.Action(res)
                }else{
                  that.$message.warn('编码已存在，请重新输入编码')
                }
            }
          })
         
       })
        .catch(err => {
          console.log(err, '校验失败')
        }) 
    },
    Action(res){
      let that = this
      // 获取数据成功
      let Action = [addDictType,putDictType]
      let index = that.id?1:0
      let newres = {...res,state:parseInt(res.state),id:that.id}
      Action[index](newres).then(ret=>{
        if(ret.code==200){
            that.$message.success('操作成功')
            that.close()
          that.$emit('ok')
        }
      })

    },
    handleCancel() {
      this.close()
    },
  },
}
</script>
