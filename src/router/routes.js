import Home from '@/pages/Home/home'
import Login from '@/pages/Login/login'
import Register from '@/pages/Register/register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'

export default [{
        path: '/',
        component: Home,
        name: 'home',
        meta: { show: true }
    }, {
        path: '/home',
        component: Home,
        name: 'home',
        meta: { show: true }
    }, {
        path: '/login',
        component: Login,
        meta: { show: false }
    }, {
        path: '/register',
        component: Register,
        meta: { show: false }
    }, {
        path: '/search/:keyword?',
        component: Search,
        meta: { show: true },
        name: 'search',
        // children: [{
        //     path: 'keyword',
        //     component: Search
        // }]
    },
    {
        path: '/detail/:id',
        component: Detail,
        meta: { show: false }
    }
]