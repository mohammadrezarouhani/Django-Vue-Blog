import { ref } from 'vue'
import { defineStore } from "pinia";
import axiosInstance from "../services/axiosInstant";


const useUserStore = defineStore('user', () => {
    const user = ref('')

    async function setUser() {
        await axiosInstance.get('/auth/users/me/', {
            headers: {
                Authorization: `JWT ${window.localStorage.getItem('accessToken')}`,
            },
        }).then(response => {
            user.value=response.data
        }).catch(error => {
            console.log(error)
        })
    }

    return {
        user,
        setUser
    }
})


export default useUserStore