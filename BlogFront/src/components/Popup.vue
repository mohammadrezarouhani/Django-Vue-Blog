<script setup>
import { Transition, ref, onMounted } from 'vue';
import useComponentStore from '../stores/componentStore'

const { message, status } = defineProps(['message', 'status'])
const componentStore = useComponentStore()
</script>

<template>
    <div class="popup">
        <Transition name="popupShow" appear>
            <p class="message" :class="componentStore.popup.action == 'success' ? 'success' : 'error'">
                {{ componentStore.popup.message }}
            </p>
        </Transition>

    </div>
</template>

<style scoped>
.popup {
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 5rem;
    background-color: inherit;
    margin: 1rem 0;
}

.popup .message {
    width: 20rem;
    height: inherit;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 1rem;
    padding: 1rem;
}

.popup .success {
    background-color: #27ae60;
    color: white;
}

.popup .error {
    background-color: #c0392b;
    color: white;
}

.popupShow-enter-from {
    transform: translateY(-100vh);
    opacity: 0;
}

.popupShow-enter-to {
    transform: translateY(0);
    opacity: 1;
}

.popupShow-enter-active {
    transition: all 1s ease;
}


.popupShow-leave-from {
    opacity: 1;
}

.popupShow-leave-to {
    opacity: 0;
}

.popupShow-leave-active {
    transition: all 1.5s ease;
}
</style>