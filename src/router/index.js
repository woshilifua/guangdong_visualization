import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/resources/overview'
  },


  {
    path: '/resources',
    component: Layout,
    redirect: '/resources/overview',
    name: 'Resources',
    meta: { title: '资源分布', icon: 'example' },
    children: [
      {
        path: '/resources/overview',
        name: 'Overview',
        component: () => import('@/views/resource/overview'),
        meta: {
          title: '企业分布', icon: 'table'
        }
      },
      {
        path: '/resources/company',
        name: 'Company',
        component: () => import('@/views/resource/distribution'),
        meta: { title: '集聚建筑分布', icon: 'table' }
      },
      {
        path: '/resources/format',
        name: 'Format',
        component: () => import('@/views/resource/distribution'),
        meta: {
          title: '服务业态分布', icon: 'table'
        }
      },
      {
        path: '/resources/income',
        name: 'Income',
        component: () => import('@/views/resource/distribution'),
        meta: { title: '收入分布', icon: 'table' }
      }
    ]
  },

  {
    path: '/marketing',
    component: Layout,
    name: 'Marketing',
    redirect: '/marketing/overview',
    meta: { title: '营销拓展', icon: 'example' },
    children: [{
      path: '/marketing/overview',
      name: 'Expand',
      component: () => import('@/views/marketing/overview'),
      meta: { title: '客户概况', icon: 'table' }
    },
    {
      path: '/marketing/expand',
      name: 'Expand',
      component: () => import('@/views/marketing/expand'),
      meta: { title: '业态类型', icon: 'table' }
    },
    {
      path: 'theme',
      name: 'Theme',
      component: () => import('@/views/marketing/theme'),
      meta: { title: '主题活动', icon: 'table' }
    }
    ]
  },

  {
    path: '/task',
    component: Layout,
    redirect: '/task/decomposition',
    name: 'Task',
    meta: { icon: 'example' },
    children: [
      {
        path: 'decomposition',
        name: 'Decomposition',
        component: () => import('@/views/task/decomposition'),
        meta: { title: '任务分解', icon: 'table' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
