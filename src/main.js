import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// 加载ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import eventBus from './tools/eventBus'

Vue.use(ElementUI);

import commonjs from './tools/common.js'
import promiseA from './tools/promise.js'

promiseA(Vue);
Vue.prototype.commonJ = commonjs;
Vue.prototype.eventBus = eventBus;

/************ComponentAutoRegister**************/
import ComponentAutoRegister from './tools/ComponentAutoRegister.js';

/************ComponentAutoRegister**************/

ComponentAutoRegister.then(() => {
    new Vue({
        render: h => h(App),
        router,
        store,
    }).$mount('#app')
});

