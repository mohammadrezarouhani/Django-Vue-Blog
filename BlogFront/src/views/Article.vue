
<script setup>
import { onMounted } from 'vue'
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';
import SingleArticle from '../components/SingleArticle.vue'
import  useUserStore  from '../stores/userStore';


const userStore=useUserStore()
const isAuthticated=window.localStorage.getItem('isAuthenticated')

onMounted(()=>{
    if(isAuthticated){
        userStore.setUser()
    }
})

</script>

<template>
    <div class="container">
        <Navbar class="navbar"/>
        <SingleArticle class="single-article"/>
        <Footer class="footer" />
    </div>
</template>

<style scoped>

</style>