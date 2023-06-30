import { ref } from "vue";
import axios from "axios";
import axiosInstance from '../services/axios';
import { baseURL } from "../services/baseUrl";

export default function () {
  const articles = ref({});
  const lastPage = ref(0);
  const currentPage = ref(1);

  async function getAllArticles() {

    await axios.get(`${baseURL}/api/blog/post/?page=1`)
      .then(response => {
        articles.value = response.data;
        lastPage.value = Math.ceil(response.data.count / 5);
      })
      .catch(error => {
        console.log('error in getAllArticles')
      })

  }

  async function getSingleArticle(id) {

    await axios.get(`${baseURL}/api/blog/post/${id}`)
      .then(response => {
        articles.value = response.data;
      })
      .catch(error=>{
        console.log('error in get single article')
      })
  }

  async function nextPage() {
    try {
      if (articles.value.next) {
        const response = await axios.get(articles.value.next);
        articles.value = response.data;
        currentPage.value++;
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function prevPage() {
    try {
      if (articles.value.previous) {
        const response = await axios.get(articles.value.previous);
        articles.value = response.data;
        currentPage.value--;
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function goToPage(number) {
    try {
      const response = await axios.get(`${baseURL}/api/blog/post/?page=${number}`);
      articles.value = response.data;
      currentPage.value = number
    } catch (error) {
      console.log(error)
    }
  }


  async function filterArticles(word) {

  }

  return {
    articles,
    lastPage,
    currentPage,
    getAllArticles,
    getSingleArticle,
    nextPage,
    prevPage,
    goToPage
  }
}
