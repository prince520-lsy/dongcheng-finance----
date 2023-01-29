// eslint-disable-next-line
import { UserLayout, BasicLayout, BlankLayout } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

const RouteView = {
  name: 'RouteView',
  render: h => h('router-view')
}

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'menu.home' },
    redirect: '/dashboard/workplace',
    children: [
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/workplace',
        component: RouteView,
        meta: { title: 'menu.dashboard', keepAlive: true, icon: bxAnaalyse, permission: ['dashboard'] },
        children: [
          {
            path: '/dashboard/analysis/:pageNo([1-9]\\d*)?',
            name: 'Analysis',
            component: () => import('@/views/dashboard/Analysis'),
            meta: { title: 'menu.dashboard.analysis', keepAlive: false, permission: ['dashboard'] }
          },
          // 外部链接
          {
            path: 'https://www.baidu.com/',
            name: 'Monitor',
            meta: { title: 'menu.dashboard.monitor', target: '_blank' }
          },
          {
            path: '/dashboard/workplace',
            name: 'Workplace',
            component: () => import('@/views/dashboard/Workplace'),
            meta: { title: 'menu.dashboard.workplace', keepAlive: true, permission: ['dashboard'] }
          }
        ]
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 静态基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
			{
			  path: 'amend',
			  name: 'amend',
			  component: () => import(/* webpackChunkName: "user" */ '@/views/user/AmendPas')
			},
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'menu.home' },
    redirect: '/sales',
    children: [
      // dashboard  
      { //视频操作
        path: '/echarts',
        component: RouteView,
        hidden: false,
        meta: { title: '图表',icon:'area-chart' },
        children: [
          {
            path: 'operate',
            name: 'operate',
            component: () => import(/* webpackChunkName: "user" */ '@/views/echarts/operate'),
            meta: { title: '经营报表'}
          }
        ]
      },
      {
        path: '/sales',
        name: 'sales',
        component: () => import('@/views/sales'),
        meta: { title: '销售',icon:'fund'},
      },
      {
        path: '/purchase',
        name: 'purchase',
        component: () => import('@/views/purchase'),
        meta: { title: '采购',icon:'shopping-cart'},
      },
      {
        path: '/produce',
        name: 'produce',
        component: () => import('@/views/produce'),
        meta: { title: '生产',icon:'setting'},
      },
      {
        path: '/assets',
        name: 'assets',
        component: RouteView,
        // component: () => import('@/views/assets'),
        meta: { title: '资产',icon:'dollar'},
        children: [
          {
            path: '/assets',
            name: 'assets',
            component: () => import(/* webpackChunkName: "user" */ '@/views/assets'),
            meta: { title: '资金'}
          },{
            path: '/assets/stock',
            name: 'stock',
            component: () => import(/* webpackChunkName: "user" */ '@/views/assets/stock'),
            meta: { title: '存货'}
          },{
            path: '/assets/other',
            name: 'other',
            component: () => import(/* webpackChunkName: "user" */ '@/views/assets/other'),
            meta: { title: '其它'}
          }
        ]
      },
      {
        path: '/operate',
        name: 'operate',
        component: RouteView,
        // component: () => import('@/views/operate'),
        meta: { title: '经营',icon:'shop'},
        children: [
          {
            path: '/operate',
            name: 'operate',
            component: () => import(/* webpackChunkName: "user" */ '@/views/operate'),
            meta: { title: '经营'}
          },
          {
            path: '/operate/expenses',
            name: 'expenses',
            component: () => import(/* webpackChunkName: "user" */ '@/views/operate/expenses'),
            meta: { title: '费用金额情况'}
          }
        ]
      },
      // {
      //   path: '/financeAnaly/debt',
      //   name: 'debt',
      //   component: RouteView,
      //   // component: () => import('@/views/financeAnaly'),
      //   meta: { title: '财务分析',icon:'bar-chart'},
      //   children: [
      //     {
      //       path: '/debt',
      //       name: 'debt',
      //       component: () => import(/* webpackChunkName: "user" */ '@/views/financeAnaly/debt'),
      //       meta: { title: '资产负债表'}
      //     },
      //     {
      //       path: '/financeAnaly/profit',
      //       name: 'profit',
      //       component: () => import(/* webpackChunkName: "user" */ '@/views/financeAnaly/profit'),
      //       meta: { title: '利润表'}
      //     },
      //     {
      //       path: '/financeAnaly/cashFlow',
      //       name: 'cashFlow',
      //       component: () => import(/* webpackChunkName: "user" */ '@/views/financeAnaly/cashFlow'),
      //       meta: { title: '现金流量表'}
      //     },
      //     {
      //       path: '/financeAnaly/report',
      //       name: 'report',
      //       component: () => import(/* webpackChunkName: "user" */ '@/views/financeAnaly/report'),
      //       meta: { title: '历年报表'}
      //     }
      //   ]
      // },
      {
        path: '/FinanceAnalysis/debt',
        name: 'debt',
        component: RouteView,
        // component: () => import('@/views/financeAnaly'),
        meta: { title: '财务分析',icon:'bar-chart'},
        children: [
          {
            path: '/income',
            name: 'incom',
            component: () => import(/* webpackChunkName: "user" */ '@/views/FinanceAnalysis/incom.vue'),
            meta: { title: '收入承包费用分析'}
          },
          {
            path: '/industry',
            name: 'industry',
            component: () => import(/* webpackChunkName: "user" */ '@/views/FinanceAnalysis/industry.vue'),
            meta: { title: '行业绩效评价'}
          },
          {
            path: '/financePropor',
            name: 'financePropor',
            component: () => import(/* webpackChunkName: "user" */ '@/views/FinanceAnalysis/financePropor.vue'),
            meta: { title: '财务比例分析'}
          },
          {
            path: '/taxRisk',
            name: 'taxRisk',
            component: () => import(/* webpackChunkName: "user" */ '@/views/FinanceAnalysis/taxRisk.vue'),
            meta: { title: '税务风险评估分析'}
          },

          {
            path: '/incomCost',
            name: 'incomCost',
            component: () => import(/* webpackChunkName: "user" */ '@/views/FinanceAnalysis/incomCost.vue'),
            meta: { title: '收入成本费用分析'}
          },
        ]
      },
      {
        path: '/indexAnaly',
        name: 'indexAnaly',
        component: () => import('@/views/indexAnaly'),
        meta: { title: '指标分析',icon:'rise'},
      },
      {
        path: '/duPontAnaly',
        name: 'duPontAnaly',
        component: () => import('@/views/duPontAnaly'),
        meta: { title: '杜邦分析',icon:'apartment'},
      },
    ]
  },
  
  
 
  {
    path: '/404',
    hidden: true,
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  },
  {
    path: '/500',
    hidden: true,
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500')
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]
