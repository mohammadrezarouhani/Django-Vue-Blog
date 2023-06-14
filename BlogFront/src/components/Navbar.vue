<script setup>
import useAuthStore from '../stores/authStore';

const authStore=useAuthStore()

</script>

<template>
    <header>
        <div class="logo">
            <h1 class="logo-text">MyPersonalBlog</h1>
        </div>
        <ul class="nav show">
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Services</a></li>
            <!-- <li><a href="#">Login</a></li>
            <li><a href="#">Signup</a></li> -->
            <li>
                <a href="#">
                    <span class="material-symbols-sharp">person</span>
                    Mohammmadreza rouhani
                    <span class="material-symbols-sharp">arrow_drop_down</span>
                </a>
                <ul>
                    <li><a href="#">Dashboard</a></li>
                    <li @click="authStore.handleLogout" class="logout"><a href="#">Logout</a></li>
                </ul>
            </li>
        </ul>
    </header>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lora:ital@1&display=swap');
header * {
    color: black;
}

header {
    background: linear-gradient(120deg, #2980b9, white);;
    font-family: 'Lora', serif;
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
    size: inherit;
    margin: 12px;
    color: white;
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

header ul li > a:hover {
    color: rgba(255, 0, 0, 0.67);
  transition: all 300ms ease;
}

/* drop down menu  */
header ul li ul {
    background: white;
    position: absolute;
    top: 66px;
    right: 0px;
    width: 70%;
    height: 8rem;
    display: none;
    z-index: 999;
    margin-right: 1rem;
}

/*********** creating hover on drop down menu *************/
header ul li:hover ul {
    display: flex;
    flex-direction: column;
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
</style>