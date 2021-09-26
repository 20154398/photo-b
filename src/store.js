import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 全局应用数据
const Global = {
    state: {
        token: null, // 用户身份
        isModel: null, // 用户身份
    },
    mutations: {
        // 设定用户token
        setToken(state, data) {
            state.token = data
        },
        // 设定用户token
        setModel(state, data) {
            state.isModel = data
        },
    },

    actions: {}
}

const Analysis = {
    state: {
        selfIndicator: {}// 自定义指标集合
    },
    mutations: {
        // 设定自定义指标
        setSelfIndicator(state, data) {
            state.selfIndicator[data.key] = data.value
        }
    },

    actions: {}
}

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        global: Global,
        analysis: Analysis
    }
})
