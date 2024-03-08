<!-- @format -->

<script setup>
import { onBeforeMount, ref, watch } from "vue";
import useAuthStore from "../stores/AuthStore";
import useBlogAPI from "../composables/useBlogAPI";
import Pagination from "../components/Pagination.vue";
import BlogModal from "../components/BlogModal.vue";
import { storeToRefs } from "pinia";

let timer;
const blogApi = useBlogAPI();
const AuthStore = useAuthStore();
const {user}=storeToRefs(AuthStore)

const { articles } = blogApi;

onBeforeMount(async () => {
  await AuthStore.setUser();
  await blogApi.getUserArticles(AuthStore.user.id);
});

const showModal = ref(false);
const article_id = ref(null);
const modalMode = ref("create");

function createPostModal() {
  showModal.value = true;
  modalMode.value = "create";
}

function editPostModal(id) {
  showModal.value = true;
  article_id.value = id;
  modalMode.value = "edit";
}

async function submitArticle(data, update) {
  data.user = AuthStore.user.id;

  if (update) {
    await blogApi.updateArticle(data);
  } else {
    await blogApi.createArticle(data);
  }

  showModal.value = false;
}

const searchQuery = ref("");

watch(searchQuery, () => {
  clearTimeout(timer)

  timer = setTimeout(async () => {
    await blogApi.filterUserArticle(AuthStore.user.id, searchQuery.value)
  }, 600)
});
</script>

<template>
  <div class="article">
    <BlogModal v-if="showModal" class="modal-component" @close="showModal = false" @submit_data="submitArticle"
      :article_id="article_id" :mode="modalMode" />

    <header>
      <h1>User Blogs</h1>

      <div class="search">
        <span class="material-symbols-sharp" style="font-size: 2rem">search</span>
        <input type="text" v-model="searchQuery" />
      </div>

      <span class="material-symbols-sharp add" @click="createPostModal">add</span>
    </header>

    <Pagination v-if="blogApi.currentPage > blogApi.lastPage" class="pagination" :currentPage="blogApi.currentPage"
      :lastPage="blogApi.lastPage" :user="AuthStore.user.id" @next="blogApi.gotoNextPage" @prev="blogApi.gotoPrevPage"
      @goTo="blogApi.goToPage" />
    <main>
      <div class="card-container">
        <div class="card" v-for="article in articles" :key="article.id">
          <img :src="article.image" />
          <div class="content-info">
            <h2>{{ article.title }}</h2>
            <p class="summary">
              {{ article.summary.slice(0, 30) }}
              <span v-if="article.summary.length > 30">...</span>
            </p>
          </div>
          <div class="actions">
            <span class="material-symbols-sharp open" @click="editPostModal(article.id)">
              open_in_new
            </span>

            <span class="material-symbols-sharp delete" @click="blogApi.deletePost(article.id,user.id)"> delete </span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
img {
  width: 100%;
  height: 60%;
}

.article {
  display: flex;
  flex-direction: column;
  position: relative;
}

.article .modal-component {
  position: absolute;
  width: 100%;
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
  box-shadow: 0 0 0.4rem #008489;
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
  width: 28%;
  height: 22rem;
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

main .card-container .card .actions {
  display: flex;
  align-items: right;
  position: absolute;
  gap: 1rem;
  bottom: 10px;
  right: 20px;
}

main .card-container .card .actions .delete {
  color: var(--color-info-light);
  font-weight: bold;
  cursor: pointer;
}

main .card-container .card .actions .open {
  color: var(--color-primary);
  font-weight: bold;
  cursor: pointer;
}
</style>
