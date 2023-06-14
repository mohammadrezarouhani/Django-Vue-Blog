<script setup>
import { Transition, ref, onMounted } from 'vue';

const { message, status } = defineProps(['message', 'status'])
const emit=defineEmits(['dismiss'])
const show=ref(true)

const dismissPopup = () => {
    show.value=false
    emit("dismiss")
}

onMounted(() => {
    if (show.value) {
        setTimeout(dismissPopup, 3000)
    }
})

</script>

<template>
    <div class="popup">
        <Transition name="popupShow" appear>
            <p v-if="show" class="message" :class="status=='success' ? 'success' : 'error'">{{ message }}</p>
        </Transition>

    </div>
</template>

<style scoped>
.popup {
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