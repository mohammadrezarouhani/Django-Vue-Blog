<!-- @format -->

<script setup>
import { reactive, onMounted, ref } from "vue";
import useBlogApi from "../composables/useBlogAPI";

const emit = defineEmits(["close", "submit_data"]);
const { article_id, mode } = defineProps(["article_id", "mode"]);

const blogApi = useBlogApi();
const { article } = blogApi;

const initialData = {
    id: null,
    title: null,
    summary: null,
    content: null,
    author: null,
    image: null,
};
const data = reactive(initialData);
const postImage = ref(null);

function setImage(event) {
    postImage.value = event.target.files[0];
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        data.image = e.target.result;
    };

    reader.readAsDataURL(file);
}

function submitData() {
    data.image = postImage.value;
    if (mode == "edit") {
        emit("submit_data", data, true);
    } else {
        emit("submit_data", data, false);
    }
}

onMounted(async () => {
    Object.assign(data, initialData);

    if (article_id && mode == "edit") {
        await blogApi.getSingleArticle(article_id);
        Object.assign(data, article.value);
    }
});
</script>

<template>
    <div class="overlay">
        <div class="modal">
            <div class="close">
                <span class="material-symbols-sharp" @click="emit('close')">
                    close
                </span>
            </div>
            <div class="profile-image">
                <img v-if="data.image" :src="data.image" />
                <img v-else src="@/assets/no-content.webp" />
            </div>
            <form action="submit" @submit.prevent="submitData">
                <input required type="file" accept="image/*" @change="setImage" />
                <input required type="text" placeholder="title" v-model="data.title" />
                <select required name="subject" id="subject" v-model="data.summary" placeholder="choose subject">
                    <option selected disabled value="default">choose a subject for you post</option>
                    <option value="Poem">Poem</option>
                    <option value="Quotes">Quotes</option>
                    <option value="Fiction">Fiction</option>
                    <option value="Biography">Biography</option>
                    <option value="Motivation">Motivation</option>
                    <option value="Inspiration">Inspiration</option>
                    <option value="Life Lessons">Life Lessons</option>
                </select>
                <textarea required name="content" id="" cols="30" rows="10" placeholder="Content" v-model="data.content"></textarea>
                <input type="submit" :value="mode"/>
            </form>
        </div>
    </div>
</template>

<style scoped>
select {
    height: 2rem;
    font-size: 1rem;
}

.overlay {
    width: 100%;
    height: 100%;
    display: flex;
    background-color: rgba(0, 0, 0, 0.4);
    align-items: center;
    justify-content: center;
    z-index: 999;
}

form{
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
}
.modal {
    background-color: var(--color-white);
    border-radius: 0.6rem;
    box-shadow: var(--box-shadow-1);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    width: 40%;
}

.modal textarea {
    resize: none;
    height: 5rem;
}

.modal .close {
    text-align: right;
}

.modal input[type="submit"] {
    background-color: var(--color-primary);
    color: var(--color-white);
    height: 2rem;
    cursor: pointer;
    border-radius: .4rem;
}

.modal .close span {
    font-weight: bold;
    cursor: pointer;
}

.modal .close span:hover {
    color: var(--color-info-light);
    transition: all 300ms ease;
}

.overlay .modal .profile-image {
    display: flex;
    align-items: center;
    justify-content: center;
}

.overlay .modal img {
    height: 10rem;
    width: 70%;
    padding: 0px 40px;
}
</style>
