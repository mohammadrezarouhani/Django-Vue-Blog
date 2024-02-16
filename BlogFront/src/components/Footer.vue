<!-- @format -->

<script>
import { reactive } from "vue";

const contact = reactive({
  email: "",
  message: "",
});

function submitForm() {}
</script>

<template>
  <div>
    <div class="footer">
      <div class="footer-content">
        <!-- about -->
        <div class="about">
          <h1 class="logo-text">Personal Blog</h1>
          <p class="description">
            personal blog that designed by <span> sara jahangoshai</span>
          </p>
          <div class="contact">
            <span
              ><a href=""
                ><i class="fas fa-phone">&nbsp; +9899900000</i></a
              ></span
            >
            <span
              ><a href="mailto:rezarouhanitonekaboni@gmail.com"
                ><i class="fas fa-envelope"
                  >&nbsp; sara.jahangoshai@gmail.com</i
                ></a
              ></span
            >
          </div>
          <div class="social">
            <span
              ><a href=""><i class="fab fa-instagram"></i></a
            ></span>
            <span
              ><a href="https://www.linkedin.com/in/sara jahangoshai"
                ><i class="fab fa-linkedin"></i></a
            ></span>
          </div>
        </div>

        <!-- links -->
        <div class="links">
          <h1 class="link-title">Links</h1>
          <ul class="link-list">
            <a href="#">
              <li>Gallery</li>
            </a>
            <a href="#">
              <li>About</li>
            </a>
            <a href="#">
              <li>Summary</li>
            </a>
            <a href="#">
              <li>Authors</li>
            </a>
          </ul>
        </div>

        <!-- form -->
        <div class="contact-form">
          <h1>Contact Us</h1>

          <form
            @submit="submitForm"
            method="post"
          >
            <input
              type="email"
              class="text-input contact-input"
              placeholder="your Email"
            />
            <textarea
              name="text"
              class="text-input contact-input"
              placeholder="Enter your Message"
            ></textarea>
            <button
              type="submit"
              class="send-button"
            >
              <i class="fas fa-envelope"></i>
              Send
            </button>
          </form>
        </div>

        <!-- bottom text -->
        <div class="bottom">&copy; MyBlog | designed by sara jahangoshai</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.footer {
  background: #303036;
  height: 300px;
  width: 100%;
  color: #d3d3d3;
  position: relative;
}

.footer .footer-content h1 {
  color: white;
}

.footer a {
  color: gray;
}

.footer a:hover {
  color: white;
}

.footer .logo-text {
  color: white;
}

.footer span {
  color: #00f1fa;
  font-size: 1rem;
}

.footer .bottom {
  width: 100%;
  height: 20px;
  text-align: center;
  background: linear-gradient(120deg, #2980b9, white);
  color: black;
  position: absolute;
  bottom: 0px;
  left: 0px;
}

/* About */
.footer .footer-content {
  height: 280px;
  display: flex;
}

.footer .footer-content .about {
  height: 100%;
  padding: 20px;
  flex: 1;
  display: block;
}

.footer .footer-content .about .contact span {
  display: block;
  margin-bottom: 8px;
  font-size: 0.2rem;
}

/* Social */
.footer .footer-content .about .social a {
  border: 1px solid gray;
  height: 35px;
  width: 35px;
  padding-top: 5px;
  margin-right: 5px;
  display: inline-block;
  text-align: center;
  border-radius: 10px;
  transition: all 0.3s;
}

.footer .footer-content .about .social a:hover {
  color: white;
  border: 1px solid white;
  transition: all 0.3s;
}

.footer .footer-content .about .social a i {
  font-size: 1.6rem;
}

/* Link */
.footer .footer-content .links {
  height: 100%;
  padding: 20px;
  flex: 1;
}

.footer .footer-content .links ul {
  margin: 0px;
  padding: 0px;
  margin-left: 20px;
  font-size: 1rem;
}

.footer .footer-content .links ul li {
  margin-top: 5px;
}

/* Contact Us Form*/
.footer .footer-content .contact-form {
  height: 100%;
  padding: 20px;
  flex: 1;
}

.footer .footer-content .contact-form input[type="email"] {
  font-size: 1.2rem;
}

.footer .footer-content .contact-form textarea {
  height: 80px;
  font-size: 1.2rem;
}

.footer .footer-content .contact-form button {
  height: 2.2rem;
  font-size: 1rem;
}
</style>
