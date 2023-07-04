<script setup>
import { onBeforeMount, ref } from 'vue';
import useAuthStore from '../stores/AuthStore';
import useUserApi from '../composables/useUserApi'

const authUser = useAuthStore()
const user = ref({})
const profile=ref({})
const useUser=useUserApi()

function changeImage(event) {
    const file = event.target.files[0]
    profile.value.image=file
}

onBeforeMount(() => {
    authUser.setUser()
    Object.assign(user.value,authUser.user)
    Object.assign(profile.value,authUser.user.profile)
    profile.value.image=null
})

async function updateProfile(){
    await useUser.updateUser(user.value)
    await useUser.updateProfile(profile.value)
}

</script>

<template>
    <div class="profile">
        <div class="person-info">
            <img :src="authUser.user.profile.image" alt="">
            <input type="file" accept="image/*" @change="changeImage">
            <label class="lfullname">{{ authUser.user.username }}</label>
            <label class="lemail">{{ authUser.user.email }}</label>
            <h2>About</h2>
            <p class="about">
                {{ authUser.user.profile.summary }}
            </p>
        </div>

        <div class="person-input">
            <div class="table-container">
                <div class="table-row">
                    <div class="table-cell table-header">Username</div>
                    <div class="table-cell"><input type="text" v-model="user.username"></div>
                </div>

                <div class="table-row">
                    <div class="table-cell table-header">Name</div>
                    <div class="table-cell"><input type="text" v-model="user.first_name"></div>
                </div>
                <div class="table-row">
                    <div class="table-cell table-header">Family</div>
                    <div class="table-cell"><input type="text" v-model="user.last_name"></div>
                </div>
                <div class="table-row">
                    <div class="table-cell table-header">Phone</div>
                    <div class="table-cell"><input type="text" v-model="profile.phone_number"></div>
                </div>
                <div class="table-row">
                    <div class="table-cell table-header">Email</div>
                    <div class="table-cell"><input type="text" v-model="user.email"></div>
                </div>
                <div class="table-row">
                    <div class="table-cell table-header">Address</div>
                    <div class="table-cell"><textarea name="address" id="" cols="60" rows="10"
                            v-model="profile.address"> some text</textarea></div>
                </div>
                <div class="table-row">
                    <div class="table-cell table-header">Summary</div>
                    <div class="table-cell"><textarea name="address" id="" cols="60" rows="10"
                            v-model="profile.summary"> some text</textarea></div>
                </div>
                <div class="table-row">
                    <input type="submit" value="Update" @click="updateProfile">
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.profile {
    display: flex;
}

.profile .person-info {
    align-items: center;
    background-color: var(--color-dark-variant);
    color: white;
    display: flex;
    flex-direction: column;
    flex: 1;
    font-size: 1.3rem;
    gap: 1rem;
    padding: var(--padding-1);
}

.profile .person-info img {
    width: 20rem;
    height: 20rem;
    border-radius: 50%;
}

.profile .person-info .lfullname {
    font-weight: 500;
    font-size: larger;
}

.profile .person-input {
    flex: 2;
    background-color: var(--color-dark);
    color: white;
}

.table-container {
    display: flex;
    flex-direction: column;
    padding: 3rem;
    height: 100%;
    font-size: 1.2rem;
}

.table-row {
    display: flex;
    margin-top: 0.4rem;
    gap: 2rem;
    height: 50%;
}

.table-cell {
    display: inline;
}

.table-header {
    font-weight: bold;
    white-space: nowrap;
    width: 4rem;
}

.table-container input[type="text"] {
    height: 2rem;
    width: 20rem;
    font-size: 1.2rem;
}

.table-container textarea {
    font-size: 1.2rem;
    border: 1px solid;
    height: 8rem;
}

.table-container input[type="submit"] {
    width: 50%;
    height: 3rem;
    background-color: var(--color-primary);
    color: white;
    border: none;
    border-radius: var(--border-radius-1);
    cursor: pointer;
    transition: all 300ms ease;
}

.table-container input[type="submit"]:hover {
    background-color: var(--color-dark-variant);
    transition: all 300ms ease;
}

.table-container input[type="submit"]:active {
    border: 2px solid var(--color-white);
}

.table-container .table-row:last-child {
    align-items: center;
    justify-content: center;
}
</style>