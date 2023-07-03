import { ref } from 'vue'
import axiosInstance from '../services/axios'
import useAuthStore from '../stores/AuthStore'

export default function useUser() {
    const user = ref(null)
    const authStore=useAuthStore()
    
    async function updateUser(user) {
        await axiosInstance.put(`/auth/users/${user.id}/`, user)
            .then(response => {
                // show popup
            })
            .catch(error => {
                // show popup
            })
    }

    async function updateProfile(profile) {
        console.log(profile.image);
        if (validateObjectData(profile)) {
            const formData = new FormData();
            formData.append('phone', profile.phone);
            formData.append('user', profile.user);
            formData.append('address', profile.address);
            formData.append('summary', profile.summary);

            if (profile.image instanceof File) {
                formData.append('image', profile.image);
            }

            console.log(formData.image)
            await axiosInstance.put(`/api/blog/profile/me/`, formData)
                .then(response => {
                    authStore.setUser()
                    // show popup
                })
                .catch(error => {
                    // show popup
                });
        }
    }


    function validateObjectData(obj) {
        Object.values(obj).forEach(el => {
            if (!Boolean(el)) {
                return false
            }
        })
        return true
    }
    return {
        updateProfile,
        updateUser
    }
}