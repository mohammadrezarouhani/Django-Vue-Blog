
<script setup>
import axios from 'axios'
import { ref, onMounted,watch } from 'vue'
import Navbar from '../components/Navbar.vue';
import Slider from '../components/Slider.vue';
import MainContent from '../components/MainContent.vue';
import Footer from '../components/Footer.vue';
import  useUserStore  from '../stores/userStore';


const userStore=useUserStore()
const isAuthticated=window.localStorage.getItem('isAuthenticated')

onMounted(()=>{
    console.log(window.localStorage.getItem('accessToken'))
    if(isAuthticated){
        userStore.setUser()
        console.log('App.vue')
    }
})

</script>

<template>
    <div>
        <Navbar />
        <Slider />
        <MainContent/>
        <Footer />
    </div>
</template>