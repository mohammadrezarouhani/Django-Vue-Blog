import {ref} from 'vue'
import axiosInstance from '../services/axios'

export default function useUser(){
    const user=ref(null)

    async function optionUser(user){
        await axiosInstance.put(`/auth/users/${user.id}/`,user)
        .then(response=>{
            console.log(response)
        })
        .catch(error=>{
            
        })
    }
}