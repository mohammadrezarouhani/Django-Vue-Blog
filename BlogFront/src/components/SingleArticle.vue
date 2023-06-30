<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import useBlogAPI from '../composables/useBlogAPI';

const blogApi=useBlogAPI()
const route=useRoute()

onMounted(()=>{
    blogApi.getSingleArticle(route.params.id)
})

</script>

<template>
    <div class="container clearfix">
        <div class="content">
            <h1>
                {{ blogApi.articles.value.title }}
            </h1>

            <div class="article-image">
                <img :src="blogApi.articles.value.image" alt="">
            </div>

            <p>
                {{ blogApi.articles.value.content}}
            </p>
        </div>
        &nbsp;
        <hr >
        &nbsp;

    </div>
</template>

<style scoped>
.container {
    width:60%;
    height: 100%;
    margin :2rem auto;
}

.container .article-image{
    display: flex;
    align-items: center;
    justify-content: center;
}
.container p {
    width: 100%;
    height: 100%;
}

.container h1 {
    text-align: center;
    margin-bottom: 2rem;
}

.container img {
    height: 30rem;
    width: 60%;
    margin-bottom: 2rem;
    border-radius: 1REM;
}
</style>