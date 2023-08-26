import {createRouter, createWebHistory} from 'vue-router';

import LoginPage from "@/components/LoginPage";
import SplashPage from "@/components/SplashPage";
import HomePage from "@/components/HomePage";
import OrdersAll from "@/components/OrdersAll";
import FinancialPage from "@/components/FinancialPage";
import ProfilePage from "@/components/ProfilePage";
import ProfileWallet from "@/components/ProfileWallet";
import OrderDetails from "@/components/OrderDetails";
import OrdersUser from "@/components/OrdersUser";


const routes = [

    {path: "/", name: "SplashPage", component: SplashPage},
    {path: "/login_page", name: "LoginPage", component: LoginPage},
    {path: "/homepage", name: "HomePage", component: HomePage},
    {path: "/orders_all", name: "OrdersAll", component: OrdersAll},
    {path: "/financial_page", name: "FinancialPage", component: FinancialPage},
    {path: "/profile_page", name: "ProfilePage", component: ProfilePage},
    {path: "/profile_wallet", name: "ProfileWallet", component: ProfileWallet},
    {path: "/order_details/:order_id", name: "OrderDetails", component: OrderDetails},
    {path: "/orders_user", name: "OrdersUser", component: OrdersUser},

];


const router = createRouter({
    history: createWebHistory(), routes
})

var user_id = localStorage.getItem('userId')
router.beforeEach((to, from, next) => {
    if (user_id == null && to.name != 'LoginPage' && to.name != 'SplashPage') {
        next({name: 'LoginPage'})
    } else {
        next()
    }
})

export default router;
