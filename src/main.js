import {
    createApp
} from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)
app.use(store)
app.use(router)
// 全局引入
import * as echarts from "echarts";
app.config.globalProperties.$echarts = echarts;
import Vuex from 'vuex';
import VueSession from "vue-session";
app.use(Vuex,VueSession);
// app.use(VueSession)

app.mount('#app')
