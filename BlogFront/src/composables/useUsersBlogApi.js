import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import axiosInstance from "../services/axios";


export default function useUsersBlog() {
    const articles = ref(null)


    async function setUserArticles(id) {
        await axiosInstance.get(`/api/blog/post/?user=${id}`)
            .then((response) => {
                articles.value = response.data.results
            })
            .catch((error) => {
                console.log(error)
            })
    }
    
    
    return {
        articles,
        setUserArticles
    }
}