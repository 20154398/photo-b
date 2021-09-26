import Vue from 'vue'
import Router from 'vue-router'

import Login from './views/Login' // 登录页
import home from './views/home'
import test from "./views/test";


Vue.use(Router);

const newRouter = new Router({
    routes: [
        {
            path: '/home',
            name: 'home',
            component: home,
        },
        {
            path: '/Login',
            name: 'Login',
            component: Login
        },
        {
            path: '/test',
            name: 'test',
            component: test
        },
        {
            path: '*',
            redirect: 'home'
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            if (to.hash) {
                return {
                    selector: to.hash,
                    behavior: 'smooth'
                }
            } else {
                return false;
            }
        }

    }
})

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
// push
const VueRouterPush = Router.prototype.push
Router.prototype.push = function push(to) {
    return VueRouterPush.call(this, to).catch(err => err)
}

// replace
const VueRouterReplace = Router.prototype.replace
Router.prototype.replace = function replace(to) {
    return VueRouterReplace.call(this, to).catch(err => err)
}

export default newRouter
