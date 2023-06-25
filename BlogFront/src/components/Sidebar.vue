
<script setup>
import { ref } from 'vue'


const emit = defineEmits(["tabChange"])
const currentIndex = ref(0)

function onTabClicked(index) {
    emit("tabChange", index)
    currentIndex.value = index
}


</script>

<template>
    <aside>
        <div class="tab-container">
            <div class="tab" :class="{ active: currentIndex == 0 }" @click="onTabClicked(0)">
                <div class="main">
                    <span class="material-symbols-sharp">
                        dashboard
                    </span>
                    <h3>Dashboard</h3>
                </div>
            </div>

            <div class="tab" :class="{ active: currentIndex == 1 }" @click="onTabClicked(1)">
                <div class="main">
                    <span class="material-symbols-sharp">
                        description
                    </span>
                    <h3>Article</h3>
                </div>
            </div>

            <div class="tab" :class="{ active: currentIndex == 2 }" @click="onTabClicked(2)">
                <div class="main">
                    <span class="material-symbols-sharp">
                        account_circle
                    </span>
                    <h3>Profile</h3>
                </div>
            </div>

        </div>
    </aside>
</template>

<style scoped>
aside {
    background-color: var(--color-background-1);
    box-shadow: var(--box-shadow);
}

aside .tab-container {
    position: relative;
    height: 100%;
}

aside .tab-container .tab {
    display: flex;
    align-items: center;
    transition: all 300ms ease;
    cursor: pointer;
}

aside .tab-container .tab:hover {
    color: var(--color-primary) !important;
    transition: all 300ms ease;
}

aside .tab-container .tab .main {
    display: flex;
    flex-direction: row;
    gap: 0.4rem;
    padding: 1rem;
    width: 100%;
    height: 100%;
    transition: all 300ms ease;
}

aside .tab-container .tab .main:hover{
    margin-left: 1rem;
    transition: all 300ms ease;
}

aside .tab-container .tab.active {
    background-color: var(--color-light);
}

aside .tab-container .tab:last-child {
    width: 100%;
    position: absolute;
    top: 40rem;
}
</style>