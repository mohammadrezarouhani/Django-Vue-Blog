<script setup>
const emit = defineEmits(['next', 'prev', 'goTo'])
const { lastPage,currentPage,user } = defineProps(['currentPage', 'lastPage','user'])
function pages(){
    let arr=[]
    for(let i=1;i<4;i++){
        if(i<lastPage.value){
            arr.push(i)
        }
    }
    return arr
}

</script>

<template>
    <div class="pagination">
        
        <a href="#top" @click="emit('prev')">
            <span class="material-symbols-sharp">first_page</span>
        </a>

        <a class="current" href="#top" @click="emit('goTo',currentPage.value,user)">
            {{currentPage}}
        </a>

        <a v-for="page in pages()" class="page" href="#top" @click="emit('goTo',page,user)">
            {{page}}
        </a> ...

        <a class="page" href="#top" @click="emit('goTo',lastPage.value,user)">
            {{lastPage}}
        </a>
        <a href="#top" @click="emit('next')"><span class="material-symbols-sharp">last_page </span></a>
    </div>
</template>

<style scoped>
.pagination {
    display: flex;
    align-items: center;
    justify-content: center;
}

.pagination * {
    margin: .4rem;
    cursor: pointer;
}

.pagination .page {
    width: 2rem;
    height: 2rem;
    display: flex;
    text-align: center;
    justify-content: center;
    border-radius: .4rem;
    background-color: var(--color-primary);
    color: var(--color-white);
}

.pagination .current {
    width: 2rem;
    height: 2rem;
    display: flex;
    text-align: center;
    justify-content: center;
    border-radius: .4rem;
    background-color: var(--color-info-light);
    color: var(--color-dark);
    border: 1px solid var(--color-dark);
}

.pagination .page:hover {
    color: var(--color-danger);
}
</style>