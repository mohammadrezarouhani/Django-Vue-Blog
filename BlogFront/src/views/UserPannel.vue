<script setup>
import { ref, onBeforeMount } from 'vue';
import Navbar from '../components/Navbar.vue';
import Dashboard from '../components/Dashboard.vue';
import UserBlog from '../components/UserBlog.vue';
import Sidebar from '../components/Sidebar.vue';
import Profile from '../components/Profile.vue';
import useAuthStore from '../stores/AuthStore';

const AuthStore = useAuthStore()

const currentTabIndex = ref(0)

function onTabChange(index) {
    currentTabIndex.value = index
}

const componentList = [
    Dashboard,
    UserBlog,
    Profile
]

</script>


<template>
    <div class="container">
        <Navbar class="navbar" />
        <Sidebar class="sidebar" @tabChange="onTabChange" />
        <Component :is="componentList[currentTabIndex]" class="component" />
    </div>
</template>

<style scoped>
.container {
    height: 100vh;
    display: grid;
    grid-template-columns: 14rem 1fr;
    grid-template-rows: 66px 1fr;
    grid-template-areas: "navbar navbar"
        "sidebar component";
}

.container .navbar {
    grid-area: navbar;
}

.container .sidebar {
    grid-area: sidebar;
    height: 100%;
    width: 100%;
}

.container .component {
    grid-area: component;
}
</style>../stores/AuthStore