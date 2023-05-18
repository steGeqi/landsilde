        import {
    createRouter,
    createWebHashHistory
} from 'vue-router'
import axios from "axios";
// import { Token } from './api/login';

import {getToken} from "./utils/auth";
        import {ElMessage} from "element-plus";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [{
        path: '/',
        name: '',
        component: () => import("./components/login.vue")
    },

    {
        name: 'login',
        path: '/login',
        component: () => import("./components/login.vue")
    },

    {
        name: 'webHome',
        path: '/webHome',
        redirect: '/webHome/cthd',
        component: () => import('./components/webHome.vue'),
        children: [
            {
                name: 'cthd',
                path: 'cthd',
                component: () => import('./components/threedim/thd.vue')
            },
            {
                name: 'statistics',
                path: 'statistics',
                component: () => import('./components/dataStatic.vue')
            },
            {
                name: 'datamanage',
                path: 'datamanage',
                component: () => import('./components/Datamanage.vue')
            },
            {
                name: 'hismanage',
                path: 'hismanage',
                component: () => import('./components/Hismanage.vue')
            },
            {
                name: 'imgmanage',
                path: 'imgmanage',
                component: () => import('./components/Imgmanage.vue')
            },
            {
                name: 'usermanage',
                path: 'usermanage',
                component: () => import('./components/Usermanage.vue')
            },
            {
                name: 'userBook',
                path: 'userBook',
                component: () => import('./components/userBook.vue')
            },
            {
                name: 'Precipitation',
                path: 'Precipitation',
                component: () => import('./components/Precipitation.vue')
            }
        ]
    }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.path === '/') {
        next();
    } else {
        let token = getToken()
        if (token) {
            next();
        } else{
            ElMessage({
                message:'请重新登录',
                type:'error'
            })
            next('/')
        }
    // else if (to.path === '/webHome/cthd' || to.path === "/webHome/imgmanage" || to.path === "/webHome/hismanage" || to.path === "/webHome/datamanage" || to.path === "/webHome/statistics" || to.path === "/webHome/userBook" || to.path === "/webHome/usermanage" || to.path === "/webHome/Precipitation") {
    //
    //         // Token(token).then((res) => {
    //         //     console.log(res)
    //         //     if (res.code == 200) {
    //         //         next()
    //         //     } else if (res.code == 401) {
    //         //         next("/")
    //         //         ElMessage.error(res.msg)
    //         //     } else if (res.code != 200) {
    //         //         ElMessage.error(res.msg);
    //         //         next("/")
    //         //     }
    //         // })
    //     }
    }
});
export default router;
