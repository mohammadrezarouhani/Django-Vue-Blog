<script setup>
import { ref } from 'vue';
import Navbar from '../components/Navbar.vue';
import Dashboard from '../components/Dashboard.vue';
import Article from '../components/Article.vue';
import Sidebar from '../components/Sidebar.vue';
import Profile from '../components/Profile.vue';

const currentTabIndex=ref(2)

function onTabChange(index){
    currentTabIndex.value=index
}

const componentList=[
    Dashboard,
    Article,
    Profile
]
</script>


<template>
    <div class="container">
        <Navbar class="navbar"/>
        <Sidebar class="sidebar" @tabChange="onTabChange"/>
        <Component :is="componentList[currentTabIndex]" class="component"/>
    </div>
</template>

<style scoped>
.container{
    height: 100vh;
    display: grid;
    grid-template-columns: 14rem 1fr;
    grid-template-rows: 66px 1fr;
    grid-template-areas: "navbar navbar"
    "sidebar component";
}

.container .navbar{
    grid-area: navbar;
}

.container .sidebar{
    grid-area: sidebar;
    height: 100%;
    width: 100%;
}

.container .component{
    grid-area: component;
}


</style>