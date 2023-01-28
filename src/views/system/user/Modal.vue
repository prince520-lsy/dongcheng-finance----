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
               :config="config"
            :dynamicData="dynamicData"
            @change="handleChange"
            ref="KFB"
            />
    </a-spin>
  
  </a-modal>
</template>
<script>
import { getRoleAll, addUser, getUser, queryJobAll, editUser, getDeptlist, getUserRoles } from '@/api/system/user'
export default {
  name: 'UserModal',
  props: {
    deptTree: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      title: '操作',
      visible: false,
      jobList: [],
      id:null,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
       config: {
        uploadFile: process.env.VUE_APP_API_BASE_URL+'/venus/resource/upload',
        uploadImage: process.env.VUE_APP_API_BASE_URL+'/venus/resource/upload', // 上传图片地址
        uploadFileName: "file", // 上传文件name
        uploadImageName: "file", // 上传图片name
      },
      confirmLoading: false,
      dynamicData: {
        jobAll:[],
        roleAll:[],
        deptAll:[]
      },
      spinning: false,
      form: this.$form.createForm(this),
      jsonData:{"list":[{"type":"input","label":"姓名","options":{"type":"text","width":"100%","defaultValue":"","placeholder":"请输入姓名","clearable":false,"maxLength":null,"hidden":false,"disabled":false},"model":"name","key":"input_1615967850620","rules":[{"required":true,"message":"必填项"}]},{"type":"input","label":"昵称","options":{"type":"text","width":"100%","defaultValue":"","placeholder":"请输入昵称","clearable":false,"maxLength":null,"hidden":false,"disabled":false},"model":"nickname","key":"input_1615967894648","rules":[{"required":false,"message":"必填项"}]},{"type":"input","label":"登录用户名","options":{"type":"text","width":"100%","defaultValue":"","placeholder":"请输入登录用户名","clearable":false,"maxLength":null,"hidden":false,"disabled":false},"model":"username","key":"input_1615968255737","rules":[{"required":false,"message":"必填项"}]},{"type":"input","label":"电话号码","options":{"type":"text","width":"100%","defaultValue":"","placeholder":"请输入手机号码","clearable":false,"maxLength":11,"hidden":false,"disabled":false},"model":"phone","key":"input_1615967987029","rules":[{"required":true,"message":"必填项"},{"pattern":"^1[0-9]{10}$","message":"请输入正确的手机号码"}]},{"type":"select","label":"职位","options":{"width":"100%","multiple":false,"disabled":false,"clearable":false,"hidden":false,"placeholder":"请选择职位","dynamicKey":"jobAll","dynamic":true,"options":[{"value":"1","label":"下拉框1"},{"value":"2","label":"下拉框2"}],"showSearch":false},"model":"professionId","key":"select_1616034696552","help":"","prefix":"","suffix":"","rules":[{"required":true,"message":"必填项"}]},{"type":"select","label":"角色","options":{"width":"100%","multiple":true,"disabled":false,"clearable":false,"hidden":false,"placeholder":"请选择角色","dynamicKey":"roleAll","dynamic":true,"options":[{"value":"1","label":"下拉框1"},{"value":"2","label":"下拉框2"}],"showSearch":true},"model":"roleIds","key":"select_1615968040149","rules":[{"required":true,"message":"必填项"}]},{"type":"radio","label":"状态","options":{"disabled":false,"hidden":false,"defaultValue":"","dynamicKey":"state","dynamic":false,"options":[{"value":"0","label":"锁定"},{"value":"1","label":"正常"},{"value":"2","label":"离职"}]},"model":"state","key":"radio_1615968086357","rules":[{"required":true,"message":"必填项"}]},{"type":"radio","label":"性别","options":{"disabled":false,"hidden":false,"defaultValue":"","dynamicKey":"gender","dynamic":false,"options":[{"value":"1","label":"男"},{"value":"2","label":"女"},{"value":"0","label":"其它"}]},"model":"gender","key":"radio_1615967627656","rules":[{"required":true,"message":"必填项"}]},{"type":"uploadImg","label":"上传头像","options":{"defaultValue":"","multiple":false,"hidden":false,"disabled":false,"width":"100%","data":"{}","limit":1,"placeholder":"上传头像","fileName":"file","headers":{},"action":"/venus/resource/upload","listType":"picture-card"},"model":"avatar","key":"uploadImg_1615967449256","rules":[{"required":false,"message":"必填项"}]},{"type":"treeSelect","label":"部门","options":{"disabled":false,"multiple":false,"hidden":false,"clearable":true,"showSearch":false,"treeCheckable":false,"placeholder":"请选择部门","dynamicKey":"deptAll","dynamic":true,"options":[{"value":"1","label":"选项1","children":[{"value":"11","label":"选项11"}]},{"value":"2","label":"选项2","children":[{"value":"22","label":"选项22"}]}]},"model":"deptId","key":"treeSelect_1616135895760","help":"","prefix":"","suffix":"","rules":[{"required":false,"message":"必填项"}]},{"type":"input","label":"邮件地址","options":{"type":"text","width":"100%","defaultValue":"","placeholder":"请输入邮件地址","clearable":false,"maxLength":null,"hidden":false,"disabled":false},"model":"email","key":"input_1615967586276","rules":[{"required":true,"message":"必填项"}]},{"type":"radio","label":"登录身份","options":{"disabled":false,"hidden":false,"defaultValue":"","dynamicKey":"type","dynamic":false,"options":[{"value":"0","label":"普通用户"},{"value":"1","label":"管理员"}]},"model":"type","key":"radio_1615968199937","rules":[{"required":true,"message":"必填项"}]},{"type":"textarea","label":"座右铭","options":{"width":"100%","minRows":4,"maxRows":6,"maxLength":null,"defaultValue":"","clearable":false,"hidden":false,"disabled":false,"placeholder":"请输入座右铭"},"model":"motto","key":"textarea_1615967820561","rules":[{"required":false,"message":"必填项"}]}],"config":{"layout":"horizontal","labelCol":{"xs":4,"sm":4,"md":4,"lg":4,"xl":4,"xxl":4},"wrapperCol":{"xs":18,"sm":18,"md":18,"lg":18,"xl":18,"xxl":18},"hideRequiredMark":false,"customStyle":""}},
      // jsonData:{"list":[{"type":"input","label":"姓名","options":{"type":"text","width":"100%","defaultValue":"","placeholder":"请输入姓名","clearable":false,"maxLength":null,"hidden":false,"disabled":false},"model":"name","key":"input_1615967850620","rules":[{"required":true,"message":"必填项"}]},{"type":"input","label":"昵称","options":{"type":"text","width":"100%","defaultValue":"","placeholder":"请输入昵称","clearable":false,"maxLength":null,"hidden":false,"disabled":false},"model":"nickname","key":"input_1615967894648","rules":[{"required":false,"message":"必填项"}]},{"type":"input","label":"登录用户名","options":{"type":"text","width":"100%","defaultValue":"","placeholder":"请输入登录用户名","clearable":false,"maxLength":null,"hidden":false,"disabled":false},"model":"username","key":"input_1615968255737","rules":[{"required":false,"message":"必填项"}]},{"type":"input","label":"电话号码","options":{"type":"text","width":"100%","defaultValue":"","placeholder":"请输入手机号码","clearable":false,"maxLength":11,"hidden":false,"disabled":false},"model":"phone","key":"input_1615967987029","rules":[{"required":true,"message":"必填项"},{"pattern":"^1[0-9]{10}$","message":"请输入正确的手机号码"}]},{"type":"select","label":"职位","options":{"width":"100%","multiple":false,"disabled":false,"clearable":false,"hidden":false,"placeholder":"请选择职位","dynamicKey":"jobAll","dynamic":true,"options":[{"value":"1","label":"下拉框1"},{"value":"2","label":"下拉框2"}],"showSearch":false},"model":"professionId","key":"select_1616034696552","help":"","prefix":"","suffix":"","rules":[{"required":true,"message":"必填项"}]},{"type":"select","label":"角色","options":{"width":"100%","multiple":true,"disabled":false,"clearable":false,"hidden":false,"placeholder":"请选择角色","dynamicKey":"roleAll","dynamic":true,"options":[{"value":"1","label":"下拉框1"},{"value":"2","label":"下拉框2"}],"showSearch":true},"model":"roleIds","key":"select_1615968040149","rules":[{"required":true,"message":"必填项"}]},{"type":"radio","label":"状态","options":{"disabled":false,"hidden":false,"defaultValue":"","dynamicKey":"state","dynamic":false,"options":[{"value":"0","label":"锁定"},{"value":"1","label":"正常"},{"value":"2","label":"离职"}]},"model":"state","key":"radio_1615968086357","rules":[{"required":true,"message":"必填项"}]},{"type":"radio","label":"性别","options":{"disabled":false,"hidden":false,"defaultValue":"","dynamicKey":"gender","dynamic":false,"options":[{"value":"1","label":"男"},{"value":"2","label":"女"},{"value":"0","label":"其它"}]},"model":"gender","key":"radio_1615967627656","rules":[{"required":true,"message":"必填项"}]},{"type":"uploadImg","label":"上传头像","options":{"defaultValue":"","multiple":false,"hidden":false,"disabled":false,"width":"100%","data":"{}","limit":1,"placeholder":"上传头像","fileName":"file","headers":{},"action":"http://101.132.150.84:8891/api/plugin/upload","listType":"picture-card"},"model":"avatar","key":"uploadImg_1615967449256","rules":[{"required":false,"message":"必填项"}]},{"type":"treeSelect","label":"部门","options":{"disabled":false,"multiple":false,"hidden":false,"clearable":true,"showSearch":false,"treeCheckable":true,"placeholder":"请选择部门","dynamicKey":"deptAll","dynamic":true,"options":[{"value":"1","label":"选项1","children":[{"value":"11","label":"选项11"}]},{"value":"2","label":"选项2","children":[{"value":"22","label":"选项22"}]}]},"model":"deptId","key":"treeSelect_1616054878680","help":"","prefix":"","suffix":"","rules":[{"required":true,"message":"必填项"}]},{"type":"input","label":"邮件地址","options":{"type":"text","width":"100%","defaultValue":"","placeholder":"请输入邮件地址","clearable":false,"maxLength":null,"hidden":false,"disabled":false},"model":"email","key":"input_1615967586276","rules":[{"required":true,"message":"必填项"}]},{"type":"radio","label":"登录身份","options":{"disabled":false,"hidden":false,"defaultValue":"","dynamicKey":"type","dynamic":false,"options":[{"value":"0","label":"普通用户"},{"value":"1","label":"管理员"}]},"model":"type","key":"radio_1615968199937","rules":[{"required":true,"message":"必填项"}]},{"type":"textarea","label":"座右铭","options":{"width":"100%","minRows":4,"maxRows":6,"maxLength":null,"defaultValue":"","clearable":false,"hidden":false,"disabled":false,"placeholder":"请输入座右铭"},"model":"motto","key":"textarea_1615967820561","rules":[{"required":false,"message":"必填项"}]}],"config":{"layout":"horizontal","labelCol":{"xs":4,"sm":4,"md":4,"lg":4,"xl":4,"xxl":4},"wrapperCol":{"xs":18,"sm":18,"md":18,"lg":18,"xl":18,"xxl":18},"hideRequiredMark":false,"customStyle":""}},
      // jsonData: {"list":[{"type":"input","label":"姓名","options":{"type":"text","width":"100%","defaultValue":"","placeholder":"请输入姓名","clearable":false,"maxLength":null,"hidden":false,"disabled":false},"model":"name","key":"input_1615967850620","rules":[{"required":true,"message":"必填项"}]},{"type":"input","label":"昵称","options":{"type":"text","width":"100%","defaultValue":"","placeholder":"请输入昵称","clearable":false,"maxLength":null,"hidden":false,"disabled":false},"model":"nickname","key":"input_1615967894648","rules":[{"required":false,"message":"必填项"}]},{"type":"input","label":"登录用户名","options":{"type":"text","width":"100%","defaultValue":"","placeholder":"请输入登录用户名","clearable":false,"maxLength":null,"hidden":false,"disabled":false},"model":"username","key":"input_1615968255737","rules":[{"required":false,"message":"必填项"}]},{"type":"input","label":"电话号码","options":{"type":"text","width":"100%","defaultValue":"","placeholder":"请输入手机号码","clearable":false,"maxLength":11,"hidden":false,"disabled":false},"model":"phone","key":"input_1615967987029","rules":[{"required":true,"message":"必填项"},{"pattern":"^1[0-9]{10}$","message":"请输入正确的手机号码"}]},{"type":"select","label":"职位","options":{"width":"100%","multiple":false,"disabled":false,"clearable":false,"hidden":false,"placeholder":"请选择职位","dynamicKey":"jobAll","dynamic":true,"options":[{"value":"1","label":"下拉框1"},{"value":"2","label":"下拉框2"}],"showSearch":false},"model":"professionId","key":"select_1616034696552","help":"","prefix":"","suffix":"","rules":[{"required":true,"message":"必填项"}]},{"type":"select","label":"角色","options":{"width":"100%","multiple":true,"disabled":false,"clearable":false,"hidden":false,"placeholder":"请选择角色","dynamicKey":"roleAll","dynamic":true,"options":[{"value":"1","label":"下拉框1"},{"value":"2","label":"下拉框2"}],"showSearch":true},"model":"roleIds","key":"select_1615968040149","rules":[{"required":true,"message":"必填项"}]},{"type":"radio","label":"状态","options":{"disabled":false,"hidden":false,"defaultValue":"","dynamicKey":"state","dynamic":false,"options":[{"value":"0","label":"锁定"},{"value":"1","label":"正常"},{"value":"2","label":"离职"}]},"model":"state","key":"radio_1615968086357","rules":[{"required":true,"message":"必填项"}]},{"type":"radio","label":"性别","options":{"disabled":false,"hidden":false,"defaultValue":"","dynamicKey":"gender","dynamic":false,"options":[{"value":"1","label":"男"},{"value":"2","label":"女"},{"value":"0","label":"其它"}]},"model":"gender","key":"radio_1615967627656","rules":[{"required":true,"message":"必填项"}]},{"type":"uploadImg","label":"上传头像","options":{"defaultValue":"","multiple":false,"hidden":false,"disabled":false,"width":"100%","data":"{}","limit":1,"placeholder":"上传头像","fileName":"file","headers":{},"action":"http://101.132.150.84:8891/api/plugin/upload","listType":"picture-card"},"model":"avatar","key":"uploadImg_1615967449256","rules":[{"required":false,"message":"必填项"}]},{"type":"uploadImg","label":"企业微信二维码","options":{"defaultValue":"","multiple":false,"hidden":false,"disabled":false,"width":"100%","data":"{}","limit":1,"placeholder":"上传","fileName":"file","headers":{},"action":"http://101.132.150.84:8891/api/plugin/upload","listType":"picture-card"},"model":"cpQrCode","key":"uploadImg_1615967507399","rules":[{"required":false,"message":"必填项"}]},{"type":"input","label":"企业微信ID","options":{"type":"text","width":"100%","defaultValue":"","placeholder":"请输入企业微信ID","clearable":false,"maxLength":null,"hidden":false,"disabled":false},"model":"cpId","key":"input_1615967443767","rules":[{"required":false,"message":"必填项"}]},{"type":"select","label":"部门","options":{"width":"100%","multiple":false,"disabled":false,"clearable":false,"hidden":false,"placeholder":"请选择部门","dynamicKey":"deptAll","dynamic":true,"options":[{"value":"1","label":"下拉框1"},{"value":"2","label":"下拉框2"}],"showSearch":false},"model":"deptId","key":"select_1616039148612","help":"","prefix":"","suffix":"","rules":[{"required":true,"message":"必填项"}]},{"type":"input","label":"邮件地址","options":{"type":"text","width":"100%","defaultValue":"","placeholder":"请输入邮件地址","clearable":false,"maxLength":null,"hidden":false,"disabled":false},"model":"email","key":"input_1615967586276","rules":[{"required":true,"message":"必填项"}]},{"type":"radio","label":"权限","options":{"disabled":false,"hidden":false,"defaultValue":"","dynamicKey":"type","dynamic":false,"options":[{"value":"0","label":"普通用户"},{"value":"1","label":"管理员"}]},"model":"type","key":"radio_1615968199937","rules":[{"required":true,"message":"必填项"}]},{"type":"input","label":"码云ID","options":{"type":"text","width":"100%","defaultValue":"","placeholder":"请输入码云ID","clearable":false,"maxLength":null,"hidden":false,"disabled":false},"model":"gitId","key":"input_1615967698792","rules":[{"required":false,"message":"必填项"}]},{"type":"textarea","label":"座右铭","options":{"width":"100%","minRows":4,"maxRows":6,"maxLength":null,"defaultValue":"","clearable":false,"hidden":false,"disabled":false,"placeholder":"请输入座右铭"},"model":"motto","key":"textarea_1615967820561","rules":[{"required":false,"message":"必填项"}]}],"config":{"layout":"horizontal","labelCol":{"xs":4,"sm":4,"md":4,"lg":4,"xl":4,"xxl":4},"wrapperCol":{"xs":18,"sm":18,"md":18,"lg":18,"xl":18,"xxl":18},"hideRequiredMark":false,"customStyle":""}},
    }
  },
  created () {
    this.initialJobList()
    this.loadRoleAll()
    this.getDeptlist()
  },
  methods: {
    add () {
      this.visible = true
      this.$refs.KFB.reset()
    },
    edit (record) {
        let that = this
        this.visible = true
        this.id = record.id
        let user = JSON.parse(JSON.stringify(record));
        
        user.gender = user.gender+''
        user.state =  user.state+''
        user.type =  user.type+''
        user.avatar =  [
            {
              "type": "img",
              "name": "avatar.jpg",
              "status": "done",
              "uid": "vc-upload-1615973291253-3",
              "url":record.avatar
            }
          ]
        // user.cpQrCode =  [
        //     {
        //       "type": "img",
        //       "name": "cpQrCode.jpg",
        //       "status": "done",
        //       "uid": "vc-upload-1615973291253-5",
        //       "url":record.cpQrCode
        //     }
        //   ]
        getUserRoles({userId:record.id}).then(res => {
          if (res.code == 200) {
            let idAll = []
            res.data.map(item=> {
              idAll.push(item.id)
            })

            user.roleIds = idAll
            that.$nextTick(() => {
              that.$refs.KFB.setData(user)
            })
          }
        })

    },
    handleCancel() {
      this.close()
    },
    handleOk() {
      // 通过函数获取数据
      let that = this
       this.$refs.KFB.getData().then(res => {
         console.log(res)
         res.gender = parseInt(res.gender)
         res.state =  parseInt(res.state)
         res.type =  parseInt(res.type)
         res.avatar = res.avatar && res.avatar.length>0 ? res.avatar[0].url:''
        //  res.cpQrCode = res.cpQrCode && res.cpQrCode.length>0 ? res.cpQrCode[0].url:''
        //  res.deptId = parseInt(res.deptId)
         res.id = that.id
         console.log(res)
         // 获取数据成功
          let Action = [addUser,editUser]
          let index = that.isadd?0:1
          Action[index]({...res,id:that.id}).then(ret=>{
            if(ret.code==200){
              that.$message.success('操作成功')
              that.close()
              that.$emit('ok')
            }
          })
       })
         .catch(err => {
           console.log(err, '校验失败')
         }) 
    },
    handleChange(value, key){
      console.log(value, key)
    },
    close() {
      this.$emit('close')
      this.visible = false
    },
    initialJobList () {
        queryJobAll().then((res) => {
          if (res.code == 200) {
            // this.jobList = res.data.records
            let newjob = []
            res.data.records.map(item=> {
              newjob.push({value:item.id,label:item.name})
            })
            this.jobList = newjob
            this.dynamicData.jobAll=newjob
          } else {
            console.log(res.message)
          }
        })
     },
    loadRoleAll () {
      getRoleAll().then(res => {
        if (res.code == 200) {
          let newrole = []
          res.data.records.map(item=> {
            newrole.push({value:item.id,label:item.name})
          })
          this.dynamicData.roleAll=newrole
        }
      })
    },
    getDeptlist(){
      getDeptlist().then(res => {
        if (res.code == 200) {
          console.log(res)
          let newdept = []
          res.data.map(item=> {
            if(item.children && item.children.length >0){
              item.children.map(b=>{
                if(b.children && b.children.length >0){
                  b.children.map(c=> {
                    newdept.push({value:c.id,label:c.name})
                  })
                }else{
                  newdept.push({value:b.id,label:b.name})
                }
              })
            }else{
              newdept.push({value:item.id,label:item.name})
            }
          })
          console.log(newdept)
          // this.dynamicData.deptAll=newdept
          this.dynamicData.deptAll= res.data
        }
      })
    }
    
  }
}
</script>
