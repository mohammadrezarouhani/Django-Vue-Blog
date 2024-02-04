import axios from "axios";
import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { baseURL } from "../services/baseUrl";
import axiosInstance from "../services/axios";
import useComponentStore from "./componentStore";

const useAuthStore = defineStore("auth", () => {
  const user = reactive({
    id: null,
    first_name: null,
    last_name: null,
    username: null,
    email: null,
    profile: {
      image: null,
    },
  });
  const refreshToken = ref("");
  const accessToken = ref("");
  const message = ref("");
  const messageStatus = ref("");
  const router = useRouter();
  const componentStore = useComponentStore();

  async function setUser() {
    await axiosInstance
      .get("/auth/users/me/", {
        headers: {
          Authorization: `JWT ${window.localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        Object.assign(user, response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function handleLogin(credentials) {
    await axios
      .post(`${baseURL}/auth/token/jwt/create/`, {
        username: credentials.username,
        password: credentials.password,
      })
      .then((response) => {
        accessToken.value = response.data.access;
        refreshToken.value = response.data.refresh;
        message.value = "user authorized successfully!";
        messageStatus.value = "success";

        window.localStorage.setItem("accessToken", accessToken.value);
        window.localStorage.setItem("refreshToken", refreshToken.value);
        window.localStorage.setItem("isAuthenticated", true);
        setUser();
        componentStore.showPopup("user logged in  successfully","success");
        setTimeout(() => router.push("/"), 3000);
      })
      .catch((error) => {
        if (error.response) {
          componentStore.showPopup(error.response, "error");
        }
      });
  }

  async function handleSignUp(credentials) {
    await axios
      .post(`${baseURL}/auth/users/`, {
        username: credentials.username,
        email: credentials.email,
        password: credentials.password,
      })
      .then((response) => {
        messageStatus.value = "success";
        message.value = `user ${credentials.username} created successfully`;
        componentStore.showPopup(message.value, "success");
        setTimeout(() => router.push("/login"), 3000);
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.data["email"]) {
            componentStore.showPopup(
              `email: ${error.response.data["email"][0]}`,
              "error"
            );
          } else if (error.response.data["username"]) {
            console.error(error.response.data);
            componentStore.showPopup(
              `username: ${error.response.data["username"][0]}`,
              "error"
            );
          } else if (error.response.data["password"]) {
            componentStore.showPopup(
              `password: ${error.response.data["password"][0]}`,
              "error"
            );
          }
        } else {
          componentStore.show(error);
        }
      });
  }

  function handleLogout() {
    window.localStorage.removeItem("accessToken");
    window.localStorage.removeItem("refreshToken");
    window.localStorage.removeItem("isAuthenticated");
    router.push("/login");
  }

  function validatePassword(password) {
    let regex = /^(?=.*?[0-9])(?=.*?[a-zA-Z]).{3,30}$/;
    return regex.test(password);
  }

  function validateEmail(email) {
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  return {
    user,
    refreshToken,
    accessToken,
    message,
    messageStatus,
    setUser,
    handleLogin,
    handleSignUp,
    handleLogout,
  };
});

export default useAuthStore;
