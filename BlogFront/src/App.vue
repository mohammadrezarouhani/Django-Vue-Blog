<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router'
import useAuthStore from './stores/AuthStore';
import useComponentStore from './stores/componentStore'

import Popup from './components/Popup.vue'

const authStore=useAuthStore()
const componentStore=useComponentStore()

onMounted(async()=>{
    if(window.localStorage.getItem('isAuthenticated')){
        await authStore.setUser()
    }
})

</script>

<template>
    <Popup v-if="componentStore.popup.show" class="popup"/>
    <RouterView />
</template>

<style scoped>

.popup{
    position: absolute;
}

</style>
