import { ref } from "vue";
import axios from "axios";
import { baseURL } from "../services/baseUrl";
import axiosInstance from '../services/axios'
import { routeLocationKey } from "vue-router";


export default function usersBlog() {
  const articles = ref([]);
  const lastPage = ref(0);
  const currentPage = ref(1);
  const nextPage = ref(null)
  const prevPage = ref(null)

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
        articles.value = response.data;
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
    const url = Boolean(user)  ? `${baseURL}/api/blog/post/?page=${number}&&user=${user}` : `${baseURL}/api/blog/post/?page=${number}`

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


  async function createArticle(article){
    await axios.post(`${baseURL}/api/blog_custom/post/`)
    .then(response=>{
      articles.value.unshift(response.data)
    })
    .catch(error=>{
      // show popup
    })
  }

  async function filterArticles(word) {

  }

  function validateObjectData(object={}){
    object.values
  }

  return {
    articles,
    lastPage,
    currentPage,
    getAllArticles,
    getSingleArticle,
    getUserArticles,
    gotoNextPage,
    gotoPrevPage,
    goToPage,
  }
}
