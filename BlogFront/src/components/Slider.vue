<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';

const articles = ref([])
const sliderArticle = ref([])
const position=ref(1)

onMounted(async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/blog/post/')
    articles.value = response.data.results
    sliderArticle.value=articles.value
})

const onPrevButton=()=>{
    sliderArticle.value.unshift(sliderArticle.value.pop())
}

const onNextButton=()=>{
    sliderArticle.value.push(sliderArticle.value.shift())
}

</script>

<template>
    <div class="post-slider">
        <h1 class="slider-title">Trending Posts</h1>
        <div class="container">
            <div class="slider-change" @click="onPrevButton">
                <span class="material-symbols-sharp">arrow_back_ios</span>
            </div>

            <div class="post-wrapper">
                <div v-for="article in sliderArticle.slice(0,3)" class="post" style="">
                    <img :src="article.image" alt="" class="slider-image">
                    <div class="post-info">
                        <h4 class="post-title"><a href="single.html"> {{ article.title }}</a></h4>
                        <br>
                        <p class="text-muted"><span class="material-symbols-sharp">account_circle</span>{{ article.username }}</p>
                        
                        <p class="text-muted"><span class="material-symbols-sharp">calendar_month</span>{{ article.date }}</p>
                    </div>
                </div>
            </div>

            <div class="slider-change" @click="onNextButton">
                <span class="material-symbols-sharp ">arrow_forward_ios</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.post-slider {
    position: relative;
}

.post-slider .container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 4rem;
}

.post-slider .slider-title {
    text-align: center;
}

.post-slider .post-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 85%;
    height: 350px;
    margin: 0px auto;
    overflow: hidden;
}

.post-slider .post-wrapper .post {
    top: 24px;
    width: 350px;
    height: 320px;
    margin: 0px 10px;
    background: #eeeded;
    border-radius: 10px;
    box-shadow: 1rem 1rem 1rem -1rem #008489;
}

.post-slider .post-wrapper .post .slider-image {
    width: 100%;
    height: 200px;
    border-radius: 10px;
}

.post-slider .post-wrapper .post .post-info {
    margin: 5px;
}


.post-slider .post-wrapper .post .post-info .post-title {
    text-decoration: none;
    margin: 0px;
}


.post-slider .slider-change span{
    width: 2rem;
    height: 2rem;
}
.post-slider .slider-change span:hover {
    font-size: 2rem;
    font-weight: 600;
    cursor: pointer;
    color: #008489;

}
</style>