import { ref } from "vue";
import axios from "axios"
import { baseURL } from "../services/baseUrl";


export default function useComment() {
    const comments = ref([])

    async function getPostComment(post_pk) {
        axios.get(`${baseURL}/api/blog_custom/post/${post_pk}/comments/`)
            .then(response => {
                comments.value = response.data
            })
            .catch(error => {
                console.log(error.response)
            })
    }


    async function createNewComment(comment, post_pk) {
        if (comment.writer_name == null) {
            // show popup
            return
        }
        if (comment.writer_email == null) {
            //show popup
            return
        }
        if (comment.text == null) {
            // show pop up
            return
        }

        axios.post(`${baseURL}/api/blog_custom/post/${post_pk}/comments/`, comment)
            .then(response => {
                comments.value.unshift(response.data)
            })
            .catch(error => {
                // shoow popup
            })
    }

    return {
        comments,
        getPostComment,
        createNewComment
    }
}