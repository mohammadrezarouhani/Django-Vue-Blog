import { ref } from "vue";
import axios from "axios";
import { baseURL } from "../services/baseUrl";
import axiosInstance from '../services/axios'
import { routeLocationKey } from "vue-router";
import useComponentStore from '../stores/componentStore'

export default function usersBlog() {
  const articles = ref([]);
  const article = ref({})
  const lastPage = ref(0);
  const currentPage = ref(1);
  const nextPage = ref(null)
  const prevPage = ref(null)
  const componentStore=useComponentStore()

  async function getAllArticles() {
    await axios.get(`${baseURL}/api/blog/post/?page=1`)
      .then(response => {
        articles.value = response.data.results;
        nextPage.value = response.data.next
        prevPage.value = response.data.previous
        lastPage.value = Math.ceil(response.data.count / 5);
      })
      .catch(error => {
        console.log('error in getAllArticles')
      })

  }


  async function getSingleArticle(id) {

    await axios.get(`${baseURL}/api/blog/post/${id}`)
      .then(response => {
        article.value = response.data
      })
      .catch(error => {
        console.log('error in get single article')
      })
  }


  async function getUserArticles(user) {

    await axiosInstance.get(`${baseURL}/api/blog/post/?user=${user}`)
      .then(response => {
        articles.value = response.data.results;
        nextPage.value = response.data.next
        prevPage.value = response.data.previous
        lastPage.value = Math.ceil(response.data.count / 5);
      })
      .catch(error => {
        console.log('error in getAllArticles')
      })
  }


  async function gotoNextPage() {
    await axios.get(nextPage.value)
      .then(response => {
        articles.value = response.data.results;
        nextPage.value = response.data.next
        prevPage.value = response.data.previous
        currentPage.value++
      })
      .catch(error => {
        console.log(error)
      })
  }


  async function gotoPrevPage() {
    await axios.get(prevPage.value)
      .then(response => {
        articles.value = response.data.results;
        nextPage.value = response.data.next
        prevPage.value = response.data.previous
        currentPage.value--
      })
      .catch(error => {
        console.log(error)
      })
  }


  async function goToPage(number, user = null) {
    const url = Boolean(user) ? `${baseURL}/api/blog/post/?page=${number}&&user=${user}` : `${baseURL}/api/blog/post/?page=${number}`

    console.log(url)

    await axios.get(url)
      .then(response => {
        articles.value = response.data.results;
        nextPage.value = response.data.next
        prevPage.value = response.data.previous
        currentPage.value = number
        lastPage.value = Math.ceil(response.data.count / 5);
      })
      .catch(error => {
        console.log('error in getAllArticles')
      })
  }

  async function createArticle(article) {
    if (validateObjectData(article)) {
      const formData = new FormData();
      formData.append('title', article.title);
      formData.append('summary', article.summary);
      formData.append('content', article.content);
      formData.append('user', article.user);
      formData.append('image', article.image);

      await axios.post(`${baseURL}/api/blog/post/`, formData)
        .then(response => {
          // show popup
          articles.value.unshift(response.data)
        })
        .catch(error => {
          console.error('Error creating article:', error);
        })
    }
  }

  async function updateArticle(article) {
    if (validateObjectData(article)) {
      const formData = new FormData();
      formData.append('title', article.title);
      formData.append('summary', article.summary);
      formData.append('content', article.content);
      formData.append('user', article.user);

      if (article.image instanceof File && article.image.size > 0) {
        console.log('image')
        formData.append('image', article.image);
      }

      await axios.put(`${baseURL}/api/blog/post/${article.id}/`, formData)
        .then(response => {
          getUserArticles(article.user)
        })
        .catch(error => {
          // Handle error - show error message or perform necessary actions
          console.error('Error updating article:', error.response);
        })
    }
  }


async function filterArticles(word) {

}


function validateObjectData(obj) {
  Object.values(obj).forEach(el => {
    if (!Boolean(el)) {
      return false
    }
  })
  return true
}

return {
  articles,
  article,
  lastPage,
  currentPage,
  getAllArticles,
  getSingleArticle,
  getUserArticles,
  gotoNextPage,
  gotoPrevPage,
  goToPage,
  createArticle,
  updateArticle
}

}