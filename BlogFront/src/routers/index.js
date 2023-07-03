import { createRouter,createWebHistory } from "vue-router";
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Blog from '../views/Blog.vue'
import UserPannel from '../views/UserPannel.vue'

const routers=createRouter({
    history:createWebHistory(),
    routes:[
        {
            'path':'/',
            'name':'home',
            'component':Home
        },
        {
            'path':'/pannel',
            'name':'pannel',
            'component':UserPannel
        },
        {
            'path':'/login',
            'name':'login',
            'component':Login
        },
        {
            'path':'/signup',
            'name':'signup',
            'component':Signup
        },
        {
            'path':'/article/:id',
            'name':'article',
            'component':Blog
        }
    ]
})

export default routers