import Vue from 'vue'
import  VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    // 导航栏
    {
        path:'/layout',
        // 路由重定向，就是用来显示进layout后的默认页面
        redirect: '/begin',
        component: () => import('@/views/layout'),
        // 路由嵌套，避免写多个页面以及加载新页面，直接在layout中用router-view路由出口
        children: [
            {
                path: '/begin',
                component: () => import('@/views/begin'),
                meta: {
                    requiresAuth: true// 要求验证的页面
                }
            },
            {
                path: '/home',
                component: () => import('@/views/home'),
                meta: {
                    requiresAuth: true // 要求验证的页面
                }
            },
            {
                path: '/cart',
                component: () => import('@/views/cart'),
                meta: {
                    requiresAuth: true // 要求验证的页面
                }
            },
            {
                path: '/record',
                component: () => import('@/views/record'),
                meta: {
                    requiresAuth: true // 要求验证的页面
                }
            },
            {
                path: '/chat',
                redirect: '/chat/default',
                component: () => import('@/views/chat/index'),
                children: [
                    {
                        path: '/chat/default',
                        component: () => import('@/views/chat/default'),
                        meta: {
                            requiresAuth: true // 要求验证的页面
                        }
                    },
                    {
                        path: '/chat/personalSet',
                        component: () => import('@/views/chat/personalSet'),
                        meta: {
                            requiresAuth: true // 要求验证的页面
                        }
                    },
                    {
                        path: '/chat/Contact',
                        component: () => import('@/views/chat/contact'),
                        meta: {
                            requiresAuth: true // 要求验证的页面
                        }
                    },
                ]
            },
            {
                path: '/about',
                component: () => import('@/views/about'),
                meta: {
                    requiresAuth: true // 要求验证的页面
                }
            },
        ]
    },
    // 登录页
    {
        path: '/', redirect: '/login'
    },
    {
        path: '/login',
        component: () => import('@/views/login'),
    },
    // 书籍分类知识类
    {
        path: '/knowledge/books',
        component: () => import('@/views/sort/knowledge/knowledge'),
        meta: {
            requiresAuth: true // 要求验证的页面
        }
    },
    // 知识类详情页
    {
        path: '/knowledge/books/detail',
        component : () => import('@/views/sort/knowledge/detail'),
        meta: {
            requiresAuth: true // 要求验证的页面
        }
    },
    // 404 页面
    {
        name: '404',
        path: '/error',
        component:resolve => require(['../views/error/index'], resolve)
    },
    {
        path: '*',
        redirect: {
            name: "404"
        }
    },
    // 历史订单
    {
        path: '/orderHistory/all',
        component: () => import('@/views/order/index'),
        meta: {
            requiresAuth: true // 要求验证的页面
        }
    },
    // 支付成功返回的页面
    {
        path: '/cart/completed',
        component: () => import('@/views/pay/index'),
        meta: {
            requiresAuth: true // 要求验证的页面
        }
    },
    // 聊天页面
    {
        path: '/chat',
        redirect: '/chat/default',
        component: () => import('@/views/chat/index'),
        children: [
            {
                path: '/chat/default',
                component: () => import('@/views/chat/default'),
                meta: {
                    requiresAuth: true // 要求验证的页面
                }
            },
            {
                path: '/chat/personalSet',
                component: () => import('@/views/chat/personalSet'),
                meta: {
                    requiresAuth: true // 要求验证的页面
                }
            }
        ]
    },
    // 文章详情页面
    {
        path: '/record/detail/:id',
        redirect: '/record/detail/default/:id?',
        component: () => import('@/views/record/detail'),
        meta: {
            requiresAuth: true // 要求验证的页面
        },
        children: [
            {
                path: '/record/detail/default/:id?',
                component: () => import('@/views/record/default'),
                meta: {
                    requiresAuth: true // 要求验证的页面
                },
            },
            {
                path: '/record/detail/markdown',
                component: () => import('@/views/record/markdown'),
                meta: {
                    requiresAuth: true // 要求验证的页面
                },
            }
        ]
    },
]

// 这里处理跳转同一路由报错
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
    routes
})

// 路由守卫，验证是否有token，全局前置钩子
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if(!localStorage.getItem("token")) {
            if(localStorage.getItem("refresh_token")) {
                next()
            } else {
                next({
                    // 验证失败要跳转的页面
                    path: '/login',
                })
            }
        }else {
            next()
        }
    }else {
        // 确保一定要调用next()
        next()
    }
})

export default router
