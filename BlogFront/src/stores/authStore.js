import axios from "axios";
import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { baseURL } from "../services/baseUrl";
import axiosInstance from "../services/axios";
import useComponentStore from '../stores/componentStore'

const useAuthStore = defineStore('auth', () => {
    const user = reactive({
        id: null,
        first_name:null,
        last_name:null,
        username: null,
        email: null,
        profile:{
            image:null
        }
    })
    const refreshToken = ref("")
    const accessToken = ref("")
    const message = ref("")
    const messageStatus = ref("")
    const router = useRouter()
    const componentStore=useComponentStore()

    async function setUser() {
        await axiosInstance.get('/auth/users/me/',{
            headers:{
                Authorization:`JWT ${window.localStorage.getItem('accessToken')}`
            }
        }).then(response => {
            Object.assign(user,response.data)

    
        }).catch(error => {
            console.log(error)
        })
    }

    async function handleLogin(credentials) {
         await axios.post(`${baseURL}/auth/token/jwt/create/`, {
            'username': credentials.username,
            'password': credentials.password
        }).then(response => {
            accessToken.value = response.data.access
            refreshToken.value = response.data.refresh
            message.value = "user authorized succesfully!"
            messageStatus.value = 'success'

            window.localStorage.setItem('accessToken', accessToken.value)
            window.localStorage.setItem('refreshToken', refreshToken.value)
            window.localStorage.setItem('isAuthenticated', true)
            setUser()
            router.push('/')
        }).catch(error => {
            messageStatus.value = 'error'
            if (error.response.status == 401) {
                message.value = "username or password is wrong!!!"
            } else {
                message.value = "something went wrong please contact support!"
            }
        })
    }

    async function handleSignUp(credentials) {
        // messageStatus.value = "error"
        // if (!(credentials.password == credentials.password_repeat)) {
        //     message.value = "passwords is not equals"
        //     return
        // }
        // if (!validatePassword(credentials.password)) {
        //     console.log(validatePassword(credentials.password))
        //     message.value = "weak password"
        //     return
        // } if (!validateEmail(credentials.email)) {
        //     message.value = "email format is not correct"
        //     return
        // } if (credentials.username.lenght < 6) {
        //     message.value = "username lenght should be greater than 6 letter"
        //     return
        // }

        await axios.post(`${baseURL}/auth/users/`, {
            'username': credentials.username,
            'email': credentials.email,
            password: credentials.password
        }).then(response => {
            messageStatus.value = "success"
            message.value = `user ${credentials.username} created successfully`;
            componentStore.showPopup(message.value, 'success')
            setTimeout(() => router.push('/login'), 3000)
        }).catch(error => {
            if (error.code == `ERR_BAD_REQUEST`) {
                message.value = error.response.data.username[0]
            } else {
                message.value = "something went wrong please contact support"
            }
            componentStore.showPopup(message.value, 'error')
        })
    }

    function handleLogout() {
        window.localStorage.removeItem('accessToken')
        window.localStorage.removeItem('refreshToken')
        window.localStorage.removeItem('isAuthenticated')
        router.push('/login')
    }

    function validatePassword(password) {
        let regex = /^(?=.*?[0-9])(?=.*?[a-zA-Z]).{3,30}$/;
        return regex.test(password);
    }

    function validateEmail(email) {
        let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }


    return {
        user,
        refreshToken,
        accessToken,
        message,
        messageStatus,
        setUser,
        handleLogin,
        handleSignUp,
        handleLogout
    }
})


export default useAuthStore