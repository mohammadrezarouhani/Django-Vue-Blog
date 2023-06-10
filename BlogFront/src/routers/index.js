import { createRouter,createWebHistory } from "vue-router";
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'

const routers=createRouter({
    history:createWebHistory(),
    routes:[
        {
            'path':'/',
            'name':'home',
            'component':Home
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
        }
    ]
})

export default routers