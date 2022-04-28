import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views/Manage.vue'),
    name: '系统',
    redirect: "/home",
    children: [
      {
        path: 'home',
        name: '首页',
        component: () => import('../views/Home.vue'),
        meta: {title: '首页'}
      },
      {
        path: 'disManage',
        name: '配送管理',
        component: {render(c) { return c('router-view')}},
        redirect: "disManage/distributionSites",
        children: [
          {
            path: 'distributionSites',
            name: '初始点配送管理',
            component: () => import('../views/dis_manage/DistributionSites.vue'),
            meta: {title: '初始点配送管理'},
          },
          {
            path: 'distributionSites/distributing',
            name: '配送时管理',
            component: () => import('../views/dis_manage/Distributing.vue'),
            meta: {title: '配送时管理'}
          }
        ]
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next) => {
  localStorage.setItem("currentPathName", to.name) // 设置当前的路由名称,为了在header组件中去使用
  store.commit("setPath") // 触发store的数据更新
  next() // 放行路由
})

export default router
