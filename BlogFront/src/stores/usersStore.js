import { defineStore } from "pinia";
import axiosInstance from "../services/axiosInstant.js";
import axios from "axios";
import { ref } from "vue";

export const useUserStore = defineStore('users', () => {
    const user = ref(null)
    const message = ref("")
    const messageStatus=ref("")

    function handleLogin() {

    }

    async function handleSignUp(credentials) {
        try {
            const response = await axiosInstance.post('/auth/users/', credentials)
            messageStatus.value="success"
            message.value='user ${response.data.username} created succeesfully'
        }
        catch (err) {
            messageStatus.value="error"
            message.value=err.response.data.username[0]
        }
    }

    function handleLogout() {

    }

    function getUser() {

    }

    return {
        user,
        message,
        messageStatus,
        handleLogin,
        handleSignUp,
        handleLogout
    }
})

