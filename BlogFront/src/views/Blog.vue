
<script setup>
import { onBeforeMount } from 'vue'
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';
import SingleArticle from '../components/SingleArticle.vue'
import useAuthStore from '../stores/authStore';


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