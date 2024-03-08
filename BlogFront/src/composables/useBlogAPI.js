/** @format */

import { ref } from "vue";
import axios from "axios";
import { baseURL } from "../services/baseUrl";
import axiosInstance from "../services/axios";
import useComponentStore from "../stores/componentStore";

export default function usersBlog() {
  const articles = ref([]);
  const article = ref({});
  const lastPage = ref(0);
  const currentPage = ref(1);
  const nextPage = ref(null);
  const prevPage = ref(null);
  const componentStore = useComponentStore();

  async function getAllArticles() {
    await axios
      .get(`${baseURL}/api/blog/post/?page=1`)
      .then((response) => {
        articles.value = response.data.results;
        nextPage.value = response.data.next;
        prevPage.value = response.data.previous;
        lastPage.value = Math.ceil(response.data.count / 5);
      })
      .catch((error) => {
        componentStore.showPopup(
          "there is problem plese contact support !!!",
          "error"
        );
      });
  }

  async function filterArticles(query) {
    try {
      const response = await axios.get(`${baseURL}/api/blog/post/?search=${query}`)
      articles.value = response.data.results;
      nextPage.value = response.data.next;
      prevPage.value = response.data.previous;
      lastPage.value = Math.ceil(response.data.count / 5);
    } catch (error) {
      componentStore.showPopup(
        "there is problem plese contact support !!!",
        "error"
      );
    };
  }

  async function getSingleArticle(id) {
    await axios
      .get(`${baseURL}/api/blog/post/${id}`)
      .then((response) => {
        article.value = response.data;
      })
      .catch((error) => {
        componentStore.showPopup(
          "there is problem plese contact support !!!",
          "error"
        );
      });
  }

  async function getUserArticles(user) {
    await axiosInstance
      .get(`${baseURL}/api/blog/post/?user=${user}`)
      .then((response) => {
        articles.value = response.data.results;
        nextPage.value = response.data.next;
        prevPage.value = response.data.previous;
        lastPage.value = Math.ceil(response.data.count / 5);
      })
      .catch((error) => {
        componentStore.showPopup(
          "there is problem plese contact support !!!",
          "error"
        );
      });
  }

  async function filterUserArticle(user, searchQuery) {
    await axiosInstance
      .get(`${baseURL}/api/blog/post/?user=${user}&search=${searchQuery}`)
      .then((response) => {
        articles.value = response.data.results;
        nextPage.value = response.data.next;
        prevPage.value = response.data.previous;
        lastPage.value = Math.ceil(response.data.count / 5);
      })
      .catch((error) => {
        componentStore.showPopup(
          "there is problem plese contact support !!!",
          "error"
        );
      });
  }

  async function gotoNextPage() {
    if (nextPage.value) {
      await axios
        .get(nextPage.value)
        .then((response) => {
          articles.value = response.data.results;
          nextPage.value = response.data.next;
          prevPage.value = response.data.previous;
          currentPage.value++;
        })
        .catch((error) => {
          componentStore.showPopup(
            "there is problem plese contact support",
            "error"
          );
        });
    }
  }

  async function gotoPrevPage() {
    if (prevPage.value) {
      await axios
        .get(prevPage.value)
        .then((response) => {
          articles.value = response.data.results;
          nextPage.value = response.data.next;
          prevPage.value = response.data.previous;
          currentPage.value--;
        })
        .catch((error) => {
          componentStore.showPopup(
            "there is problem plese contact support",
            "error"
          );
        });
    }
  }

  async function goToPage(number, user = null) {
    const url = Boolean(user)
      ? `${baseURL}/api/blog/post/?page=${number}&&user=${user}`
      : `${baseURL}/api/blog/post/?page=${number}`;

    await axios
      .get(url)
      .then((response) => {
        articles.value = response.data.results;
        nextPage.value = response.data.next;
        prevPage.value = response.data.previous;
        currentPage.value = number;
        lastPage.value = Math.ceil(response.data.count / 5);
      })
      .catch((error) => {
        componentStore.showPopup(
          "there is problem plese contact support",
          "error"
        );
      });
  }

  async function createArticle(article) {
    if (validateObjectData(article)) {
      const formData = new FormData();
      formData.append("title", article.title);
      formData.append("summary", article.summary);
      formData.append("content", article.content);
      formData.append("user", article.user);
      formData.append("image", article.image);

      await axios
        .post(`${baseURL}/api/blog/post/`, formData)
        .then((response) => {
          componentStore.showPopup("article created successfully", "success");
          articles.value.unshift(response.data);
        })
        .catch((error) => {
          componentStore.showPopup(
            "there is problem plese contact support",
            "error"
          );
        });
    }
  }

  async function updateArticle(article) {
    if (validateObjectData(article)) {
      const formData = new FormData();
      formData.append("title", article.title);
      formData.append("summary", article.summary);
      formData.append("content", article.content);
      formData.append("user", article.user);

      if (article.image instanceof File && article.image.size > 0) {
        formData.append("image", article.image);
      }

      await axios
        .put(`${baseURL}/api/blog/post/${article.id}/`, formData)
        .then((response) => {
          componentStore.showPopup("edited successfully!!!", "success");
          getUserArticles(article.user);
        })
        .catch((error) => {
          componentStore.showPopup(
            "there is problem plese contact support",
            "error"
          );
        });
    }
  }

  function validateObjectData(obj) {
    Object.values(obj).forEach((el) => {
      if (!Boolean(el)) {
        return false;
      }
    });
    return true;
  }


  async function deletePost(id,user_id) {
    await axiosInstance
      .delete(`${baseURL}/api/blog/post/${id}/`)
      .then((response) => {
        componentStore.showPopup("deleting post success!!!","success")
      })
      .catch((error) => {
        componentStore.showPopup(
          "there is problem plese contact support !!!",
          "error"
        );
      });
      await getUserArticles(user_id)
  }

  return {
    articles,
    article,
    lastPage,
    currentPage,
    getAllArticles,
    filterArticles,
    filterUserArticle,
    getSingleArticle,
    getUserArticles,
    gotoNextPage,
    gotoPrevPage,
    goToPage,
    createArticle,
    updateArticle,
    deletePost
  };
}