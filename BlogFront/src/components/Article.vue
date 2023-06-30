<script setup>
import { onMounted, ref } from 'vue'
import useAuthStore from '../stores/authStore'
import useBlogAPI from '../composables/useBlogAPI';

const blogAPi = useBlogAPI()
const authStore = useAuthStore()
const { articles } = blogAPi

onMounted(async () => {
    await authStore.setUser()
    await blogAPi.getAllArticles(authStore.user.id)
})

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
                <div class="card" v-for="article in articles" :key="article.id">
                    <img :src="article.image">
                    <div class="content-info">
                        <h2>{{ article.title }}</h2>
                        <p class="summary">{{ article.summary.slice(0, 30) }} <span
                                v-if="article.summary.length > 30">...</span></p>
                    </div>
                    <a href="#" class="detail">Details</a>
                </div>
            </div>
        </main>
    </div>
    <!-- <Pagination :currentPage="currentPage" :lastPage="lastPage" @next="blogApi.nextPage"
        @prev="blogApi.prevPage" @goTo="blogApi.goToPage" /> -->
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

.article header .search input[type="text"] {
    height: 2rem;
    padding-left: 2rem;
    font-size: 1.2rem;
    background-color: var(--color-white);
    border: none;
    border-radius: var(--border-radius-2);
}

.article header .search span {
    position: absolute;
    font-size: 2rem !important;
}

.article header .add {
    color: #008489;
    cursor: pointer;
    background-color: var(--color-white);
    border-radius: 50%;
    font-size: 2.5rem !important;
    box-shadow: 0 0 .4rem #008489;
    transition: all 300ms ease;
}

.article header .material-symbols-sharp:hover {
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
    width: 25%;
    height: 20rem;
    display: flex;
    flex-direction: column;
    background-color: var(--color-white);
    border-radius: var(--card-border-radius);
    box-shadow: var(--box-shadow-1);
    position: relative;
}


main .card-container .card:hover {
    box-shadow: none;
    transition: all 300ms ease;
}

main .card-container .card img {
    border-radius: 1rem 1rem 0rem 0rem;
}

main .card-container .card .content-info {
    width: 100%;
    padding: 0.8rem;
}

main .card-container .card a {
    position: absolute;
    bottom: 0;
    border-radius: 0rem 0rem 2rem 2rem;
    text-align: center;
    margin: auto 0px;
    display: block;
    width: 100%;
    color: var(--color-primary);
}

main .card-container .card a:hover {
    background-color: var(--color-light);
}
</style>