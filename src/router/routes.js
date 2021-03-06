import Home from '@/pages/Home/home'
import Login from '@/pages/Login/login'
import Register from '@/pages/Register/register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
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
    },
    {
        path: '/addcartsuccess',
        component: AddCartSuccess,
        meta: { show: true }
    },
    {
        path: '/shopcart',
        component: ShopCart,
        meta: { show: true }
    },
    {
        path: '/trade',
        component: Trade,
        meta: { show: true }
    },
    {
        path: '/pay',
        component: Pay,
        meta: { show: true }
    },
    {
        path: '/paysuccess',
        component: PaySuccess,
        meta: { show: true }
    },
    {
        path: '/center',
        component: Center,
        meta: { show: true }
    }
]