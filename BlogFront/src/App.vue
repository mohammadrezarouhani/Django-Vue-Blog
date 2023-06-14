<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router'
// import  useUserStore  from './stores/userStore';

// console.log(1)
// const userStore=useUserStore()
// const isAuthticated=window.localStorage.getItem('isAuthenticated')
// onMounted(()=>{
//     if(isAuthticated){
//         userStore.setUser()
//         console.log('App.vue')
//     }
// })

</script>

<template>
    <RouterView />
</template>

<style scoped></style>
