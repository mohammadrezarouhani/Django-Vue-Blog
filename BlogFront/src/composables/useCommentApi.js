import { ref } from "vue";
import axios from "axios"
import { baseURL } from "../services/baseUrl";
import useComponentStore from '../stores/componentStore'

export default function useComment() {
    const comments = ref([])
    const componentStore = useComponentStore()

    async function getPostComment(post_pk) {
        axios.get(`${baseURL}/api/blog_custom/post/${post_pk}/comments/`)
            .then(response => {
                comments.value = response.data
            })
            .catch(error => {
                componentStore.showPopup("there is problem plese contact support", 'error')
            })
    }


    async function createNewComment(comment, post_pk) {
        axios.post(`${baseURL}/api/blog_custom/post/${post_pk}/comments/`, comment)
            .then(response => {
                comments.value.unshift(response.data)
                componentStore.showPopup("your note added successfully", 'success')
            })
            .catch(error => {
                componentStore.showPopup("there is problem plese contact support", 'error')
            })
    }

    function validateObjectData(obj) {
        Object.values(obj).forEach(el => {
            console.log(Boolean(el))
            if (!Boolean(el)) {
                return false
            }
        })
        return true
    }
    return {
        comments,
        getPostComment,
        createNewComment
    }
}