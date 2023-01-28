<template>
  <a-card >


    <gantt-elastic
      :options="options"
      :tasks="tasks"
      @tasks-changed="tasksUpdate"
      @options-changed="optionsUpdate"
      @dynamic-style-changed="styleUpdate"
    >
      <gantt-header @add="newAdd" :options="options" slot="header"></gantt-header>
    </gantt-elastic>
  </a-card>
</template>

<style>
</style>

<script>
import GanttElastic from 'gantt-elastic'
import GanttHeader from './GanttHead'
import moment from 'moment'

function getDate(hours) {
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth()
  const currentDay = currentDate.getDate()
  const timeStamp = new Date(currentYear, currentMonth, currentDay, 0, 0, 0).getTime()
  return new Date(timeStamp + hours * 60 * 60 * 1000).getTime()
}
let tasks = [
  {
    id: 1,
    label: '创建项目',
    user: '<a href="https://www.google.com/search?q=John+Doe" target="_blank" style="color:#0077c0;">龚涛</a>',
    start: getDate(-24 * 5),
    duration: 15 * 24 * 60 * 60 * 1000,
    percent: 85,
    type: 'project',
    //collapsed: true,
    action:'<img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=333860007,4165654887&fm=26&gp=0.jpg"/ style="width:20px">'
  },
  {
    id: 2,
    label: '需求分析',
    user:
      '<a href="https://www.google.com/search?q=Peter+Parker" target="_blank" style="color:#0077c0;">熊伟</a>',
    parentId: 1,
    start: getDate(-24 * 4),
    duration: 4 * 24 * 60 * 60 * 1000,
    percent: 50,
    type: 'milestone',
    collapsed: true,
    action:'<img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=333860007,4165654887&fm=26&gp=0.jpg"/ style="width:20px">',
    style: {
      base: {
        fill: '#1EBC61',
        stroke: '#0EAC51',
      },
    },
  },
  {
    id: 3,
    label: '搬砖1',
    user:'<a href="/teamwork/menber" target="_blank" style="color:#0077c0;">李群</a>',
    parentId: 2,
    start: getDate(-24 * 3),
    duration: 2 * 24 * 60 * 60 * 1000,
    percent: 100,
    type: 'task',
  },
  {
    id: 4,
    label: '搬砖1',
    user:'<a href="/teamwork/menber" target="_blank" style="color:#0077c0;">李群</a>',
    start: getDate(-24 * 2),
    duration: 2 * 24 * 60 * 60 * 1000,
    percent: 70,
    type: 'task',
    dependentOn: [3],
  },
  {
    id: 5,
    label: '建了个厕所',
    user:'<a href="/teamwork/menber" target="_blank" style="color:#0077c0;">李群</a>',
    parentId: 4,
    start: getDate(0),
    duration: 2 * 24 * 60 * 60 * 1000,
    percent: 10,
    type: 'milestone',
    style: {
      base: {
        fill: '#0287D0',
        stroke: '#0077C0',
      },
    },
  },
  {
    id: 6,
    label: '搬砖1',
    user:'<a href="/teamwork/menber" target="_blank" style="color:#0077c0;">李群</a>',
    parentId: 5,
    start: getDate(24),
    duration: 1 * 24 * 60 * 60 * 1000,
    percent: 50,
    type: 'task',
    collapsed: true,
    style: {
      base: {
        fill: '#8E44AD',
        stroke: '#7E349D',
      },
    },
  },
  {
    id: 7,
    label: '搬砖1',
    user:'<a href="/teamwork/menber" target="_blank" style="color:#0077c0;">李群</a>',
    parentId: 2,
    dependentOn: [6],
    start: getDate(24 * 2),
    duration: 4 * 60 * 60 * 1000,
    percent: 20,
    type: 'task',
    collapsed: true,
  },
  {
    id: 8,
    label: '搬砖1',
    user:'<a href="/teamwork/menber" target="_blank" style="color:#0077c0;">李群</a>',
    parentId: 7,
    dependentOn: [7],
    start: getDate(24 * 3),
    duration: 1 * 24 * 60 * 60 * 1000,
    percent: 0,
    type: 'task',
  },
  {
    id: 9,
    label: '搬砖1',
    user:'<a href="/teamwork/menber" target="_blank" style="color:#0077c0;">李群</a>',
    parentId: 8,
    dependentOn: [8, 7],
    start: getDate(24 * 4),
    duration: 4 * 60 * 60 * 1000,
    percent: 20,
    type: 'task',
    style: {
      base: {
        fill: '#8E44AD',
        stroke: '#7E349D',
      },
    },
  },
  {
    id: 10,
    label: '搬砖1',
    user:'<a href="/teamwork/menber" target="_blank" style="color:#0077c0;">李群</a>',
    start: getDate(24 * 5),
    duration: 24 * 60 * 60 * 1000,
    percent: 0,
    type: 'task',
  },
  {
    id: 11,
    label: '搬砖1',
    user:'<a href="/teamwork/menber" target="_blank" style="color:#0077c0;">李群</a>',
    start: getDate(24 * 6),
    duration: 24 * 60 * 60 * 1000,
    percent: 0,
    type: 'task',
  },
  {
    id: 12,
    label: '搬砖1',
    user:'<a href="/teamwork/menber" target="_blank" style="color:#0077c0;">李群</a>',
    start: getDate(24 * 7),
    duration: 24 * 60 * 60 * 1000,
    percent: 0,
    type: 'task',
    parentId: 11,
  },
  {
    id: 13,
    label: '搬砖1',
    user:'<a href="/teamwork/menber" target="_blank" style="color:#0077c0;">李群</a>',
    start: getDate(24 * 8),
    duration: 24 * 60 * 60 * 1000,
    percent: 0,
    type: 'task',
  },
  {
    id: 14,
    label: '搬砖1',
    user:'<a href="/teamwork/menber" target="_blank" style="color:#0077c0;">李群</a>',
    start: getDate(24 * 9),
    duration: 24 * 60 * 60 * 1000,
    percent: 0,
    type: 'task',
  },
  {
    id: 15,
    label: '搬砖1',
    user:'<a href="/teamwork/menber" target="_blank" style="color:#0077c0;">李群</a>',
    start: getDate(24 * 16),
    duration: 24 * 60 * 60 * 1000,
    percent: 0,
    type: 'task',
  },
]
let this_ = this;
let options = {
  taskMapping: {
    progress: 'percent',
  },
  maxRows: 100,
  maxHeight: 500,
  title: {
    label: '项目甘特图',
    html: false,
  },
  row: {
    height: 24,
  },
  calendar: {
    hour: {
      display: true,
    },
  },
  chart: {
    progress: {
      bar: false,
    },
    expander: {
      display: true,
    },
  },
  taskList: {
    expander: {
      straight: false,
    },
    columns: [
      {
        id: 1,
        label: 'ID',
        value: 'id',
        width: 40,
      },
      {
        id: 2,
        label: '描述',
        value: 'label',
        width: 200,
        expander: true,
        html: true,
        events: {
          click({ data, column }) {
            if(!data.parentId){console.log('这是顶层')}
            // this_.$router.push({ path: '/product/produce/index' })
            alert('description clicked!\n' + data.label)
          },
        },
      },
      {
        id: 3,
        label: '分配给',
        value: 'user',
        width: 130,
        html: true,
      },
      {
        id: 3,
        label: '开始',
        value: (task) => moment(task.start).format('YYYY-MM-DD'),
        width: 78,
      },
      {
        id: 4,
        label: '类型',
        value: 'type',
        width: 68,
        value:(task)=>{
          if(task.type=='project'){
            return '项目'
          }else if(task.type=='task'){
            return '任务'
          }else{
            return '里程碑'
          }
        }
      },
      {
        id: 5,
        label: '%',
        value: 'progress',
        width: 35,
        style: {
          'task-list-header-label': {
            'text-align': 'center',
            width: '100%',
          },
          'task-list-item-value-container': {
            'text-align': 'center',
            width: '100%',
          },
        },
      },
       {
        id: 4,
        label: '操作',
        value: 'action',
        width: 68,
        html: true,
      },
    ],
  },
  locale: {
    name: 'en',
    Now: '回到现在',
    weekdays: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    'X-Scale': 'X缩放',
    'Y-Scale': 'Y缩放',
    'Task list width': '列表宽度',
    'Before/After': '延展',
    'Display task list': '列表显示',
  },
}
export default {
  name: 'Gantt',
  components: {
    GanttElastic,
    GanttHeader,
  },
  data() {
    return {
      tasks,
      options,
      dynamicStyle: {},
      lastId: 16,
    }
  },
  methods: {
    moment,
    newAdd(e){
      this.$emit('add',e)
    },
    addTask() {
      this.tasks.push({
        id: this.lastId++,
        label:
          '<a href="https://images.pexels.com/photos/423364/pexels-photo-423364.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" target="_blank" style="color:#0077c0;">Yeaahh! you have added a task bro!</a>',
        user:
          '<a href="https://images.pexels.com/photos/423364/pexels-photo-423364.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" target="_blank" style="color:#0077c0;">Awesome!</a>',
        start: getDate(24 * 3),
        duration: 1 * 24 * 60 * 60 * 1000,
        percent: 50,
        type: 'project',
      })
    },
    tasksUpdate(tasks) {
      this.tasks = tasks
    },
    optionsUpdate(options) {
      this.options = options
    },
    styleUpdate(style) {
      this.dynamicStyle = style
    },
  },
}
</script>