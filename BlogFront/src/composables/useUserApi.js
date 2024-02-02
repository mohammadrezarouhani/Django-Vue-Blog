import { ref } from "vue";
import axiosInstance from "../services/axios";
import useAuthStore from "../stores/AuthStore";
import useComponentStore from "../stores/componentStore";

export default function useUser() {
  const user = ref(null);
  const AuthStore = useAuthStore();
  const componentStore = useComponentStore();

  async function updateUser(user) {
    await axiosInstance
      .put(`/auth/users/${user.id}/`, user)
      .then((response) => {
        componentStore.showPopup("edited success", "success");
      })
      .catch((error) => {
        componentStore.showPopup(
          "there is problem plese contact support",
          "error"
        );
      });
  }

  async function updateProfile(profile) {
    console.log(profile.image);
    if (validateObjectData(profile)) {
      const formData = new FormData();
      formData.append("phone", profile.phone);
      formData.append("user", profile.user);
      formData.append("address", profile.address);
      formData.append("summary", profile.summary);

      if (profile.image instanceof File) {
        formData.append("image", profile.image);
      }

      console.log(formData.image);
      await axiosInstance
        .put(`/api/blog/profile/me/`, formData)
        .then((response) => {
          AuthStore.setUser();
          // show popup
        })
        .catch((error) => {
          // show popup
        });
    }
  }

  function validateObjectData(obj) {
    Object.values(obj).forEach((el) => {
      if (!Boolean(el)) {
        return false;
      }
    });
    return true;
  }
  return {
    updateProfile,
    updateUser,
  };
}
