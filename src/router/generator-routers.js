// eslint-disable-next-line
import * as loginService from '@/api/login'
// eslint-disable-next-line
import { BasicLayout, BlankLayout, PageView, RouteView, IframePageView,UserLayout} from '@/layouts'
import { login} from '@api/login'
// 前端路由表
const constantRouterComponents = {
    // 基础页面 layout 必须引入
    BasicLayout: BasicLayout,
    BlankLayout: BlankLayout,
    RouteView: RouteView,
    PageView: PageView,
    UserLayout: UserLayout,
    IframePageView: IframePageView,
    '403': () =>
        import (/* webpackChunkName: "error" */ '@/views/exception/403'),
    '404': () =>
        import (/* webpackChunkName: "error" */ '@/views/exception/404'),
    '500': () =>
        import (/* webpackChunkName: "error" */ '@/views/exception/500'),
        
}

// 前端未找到页面路由（固定不用改）
const notFoundRouter = {
    path: '*',
    redirect: '/',
    hidden: true
}

// 前端未403
const noAuth = {
    path: '/403',
    redirect: '',
    hidden: true,
    component: () => import (/* webpackChunkName: "error" */ '@/views/exception/403'),
}
const exceptErro = {
    path: '/500',
    redirect: '',
    hidden: true,
    component: () => import (/* webpackChunkName: "error" */ '@/views/exception/500'),
}
//login
const LoginPage = {
  path: '/login',
  redirect: '',
  hidden: false,
  component: () => import (/* webpackChunkName: "error" */ '@/views/user/Login.vue'),
}

// 根级菜单
const rootRouter = {
    key: '',
    name: 'index',
    path: '/',
    component: 'BasicLayout',
    redirect: '/monitor/mapcenter',
	  // redirect: '/dashboard/workplace',
    meta: {
        title: '首页'
    },
    children: [],
}

/**
 * 动态生成菜单
 * @returns {Promise<Router>}
 */
export const generatorDynamicRouter = () => {
    return new Promise((resolve, reject) => {
        loginService.getCurrentUserNav().then(res => {
            const data = res.data
            const menuNav = []
            const childrenNav = []
            listToTree(data, childrenNav, 0)
            rootRouter.children = childrenNav
            menuNav.push(rootRouter)
            const routers = generator(menuNav)
            routers.push(notFoundRouter)
            routers.push(noAuth)
            routers.push(exceptErro)
            resolve(routers)
        }).catch(err => {
            reject(err)
        })
    })
}

/**
 * 格式化树形结构数据 生成 vue-router 层级路由表
 *
 * @param routerMap
 * @param parent
 * @returns {*}
 */
export const generator = (routerMap, parent) => {
    return routerMap.map(item => {
        const currentRouter = {
                // 路由地址 动态拼接生成如 /dashboard/workplace
                path: item.path || `/${item.key}`,
                // 路由名称，建议唯一
                name: item.name || item.key || '',
                // 该路由对应页面的 组件 优先根据组件名或者key从constantRouterComponents获取，没有则通过组件名地址查询
                component: (constantRouterComponents[item.component || item.key]) || (() =>
                    import (`@/views/${item.component}`)),
                hideChildrenInMenu: item.hideChildrenInMenu || false,
                // meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
                meta: { title: item.title || item.meta.title, icon: item.icon || undefined, hiddenHeaderContent: item.hiddenHeaderContent || false, target: item.target }
            }
            // 隐藏菜单
        if (item.hidden) {
            currentRouter.hidden = true
        }
        // 是否设置了隐藏子菜单
        if (item.hideChildrenInMenu) {
            currentRouter.hideChildrenInMenu = true
        }
        // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
        if (!currentRouter.path.startsWith('http')) {
            currentRouter.path = currentRouter.path.replace('//', '/')
        }
        // 重定向
        item.redirect && (currentRouter.redirect = item.redirect)
            // 是否有子菜单，并递归处理
        if (item.children && item.children.length > 0) {
            // Recursion
            currentRouter.children = generator(item.children, currentRouter)
        }
        return currentRouter
    })
}

/**
 * 数组转树形结构
 * @param list 源数组
 * @param tree 树
 * @param parentId 父ID
 */
const listToTree = (list, tree, parentId) => {
    list.forEach(item => {
        if (item.parentId === parentId) {
            var child = {
                title: item.name,
                key: item.componentName,
                icon: item.icon,
                hidden: item.visible === 0,
                path: item.path && item.path.length > 0 ? item.path : undefined,
                component: item.component,
                redirect: item.redirectUrl,
                target: item.target,
                hideChildrenInMenu: false,
                children: []
            }
            listToTree(list, child.children, item.id)
            if (child.children.length === 0) {
                delete child.children
            }
            tree.push(child)
        }
    })
}
