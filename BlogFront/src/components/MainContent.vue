<!-- @format -->

<script setup>
import { onMounted, ref, watch } from "vue";
import { RouterLink, useRoute } from "vue-router";
import useBlogAPI from "../composables/useBlogAPI";
import Pagination from "./Pagination.vue";

const blogApi = useBlogAPI();
const route = useRoute();
let timer;

const { articles } = blogApi;
const searchQuery = ref("");

onMounted(async () => {
    await blogApi.getAllArticles();
});

watch(searchQuery, () => {
    clearTimeout(timer);
    timer = setTimeout(async () => {
        await blogApi.filterArticles(searchQuery.value);
    }, 600);
});
</script>

<template>
    <div class="content clearfix">
        <div class="left">
            <h1 class="content-header" id="top">
                Recent Posts
            </h1>

            <div class="post" v-for="article in articles">
                <img :src="article.image" class="post-image" />
                <div class="post-info">
                    <h2>
                        <RouterLink :to="{ name: 'article', params: { id: article.id } }">{{
                            article.title
                        }}</RouterLink>
                    </h2>

                    <p class="post-summary">
                        {{ article.summary }}
                    </p>
                    <div class="user-info">
                        <span class="material-symbols-sharp">account_circle</span>
                        {{ article.username }}
                        &nbsp;
                        <span class="material-symbols-sharp">calendar_month</span>{{ article.date }}
                    </div>
                    <RouterLink :to="{ name: 'article', params: { id: article.id } }" class="btn read-more">ReadMore
                    </RouterLink>
                </div>
            </div>
            <Pagination v-if="blogApi.lastPage.value > 1" :currentPage="blogApi.currentPage" :lastPage="blogApi.lastPage"
                @next="blogApi.gotoNextPage" @prev="blogApi.gotoPrevPage" @goTo="blogApi.goToPage" />
        </div>

        <!-- post sidebar  recent post in rigt of the page with searchbar  -->
        <div class="right">
            <div class="search-bar">
                <h1 class="title">Search</h1>
                <form action="index.html" method="post">
                    <input type="text" name="Search" class="text-input" placeholder="Search..." v-model="searchQuery" />
                </form>
            </div>
            <div class="topics">
                <h1 class="title">Topics</h1>
                <ul class="topic-list">
                    <li @click="searchQuery = ' '"><a href="#top">All</a></li>
                    <li @click="searchQuery = 'Poem'"><a href="#top">Poem</a></li>
                    <li @click="searchQuery = 'Quotes'"><a href="#top">Quotes</a></li>
                    <li @click="searchQuery = 'Fiction'"><a href="#top">Fiction</a></li>
                    <li @click="searchQuery = 'Biography'"><a href="#top">Biography</a></li>
                    <li @click="searchQuery = 'Motivation'"><a href="#top">Motivation</a></li>
                    <li @click="searchQuery = 'Inspiration'"><a href="#top">Inspiration</a></li>
                    <li @click="searchQuery = 'Life Lessons'"><a href="#top">Life Lessons</a></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>
.clearfix::after {
    content: "";
    height: 100%;
    display: block;
    clear: both;
}

.container {
    display: flex;
    flex-direction: column;
}

.content {
    width: 90%;
    margin: 30px auto 30px;
    z-index: 100;
    display: flex;
}

.content .left {
    width: 70%;
    height: 100%;
}

.content .left .content-header {
    margin: 10px 25px 10px;
}

.content .left .post {
    display: flex;
    width: 95%;
    height: 270px;
    margin: 10px auto;
    border-radius: 10px;
    background-color: white;
}

.content .left .post .post-image {
    width: 45%;
    height: 100%;
    float: left;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    box-shadow: 1rem 1rem 1rem -1rem #008489;
}

.content .left .post .post-info {
    position: relative;
    padding: 10px;
    width: 55%;
    height: 100%;
}

.content .left .post .post-info .read-more {
    position: absolute;
    right: 20px;
    bottom: 10px;
    background: white;
    color: black;
    border: 1px solid gray;
    border-radius: 0.25rem;
    transition: all 300ms ease;
}

.content .left .post .post-info .read-more:hover {
    background: #008c91;
    color: white;
    border: 1px solid transparent;
    border-radius: 0.25rem;
}

.content .left .post .post-info h2 {
    margin: 0px;
}

.content .left .post .post-info .user-info {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 10px;
    /* font-size: .8rem; */
}

/* ************************** */
/* Side Bar  */
.content .right {
    width: 30%;
    height: inherit;
    float: right;
}

.content .right .title {
    margin: 0px;
}

.right .search-bar {
    background: white;
    border-radius: 10px;
    margin: 60px 0px 15px;
    padding: 5px 15px 15px;
}

.right .topics {
    background: white;
    border-radius: 10px;
    padding: 5px 15px 15px;
}

.right .topics .topic-list {
    list-style: none;
    padding: 0px 5px 0px;
}

.right .topics .topic-list li {
    list-style: none;
    padding: 15px 0px 15px;
    border-bottom: 1px solid gray;
    transition: all 0.3s;
    cursor: pointer;
}

.right .topics .topic-list li:hover {
    padding-left: 15px;
    transition: all 0.3s;
}

/* ----------------- pagination -------------------- */

.content .left .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
}

.content .left .pagination * {
    margin: 1rem;
    cursor: pointer;
    font-size: 1.5rem;
}

@media screen and (max-width:1200px) {
    .content .left {
        margin-top: 150px;
    }

    .content .left .post {
        display: flex;
        width: 90%;
        height: 400px;
        margin: 20px auto;
        border-radius: 10px;
        background-color: white;
        flex-direction: column;
    }

    .content .left .post .post-image {
        width: 100%;
        height: 100%;
        float: left;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        box-shadow: 1rem 1rem 1rem -1rem #008489;
    }

    .content .left .post .post-info {
        position: relative;
        padding: 10px;
        width: 100%;
        height: 100%;
    }

    .right .search-bar {
        background: none;
        border-radius: 10px;
        margin: 60px 0px 15px;
        padding: 5px 15px 15px;
        position: absolute;
        left: 60px;
        bottom: 40px;
        width: 600px;
    }

    .right .topics {
        background: none;
        border-radius: 10px;
        padding: 5px 15px 15px;
    }
}

@media screen and (max-width:800px) {
    .content {
        width: 90%;
        margin: 30px auto 30px;
        z-index: 100;
        display: flex;
        flex-direction: column-reverse;
    }

    .content .right {
        width: 100%;
        height: inherit;
        display: flex;
        flex-direction: column;
    }

    .right .search-bar {
        background: white;
        border-radius: 10px;
        margin: 60px 0px 15px;
        padding: 5px 15px 15px;
        position: static;
        width: inherit;
    }

    .right .topics {
        background: white;
        border-radius: 10px;
        padding: 5px 15px 15px;
    }

    .content .left {
        width: 100%;
        height: 100%;
    }

    .content .left {
        margin-top: 20px;
    }
}
</style>
