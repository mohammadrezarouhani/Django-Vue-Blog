
<script setup>
import { onBeforeMount } from 'vue';
import Navbar from '../components/Navbar.vue';
import Slider from '../components/Slider.vue';
import MainContent from '../components/MainContent.vue';
import Footer from '../components/Footer.vue';
import useAuthStore from '../stores/AuthStore';


</script>

<template>
    <div>
        <Navbar />
        <Slider />
        <MainContent/>
        <Footer />
    </div>
</template>