<script setup>
import axios from 'axios';
import { onMounted, ref, watchEffect } from 'vue';
import { baseURL } from '../services/baseUrl';

const articles = ref([])
const sliderArticle = ref([])
const position = ref(1)

onMounted(async () => {
  const response = await axios.get(`${baseURL}/api/blog/post/`)
  articles.value = response.data.results
  sliderArticle.value = articles.value
})

const onPrevButton = () => {
  sliderArticle.value.unshift(sliderArticle.value.pop())
}

const onNextButton = () => {
  sliderArticle.value.push(sliderArticle.value.shift())
}

const sliderItemNumber = ref(3)

watchEffect(() => {
  const handleResize = () => {
    if (window.innerWidth < 900) {
      sliderItemNumber.value = 1
    } else if (window.innerWidth < 1200) {
      sliderItemNumber.value = 2
    } else {
      sliderItemNumber.value = 3
    }
  }

  handleResize()

  window.addEventListener('resize', handleResize)

  return () => {
    window.removeEventListener('resize', handleResize)
  }
})

</script>
<template>
  <div class="post-slider">
    <h1 class="slider-title">Latest Posts</h1>
    <div class="container">
      <div class="slider-change" @click="onPrevButton">
        <span class="material-symbols-sharp">arrow_back_ios</span>
      </div>

      <div class="post-wrapper">
        <transition-group name="post-slide" tag="div" class="post-group">
          <div v-for="article in sliderArticle.slice(0, sliderItemNumber)" :key="article.id" class="post">
            <img :src="article.image" alt="" class="slider-image">
            <div class="post-info">
              <h4 class="post-title">
                <RouterLink :to="{ name: 'article', params: { id: article.id } }">{{ article.title }}</RouterLink>
              </h4>
              <br>
              <p class="text-muted">
                <span class="material-symbols-sharp">account_circle</span>{{ article.username }}
              </p>

              <p class="text-muted">
                <span class="material-symbols-sharp">calendar_month</span>{{ article.date }}
              </p>
            </div>
          </div>
        </transition-group>
      </div>

      <div class="slider-change" @click="onNextButton">
        <span class="material-symbols-sharp">arrow_forward_ios</span>
      </div>
    </div>
  </div>
</template>
  
<style scoped>
.post-group {
  display: flex;
}

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
  width: 300px;
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

.post-slider .slider-change span {
  width: 2rem;
  height: 2rem;
}

.post-slider .slider-change span:hover {
  font-size: 2rem;
  font-weight: 600;
  cursor: pointer;
  color: #008489;
}

@media screen and (max-width:800px) {
  .post-slider .container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 1rem;

  }
}
</style>
  