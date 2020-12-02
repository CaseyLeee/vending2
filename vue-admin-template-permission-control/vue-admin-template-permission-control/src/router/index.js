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
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
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
    // redirect: '/dashboard',
    // children: [{
    //   path: 'dashboard',
    //   name: 'Dashboard',
    //   component: () => import('@/views/dashboard/index'),
    //   meta: { title: '营销数据', icon: 'dashboard' }
    // }]
  },

  {
    path: '/goodsmanage',
    component: Layout,
    redirect: '/goodsmanage/goodslist',
    name: 'goodsmanage',
    meta: { title: '商品管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'goodslist',
        name: 'goodslist',
        component: () => import('@/views/goodsmanage/goodslist'),
        meta: { title: '商品列表', icon: 'table' }
      },
      {
        path: 'goodsadd',
        name: 'goodsadd',
        component: () => import('@/views/goodsmanage/goodsadd'),
        meta: { title: '商品添加', icon: 'table' }
      },
      {
        path: 'goodsedit',
        name: 'goodsedit',
        component: () => import('@/views/goodsmanage/goodsadd'),
        meta: { title: '商品编辑', icon: 'table' },
        hidden: true
      }
    ]
  },

  {
    path: '/countermanage',
    component: Layout,
    redirect: '/countermanage/counterlist',
    name: 'countermanage',
    meta: { title: '货柜管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'counterlist',
        name: 'counterlist',
        component: () => import('@/views/countermanage/counterlist'),
        meta: { title: '货柜列表', icon: 'table' }
      },
      {
        path: 'counteradd',
        name: 'counteradd',
        component: () => import('@/views/countermanage/counteradd'),
        meta: { title: '货柜添加', icon: 'table' }
      },
      {
        path: 'counteredit',
        name: 'counteredit',
        component: () => import('@/views/countermanage/counteradd'),
        meta: { title: '货柜编辑', icon: 'table' },
        hidden: true
      }
    ]
  },
  {
    path: '/tenantsmanage',
    component: Layout,
    redirect: '/tenantsmanage/tenantslist',
    name: 'tenantsmanage',
    meta: { title: '账户管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'tenantslist',
        name: 'tenantslist',
        component: () => import('@/views/tenantsmanage/tenantslist'),
        meta: { title: '账户列表', icon: 'table' }
      },
      {
        path: 'tenantsadd',
        name: 'tenantsadd',
        component: () => import('@/views/tenantsmanage/tenantsadd'),
        meta: { title: '账户添加', icon: 'table' }
      },
      {
        path: 'tenantsedit',
        name: 'tenantsedit',
        component: () => import('@/views/tenantsmanage/tenantsadd'),
        meta: { title: '账户编辑', icon: 'table' },
        hidden: true
      },
    ]
  },
  {
    path: '/rootmanege',
    component: Layout,
    redirect: '/rootmanage/rootbind',
    name: 'rootmanege',
    meta: { title: '设备管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'rootbind',
        name: 'rootbind',
        component: () => import('@/views/rootmanage/rootbind'),
        meta: { title: '设备商品绑定', icon: 'table' }
      },
      {
        path: 'rootadd',
        name: 'rootadd',
        component: () => import('@/views/rootmanage/rootadd'),
        meta: { title: '设备添加', icon: 'table' }
      },
      {
        path: 'rootlist',
        name: 'rootlist',
        component: () => import('@/views/rootmanage/rootlist'),
        meta: { title: '设备列表', icon: 'table' }
      }
    
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

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
