<script setup>
</script>

<template>
    <header>
        <div class="logo">
            <h1 class="logo-text"><span>My</span>Blog</h1>
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
                    <li class="logout"><a href="#">Logout</a></li>
                </ul>
            </li>
        </ul>
    </header>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lora:ital@1&display=swap');

a {
    text-decoration: none;
    color: white;
    font-size: 1.1rem;
}


a {
    text-decoration: none;
    color: black;
    margin: 0px;
    font-family: 'Lora', serif;
}

a:hover {
    color: #008489;
    font-weight: 600;
    transition: all 100ms ease;
}



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

header .logo-text span {
    color: #00f1fa;
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
    height: 65px;
    margin-right: 1rem;
    font-size: 1.1em;
    text-decoration: none;
    text-align: center;
}

header ul li a:hover {
    color: black;
    transition: 0.5;
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

header ul li ul li a {
    background: white;
    color: black;
    width: 100%;
    transition: all 100ms ease;
}

header ul li ul li a:hover {
    color: black;
    font-size: large;
    font-weight: 600;

}

header .logout a {
    color: red;
}

header .menu-toggle {
    display: none;
}
</style>