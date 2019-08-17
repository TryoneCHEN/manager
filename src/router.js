// 导入vue
import Vue from 'vue'
// 导入VueRouter
import VueRouter from 'vue-router'
// use一下
Vue.use(VueRouter)

// 导入组件
// import login from './components/login.vue'
import index from './components/index.vue'

//嵌套路由
// import users from './components/users.vue'
import roles from './components/roles.vue'
import rights from './components/rights.vue'
import goods from './components/goods.vue'
import params from './components/params.vue'
import categories from './components/categories.vue'
import orders from './components/orders.vue'
import reports from './components/reports.vue'
import error from './components/error.vue'

import goodsAdd from './components/goodsAdd.vue'
import goodsList from './components/goodsList.vue'

// 路由规则
const routes = [
  {
      path:"/login",
      component:()=>import(/* webpackChunkName: "login" */ './components/login.vue')
  },
  {
    path:"/",  
    component:()=>import(/* webpackChunkName: "index" */ './components/index.vue'),
    children: [
      {path:"/",
      redirect:"/users"
      },
      {
        path: 'users', // 匹配的规则是 /users
        component: ()=>import(/* webpackChunkName: "users" */ './components/users.vue')
      },
      {
        path: 'roles', // 匹配的规则是 /roles
        component: roles
      },
      {
        path: 'rights', // 匹配的规则是 /rights
        component: rights
      },
      {
        path: 'goods', // 匹配的规则是 /goods
        component: goods,
        children:[
          {
            path: 'goodsAdd', // 匹配的规则是 /goodsAdd
            component: goodsAdd
          },
          {
            path: '', // 匹配的规则是 /goodsList
            component: goodsList
          }
        ]
      },
      {
        path: 'params', // 匹配的规则是 /params
        component: params
      },
      {
        path: 'categories', // 匹配的规则是 /categories
        component: categories
      },
      {
        path: 'orders', // 匹配的规则是 /orders
        component: orders
      },
      {
        path: 'reports', // 匹配的规则是 /reports
        component: reports
      },
      // 错误页
      {
        path:'error',
        component:error
      }
    ]
  }
]

// 实例化路由对象
const router = new VueRouter({
  mode: 'history',
  routes
})

// 注册导航守卫（前置守卫） 钩子函数 回调函数
// 路由切换之前执行 如果内部什么都不干，组件是无法渲染的
router.beforeEach((to, from, next) => {
  // 去的路由
  // console.log(to)
  // // // 来的路由
  // console.log(from)
  if(to.matched.length==0){
    // 不存在
    next('error')
  }else{
    // 必须要执行 不执行跟node.js中的中间件一样 不会往后走了
    next()
  }
})


// 暴露出去
export default router
