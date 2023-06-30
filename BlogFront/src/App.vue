<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router'
import useAuthStore from './stores/authStore';

const authStore=useAuthStore()

onMounted(async()=>{
    if(window.localStorage.getItem('isAuthenticated')){
        await authStore.setUser()
    }
})

</script>

<template>
    <RouterView />
</template>

<style scoped></style>
