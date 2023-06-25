<script setup>
import MainContent from './MainContent.vue';
</script>

<template>
    <div class="article">
        <header>
            <h1>Articles</h1>

            <div class="search">
                <span class="material-symbols-sharp" style="font-size: 2rem;">search</span>
                <input type="text">
            </div>

            <span class="material-symbols-sharp add">add</span>
        </header>

        <main>
            <div class="card-container">
                <div class="card">
                    <img src="http://127.0.0.1:8000/media/post/2023-05-26/ArvanCloud___%D8%B3%D8%A7%D8%AE%D8%AA_%D8%A7%D8%A8%D8%B1%DA%A9_and_3_more_pages_-_Personal_-_Microsoft_Edge_29_0_ANHKXRJ.png"
                        alt="">
                    <div class="content-info">
                        <h2>title</h2>
                        <p class="summary">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum nulla,
                            voluptate animi id inventore deserunt praesentium sint amet aperiam non.</p>
                    </div>
                    <a href="#" class="detail">Details</a>
                </div>

                <div class="card">
                    <img src="http://127.0.0.1:8000/media/post/2023-05-26/ArvanCloud___%D8%B3%D8%A7%D8%AE%D8%AA_%D8%A7%D8%A8%D8%B1%DA%A9_and_3_more_pages_-_Personal_-_Microsoft_Edge_29_0_ANHKXRJ.png"
                        alt="">
                    <div class="content-info">
                        <h2>title</h2>
                        <p class="summary">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum nulla,
                            voluptate animi id inventore deserunt praesentium sint amet aperiam non.</p>
                    </div>
                    <a href="#" class="detail">Details</a>
                </div>

                <div class="card">
                    <img src="http://127.0.0.1:8000/media/post/2023-05-26/ArvanCloud___%D8%B3%D8%A7%D8%AE%D8%AA_%D8%A7%D8%A8%D8%B1%DA%A9_and_3_more_pages_-_Personal_-_Microsoft_Edge_29_0_ANHKXRJ.png"
                        alt="">
                    <div class="content-info">
                        <h2>title</h2>
                        <p class="summary">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum nulla,
                            voluptate animi id inventore deserunt praesentium sint amet aperiam non.</p>
                    </div>
                    <a href="#" class="detail">Details</a>
                </div>

                <div class="card">
                    <img src="http://127.0.0.1:8000/media/post/2023-05-26/ArvanCloud___%D8%B3%D8%A7%D8%AE%D8%AA_%D8%A7%D8%A8%D8%B1%DA%A9_and_3_more_pages_-_Personal_-_Microsoft_Edge_29_0_ANHKXRJ.png"
                        alt="">
                    <div class="content-info">
                        <h2>title</h2>
                        <p class="summary">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum nulla,
                            voluptate animi id inventore deserunt praesentium sint amet aperiam non.</p>
                    </div>
                    <a href="#" class="detail">Details</a>
                </div>

                <div class="card">
                    <img src="http://127.0.0.1:8000/media/post/2023-05-26/ArvanCloud___%D8%B3%D8%A7%D8%AE%D8%AA_%D8%A7%D8%A8%D8%B1%DA%A9_and_3_more_pages_-_Personal_-_Microsoft_Edge_29_0_ANHKXRJ.png"
                        alt="">
                    <div class="content-info">
                        <h2>title</h2>
                        <p class="summary">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum nulla,
                            voluptate animi id inventore deserunt praesentium sint amet aperiam non.</p>
                    </div>
                    <a href="#" class="detail">Details</a>
                </div>
            </div>
        </main>
    </div>
</template>

<style>
img {
    width: 100%;
    height: 60%;
}

.article {
    display: flex;
    flex-direction: column;
}

.article header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 4rem;
    padding: 1rem;
}

.article header .search {
    position: relative;
}

.article header .search input[type="text"]{
    height: 2rem;
    padding-left: 2rem;
    font-size: 1.2rem;
    background-color: var(--color-white);
    border: none;
    border-radius: var(--border-radius-2);
}

.article header .search span{
    position: absolute;
    font-size: 2rem !important;
}

.article header .add{
    color:#008489;
    cursor: pointer;
    background-color: var(--color-white);
    border-radius: 50%;
    font-size: 2.5rem !important;
    box-shadow: 0 0 .4rem  #008489;
    transition: all 300ms ease;
}

.article header .material-symbols-sharp:hover{
box-shadow: none;
transition: all 300ms ease;
}

main {
    padding: 1rem;
}

main .card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 3rem;
}

main .card-container .card {
    width: 30%;
    display: flex;
    flex-direction: column;
    background-color: var(--color-white);
    border-radius: var(--card-border-radius);
    box-shadow: var(--box-shadow-1);
}

main .card-container .card:hover{
    box-shadow: none;
    transition: all 300ms ease;
}

main .card-container .card img{
    border-radius: 1rem 1rem  0rem 0rem;
}

main .card-container .card .content-info {
    width: 100%;
    padding: 0.8rem;
}

main .card-container .card a {
    border-radius: 0rem 0rem 2rem 2rem;
    text-align: center;
    margin:auto 0px;
    display: block;
    width: 100%;
    height:3rem;
    color: var(--color-primary);
}

main .card-container .card a:hover{
    background-color: var(--color-light);
}
</style>