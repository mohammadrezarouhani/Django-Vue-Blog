<script setup>
import { ref,onBeforeMount } from 'vue';
import { RouterLink } from 'vue-router';
import useAuthStore from '../stores/AuthStore';

const AuthStore = useAuthStore()
const isAuthenticated = ref(window.localStorage.getItem('isAuthenticated'))


window.onstorage = (event) => {
    if (event.key === 'isAuthenticated') {
        isAuthenticated.value = event.newValue;
    }
}

</script>

<template>
    <header>
        <div class="logo">
            <RouterLink :to="{ name: 'home'}" ><h1 class="logo-text">Personal Blog</h1></RouterLink>
        </div>
        <ul class="nav show">
            <li>
                <RouterLink to="/">Home</RouterLink>
            </li>
            <!-- <li><a href="#"><RouterLink to="/about">About</RouterLink></a></li> -->
            <li v-if="!isAuthenticated">
                <RouterLink to="/login">login</RouterLink>
            </li>
            <li v-if="!isAuthenticated">
                <RouterLink to="/signup">signup</RouterLink>
            </li>
            <li v-if="isAuthenticated" id="username">
                <a href="#">
                    <span class="material-symbols-sharp">arrow_drop_down</span>
                    &nbsp;
                    {{ AuthStore.user.username }}
                    &nbsp;
                    <img v-if="AuthStore.user.profile.image" :src="AuthStore.user.profile.image" class="profile-image">
                    <img v-else src="@/assets/profile2.png" class="profile-image" >
                </a>
                <ul>
                    <li>
                        <RouterLink to="/pannel">Dashboard</RouterLink>
                    </li>
                    <li @click="AuthStore.handleLogout" class="logout"><a href="#">Logout</a></li>
                </ul>
            </li>
        </ul>
    </header>
</template>

<style scoped>
header * {
    color: black;
}

header {
    background: linear-gradient(120deg, #2980b9, white);
    height: 66px;
    display: flex;
    justify-content: space-between;
}

/* Header */
header .logo {
    float: left;
    height: inherit;
    margin-left: 2em;
}

header .logo-text {
    color: white;
    font-size: 1.6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}

/* nav bar */
header ul {
    padding: 0px;
    margin: 0px;
    height: 65px;
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
}

header ul li {
    position: relative;
    height: 66px;
}

header ul li a {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    margin-right: 1rem;
    font-size: 1.2rem;
}

header ul li>a:hover {
    color: rgba(255, 0, 0, 0.67);
    transition: all 300ms ease;
}

/* drop down menu  */
header ul li ul {
    background: linear-gradient(120deg, white, #6890ab);
    position: absolute;
    top: 66px;
    right: -1rem;
    width: 10rem;
    height: 8rem;
    display: none;
    z-index: 999;
    margin-right: 1rem;
    transition: all 300ms ease;
}

/*********** creating hover on drop down menu *************/

header ul li:hover ul {
    display: flex;
    flex-direction: column;
    border-radius: 0rem 0rem .3rem .3rem;
    width: 10rem;
    transition: all 300ms ease;
}

header ul li ul li {
    width: 100%;
}

header .logout a {
    color: red;
}

header .menu-toggle {
    display: none;
}

.profile-image {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
}</style>