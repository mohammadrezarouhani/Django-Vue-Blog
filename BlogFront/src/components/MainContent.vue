
<script setup>
import { RouterLink } from 'vue-router';
import { onMounted, ref } from 'vue';
import useBlogAPI from '../composables/useBlogAPI'

const blogApi = useBlogAPI()

onMounted(async () => {
    await blogApi.getAllArticles()
})

</script>

<template>
    <div class="content clearfix">
        <div class="left">
            <h1 class="content-header" id="top">Recent Posts</h1>
            <div class="post" v-for="article in blogApi.articles.value.results">
                <img :src="article.image" class="post-image">
                <div class="post-info">
                    <h2>
                        <a href="single.html">{{ article.title }}</a>
                    </h2>

                    <p class="post-summary">
                        {{ article.summary }}
                    </p>
                    <div class="user-info">
                        <span class="material-symbols-sharp">account_circle</span> {{ article.username }}
                        &nbsp;
                        <span class="material-symbols-sharp">calendar_month</span>{{ article.date }}
                    </div>
                    <a href="single.html" class="btn read-more">ReadMore</a>
                </div>
            </div>
            <div class="pagination">
                <a href="#top" @click="blogApi.prevPage">
                    <span class="material-symbols-sharp">first_page</span>
                </a>

                <a href="#top" @click="blogApi.goToPage(blogApi.currentPage.value)">
                    {{ blogApi.currentPage.value }}
                </a>
                <a href="#top" @click="blogApi.goToPage(blogApi.currentPage.value + 1)">
                    {{ blogApi.currentPage.value + 1 }}
                </a>....
                <a href="#top" @click="blogApi.goToPage(blogApi.lastPage.value)">
                    {{ blogApi.lastPage }}
                </a>

                <a href="#top" @click="blogApi.nextPage"><span class="material-symbols-sharp">last_page </span></a>
            </div>
        </div>

        <!-- post sidebar  recent post in rigt of the page with searchbar  -->
        <div class="right">
            <div class="search-bar">
                <h1 class="title">Search</h1>
                <form action="index.html" method="post">
                    <input type="text" name="Search" class="text-input" placeholder="Search...">
                </form>
            </div>
            <div class="topics">
                <h1 class="title">Topics</h1>
                <ul class="topic-list">
                    <li><a href="#">Poem</a></li>
                    <li><a href="#">Quotes</a></li>
                    <li><a href="#">Fiction</a></li>
                    <li><a href="#">Biography</a></li>
                    <li><a href="#">Motivation</a></li>
                    <li><a href="#">Inspiration</a></li>
                    <li><a href="#">Life Lessons</a></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>
.clearfix::after {
    content: '';
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
    border-radius: .25rem;
    transition: all 300ms ease;
}

.content .left .post .post-info .read-more:hover {
    background: #008c91;
    color: white;
    border: 1px solid transparent;
    border-radius: .25rem;
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
    transition: all .3s;
}

.right .topics .topic-list li:hover {
    padding-left: 15px;
    transition: all .3s;
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
</style>