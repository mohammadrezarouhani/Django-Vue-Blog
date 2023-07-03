<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router'
import useAuthStore from './stores/AuthStore';
import Popup from './components/Popup.vue'
const authStore=useAuthStore()

onMounted(async()=>{
    if(window.localStorage.getItem('isAuthenticated')){
        await authStore.setUser()
    }
})

</script>

<template>
    <Popup class="popup"/>
    <RouterView />
</template>

<style scoped>

.popup{
    position: absolute;
}

</style>
