import axios from 'axios';
import commonjs from './common.js';
import store from '../store';
import router from '../router'

// let root = process.env.NODE_ENV === 'production'?process.env.VUE_APP_URL:'/api';
// let user = process.env.NODE_ENV === 'production'?process.env.VUE_APP_URL:'/api';
let root = process.env.VUE_APP_URL;
let user = process.env.VUE_APP_URL;
/**
 * promiseA 数据请求axios默认请求封装
 * @param  {[object]} el [实例对象，可直接传this]
 */
const promiseA = (el) => {

    const fileAxios = axios.create({
        baseURL: root,
        timeout: 30000
    });

    const userAxios = axios.create({
        baseURL: user,
        timeout: 30000
    });

    const axiosDefault = axios.create({
        baseURL: root,
        timeout: 30000
    });

    // 请求数据之前回调--处理传送固定参数
    userAxios.interceptors.request.use((config) => {
        //非登录接口添加token属性
        if (config.url.indexOf('login') < 0) {
            //console.log
            config.headers['Authorization'] = store.state.global.token;
        }
        if (config.method === 'post' || config.method === 'patch') {
            config.data = commonjs.urlEncode(config.data).substr(1);
        } else if (config.method === 'get') {
        }
        return config;
    });

    // 数据返回之后，先拦截处理
    let text = '';
    userAxios.interceptors.response.use((response) => {
        // 对响应数据做点什么
        if (response.data.code !== 200) {
            if (response.data.code === 0) {
                text = response.data.message
            } else {
                switch (response.data.code) {
                    case 401:
                        text = '用户身份失效,请重新登录';
                        localStorage.removeItem('wisewalkId');//清除ls用户数据
                        store.commit('removeUser');//清除vuex用户数据
                        //跳转到登录
                        router.push('/login');
                        break;
                    case 403:
                        text = false;
                        //跳转到登录
                        router.push('/404?type=noAuthority');
                        break;
                    case 400:
                        text = false;
                        break;
                    default:
                        text = response.data.message;//"系统异常，请联系客服"
                }
            }
            if (!text) return response;
            el.prototype.$message.closeAll()
            el.prototype.$message.error('请求失败，' + text)
        }
        return response;
    }, (error) => {
        if (error.response.config.url !== 'login') {
            if (!store.state.global.token) return;
        }
        switch (error.response.status) {
            case 4030:
                text = '用户身份失效,请重新登录';
                //跳转到登录
                router.push('/login');
                break;
            case 401:
                text = false;
                //跳转到登录
                router.push({
                    path: '/notfount',
                    query: {
                        type: 'noAuthority'
                    }
                });
                break;
            default:
                text = '数据请求有误，请联系技术人员'
        }
        el.prototype.$message.closeAll()
        el.prototype.$message.error(text)
        // 对响应错误做点什么
        return Promise.reject(error)
    });

    // 请求数据之前回调--处理传送固定参数
    axiosDefault.interceptors.request.use((config) => {
        //非登录接口添加token属性
        if (config.url.indexOf('login') < 0) {
            //console.log
            config.headers['Authorization'] = store.state.global.token;
        }
        if (config.method === 'patch') {
            config.data = commonjs.urlEncode(config.data).substr(1);
        } else if (config.method === 'get') {
        }
        return config;
    });

    // 数据返回之后，先拦截处理
    axiosDefault.interceptors.response.use((response) => {
        // 对响应数据做点什么
        if (response.data.code !== 200) {
            if (response.data.code === 0) {
                text = response.data.message
            } else {
                switch (response.data.code) {
                    case 401:
                        text = '用户身份失效,请重新登录';
                        localStorage.removeItem('wisewalkId');//清除ls用户数据
                        store.commit('removeUser');//清除vuex用户数据
                        //跳转到登录
                        router.push('/login');
                        break;
                    case 403:
                        text = false;
                        //跳转到登录
                        router.push('/404?type=noAuthority');
                        break;
                    case 400:
                        text = false;
                        break;
                    default:
                        text = response.data.message;//"系统异常，请联系客服"
                }
            }
            if (!text) return response;
            el.prototype.$message.closeAll()
            el.prototype.$message.error('请求失败，' + text)
        }
        return response;
    }, (error) => {
        if (error.response.config.url !== 'login') {
            if (!store.state.global.token) return;
        }
        switch (error.response.status) {
            case 4030:
                text = '用户身份失效,请重新登录';
                //跳转到登录
                router.push('/login');
                break;
            case 401:
                text = false;
                //跳转到登录
                router.push({
                    path: '/notfount',
                    query: {
                        type: 'noAuthority'
                    }
                });
                break;
            default:
                text = '数据请求有误，请联系技术人员'
        }
        el.prototype.$message.closeAll()
        el.prototype.$message.error(text)
        // 对响应错误做点什么
        return Promise.reject(error)
    });

    // 数据返回之后，先拦截处理
    fileAxios.interceptors.response.use((response) => {
        // 对响应数据做点什么
        if (response.data.code !== 200) {
            if (response.data.code === 0) {
                text = response.data.message
            } else {
                switch (response.data.code) {
                    case 401:
                        text = '用户身份失效,请重新登录';
                        localStorage.removeItem('wisewalkId');//清除ls用户数据
                        store.commit('removeUser');//清除vuex用户数据
                        //跳转到登录
                        router.push('/login');
                        break;
                    case 403:
                        text = false;
                        //跳转到登录
                        router.push('/404?type=noAuthority');
                        break;
                    case 400:
                        text = false;
                        break;
                    default:
                        text = response.data.message;//"系统异常，请联系客服"
                }
            }
            if (!text) return response;
            el.prototype.$message.closeAll()
            el.prototype.$message.error('请求失败，' + text)
        }
        return response;
    }, (error) => {
        if (error.response.config.url !== 'login') {
            if (!store.state.global.token) return;
        }
        switch (error.response.status) {
            case 4030:
                text = '用户身份失效,请重新登录';
                //跳转到登录
                router.push('/login');
                break;
            case 401:
                text = false;
                //跳转到登录
                router.push({
                    path: '/notfount',
                    query: {
                        type: 'noAuthority'
                    }
                });
                break;
            default:
                text = '数据请求有误，请联系技术人员'
        }
        el.prototype.$message.closeAll()
        el.prototype.$message.error(text)
        // 对响应错误做点什么
        return Promise.reject(error)
    });

    // 对象添加到VUE实例中
    el.prototype.axiosP = axiosDefault;
    el.prototype.userAxios = userAxios;
    el.prototype.fileAxios = fileAxios;
};
export default promiseA;


