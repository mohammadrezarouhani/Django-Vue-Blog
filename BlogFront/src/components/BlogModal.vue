<script setup>
import {reactive, onMounted} from 'vue';
import useBlogApi from '../composables/useBlogAPI'

const emit = defineEmits(['close', 'submit_data'])
const { article_id ,mode} = defineProps(['article_id', 'mode'])

const blogApi = useBlogApi()
const { article } = blogApi

const initialData = {
    id:null,
    title: null,
    summary: null,
    content: null,
    author: null,
    image: null
}

const data = reactive(initialData)

function setImage(event) {
    data.image = event.target.files[0]
}

function submitData() {
    if (mode=='edit') {
        emit('submit_data', data,  true)
    } else {
        emit('submit_data', data, false)
    }
}

onMounted(async () => {
    Object.assign(data, initialData)

    if (article_id && mode == 'edit') {
        await blogApi.getSingleArticle(article_id)
        Object.assign(data, article.value)
    }
})

</script>

<template>
    <div class="overlay">
        <div class="modal">
            <div class="close">
                <span class="material-symbols-sharp" @click="emit('close')">
                    close
                </span>
            </div>
            <img :src="data.image"  >
            <input type="file" accept="image/*" @change="setImage">

            <input type="text" placeholder="title" v-model="data.title">
            <input type="text" placeholder="summary" v-model="data.summary">
            <textarea name="content" id="" cols="30" rows="10" placeholder="Content" v-model="data.content"></textarea>
            <input type="button" value="Submit Change" @click="submitData">
        </div>
    </div>
</template>

<style scoped>
.overlay {
    width: 100%;
    height: 100%;
    display: flex;
    background-color: rgba(0, 0, 0, 0.4);
    align-items: center;
    justify-content: center;
    z-index: 999;
}

.modal {
    background-color: var(--color-white);
    border-radius: var(--card-border-radius);
    box-shadow: var(--box-shadow-1);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: var(--card-padding);
    width: 40%;

}

.modal textarea {
    resize: none;
}

.modal .close {
    text-align: right;
}

.modal input[type="button"] {
    background-color: var(--color-primary);
    color: var(--color-white);
    height: 2rem;
    cursor: pointer;
}

.modal .close span {
    font-weight: bold;
    cursor: pointer;
}

.modal .close span:hover {
    background-color: var(--color-info-light);
    transition: all 300ms ease;
}

.overlay .modal img{
    height: 15rem;
}
</style>