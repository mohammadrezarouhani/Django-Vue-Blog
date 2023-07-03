<script setup>
import { onBeforeMount, reactive } from 'vue';
import { useRoute } from 'vue-router';
import useBlogAPI from '../composables/useBlogAPI';
import useCommentApi from '../composables/useCommentApi'

const blogApi = useBlogAPI()
const route = useRoute()
const { article} = blogApi

const commentApi = useCommentApi()
const { comments } = commentApi

const comment = reactive({
    writer_name: null,
    writer_email: null,
    text: null
})

async function addComment() {
    await commentApi.createNewComment(comment, route.params.id)
    comment.writer_name = null
    comment.writer_email = null
    comment.text = null
}

onBeforeMount(async () => {
    await blogApi.getSingleArticle(route.params.id)
    await commentApi.getPostComment(route.params.id)
})


</script>

<template>
    <div class="container clearfix">
        <div class="content">
            <h1>
                {{ article.title }}
            </h1>
            <div class="article-image">
                <img :src="article.image" alt="">
            </div>

            <p>
                {{ article.content }}
            </p>
        </div>
        &nbsp;
        <hr>
        &nbsp;

        <div class="comments">
            <div class="comment" v-for="comment in comments" :key="comment.id">
                <label>{{ comment.writer_name }}</label>
                <p>{{ comment.text }}</p>
            </div>

            <div class="create">
                <div class="writer-detail">
                    <input type="text" placeholder="Your Name" v-model="comment.writer_name">
                    <input type="text" placeholder="Your Email" v-model="comment.writer_email">
                </div>
                <textarea name="" id="" cols="30" rows="10" v-model="comment.text"></textarea>
                <input type="submit" value="Add Your comment " @click="addComment">
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    width: 60%;
    height: 100%;
    margin: 2rem auto;
}

.container .article-image {
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


/* Comment  */
.comments {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.comments .comment {
    background-color: var(--color-white);
    border-radius: var(--card-border-radius);
    padding: var(--card-padding);
    border: 1px solid var(--color-dark);
    position: relative;
    color: var(--color-info-dark);
}

.comments .comment label {
    background-color: var(--color-background);
    position: absolute;
    top: -10px;
    padding: .4rem;
    border-radius: var(--border-radius-1);
}

.comments .create {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.comments .create .writer-detail {
    display: flex;
    flex-direction: row;
    gap: 1rem;
}

.comments .create .writer-detail input {
    width: 50%;
    height: 2rem;
}

.comments .create textarea {
    height: 10rem;
    padding: .4rem;
}

.comments .create input[type="submit"] {
    width: 10rem;
    padding: .4rem;
    background-color: var(--color-info-dark);
    font-weight: bold;
    border: none;
    border-radius: var(--border-radius-1);
    cursor: pointer;
}

.comments .create input[type="button"]:hover {
    color: var(--color-white);
    transition: all 300ms ease;
}
</style>