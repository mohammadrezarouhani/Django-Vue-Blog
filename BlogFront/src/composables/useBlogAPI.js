import { ref } from "vue";
import axiosInstance from '../services/axiosInstant';

export default function () {
  const articles = ref({});
  const lastPage = ref(0);
  const currentPage = ref(1);

  async function getAllArticles() {
    try {
      const response = await axiosInstance.get('/api/blog/post/?page=1');
      articles.value = response.data;
      lastPage.value = Math.ceil(response.data.count / 5);
    } catch (error) {
      console.log(error)
    }
  }

  async function nextPage() {
    try {
      if (articles.value.next) {
        const response = await axiosInstance.get(articles.value.next);
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
        const response = await axiosInstance.get(articles.value.previous);
        articles.value = response.data;
        currentPage.value--;
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function goToPage(number) {
    try {
      const response = await axiosInstance.get(`api/blog/post/?page=${number}`);
      articles.value = response.data;
      currentPage.value=number
    } catch (error) {
      console.log(error)
    }
  }


  async function filterArticles(word){
    
  }

  return {
    articles,
    lastPage,
    currentPage,
    getAllArticles,
    nextPage,
    prevPage,
    goToPage
  }
}
