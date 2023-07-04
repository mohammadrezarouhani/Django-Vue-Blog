import { ref, reactive } from "vue";
import { defineStore } from "pinia";


const useComponentStore = defineStore('components', () => {
    const initialData = {
        show: false,
        message: null,
        action: 'info'
    }
    const popup = reactive(initialData)

    function showPopup(message, action) {
        popup.show = true
        popup.message = message
        popup.action = action
        setTimeout(()=>{
            popup.show=false
        },3000)
    }

    return {
        popup,
        showPopup
    }
})

export default useComponentStore