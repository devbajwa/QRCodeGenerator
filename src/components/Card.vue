<script setup>
import { ref, computed } from "vue";
import APIService from "../services/APIService";

defineProps({
  msg: String,
});

const url = ref("");
const format = ref("");
const res = ref(null);
const code = ref("");
const showLoader = ref(false);

function addHTTPS(){
  if (!url.value.startsWith("https://")) {
        url.value = "https://";
      }
}

function removeHTTPS(){
  if (url.value === "https://") {
        url.value = "";
      }
}

function reset(){
  url.value = "";
  format.value = "";
  res.value = null;
}


function onSubmit() {
  res.value = "";
  showLoader.value = true;
  if (format.value === "png") code.value = "image/png";
  if (format.value === "jpg") code.value = "image/jpg";
  if (format.value === "jpeg") code.value = "image/jpeg";
  if (format.value === "svg") code.value = "image/svg+xml";

  APIService.getQRcode(url.value, format.value)
    .then((response) => {
      res.value = response.data;
      showLoader.value = false;
    })
    .catch((error) => {
      console.log(error);
    });
}

const isButtonDisabled = computed(() => {
  return !url.value || url.value === "https://" || !format.value;
});
</script>

<template>
  <h1>{{ msg }}</h1>
  <form @submit.prevent="onSubmit">
    <input v-model="url" type="text" placeholder="URL to generate QR Code" @focus="addHTTPS" @blur="removeHTTPS"/>
    <select v-model="format" id="format">
      <option disabled value="">Select Format</option>
      <option value="png">PNG</option>
      <option value="jpg">JPG</option>
      <option value="jpeg">JPEG</option>
      <option value="svg">SVG</option>
    </select>
    <button :disabled="isButtonDisabled" type="submit">Generate</button>
  </form>
  <div v-if="showLoader" class="loader">
    <img src="/public/loading.gif" alt="loader" />
  </div>
  <div class="result" v-if="res">
    <img :src="`data:${code};base64,${res}`" alt="Image" class="w250"/>
    <h4>{{ url }}</h4>
    <a :href="`data:${code};base64,${res}`" class="download-btn btn" download="My QR Code">Download</a>
    <a href="#" @click="reset" class="btn">Reset</a>
  </div>
  <footer>
      <p>Developer <a href="https://www.devbajwa.com" target="_blank">Waqas Naeem Bajwa</a></p> <span class="seperator">|</span>
      <div>Icon <a href="https://www.flaticon.com/free-animated-icons/loading" target="_blank" title="loading animated icons">Freepik - Flaticon</a></div>
  </footer>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700;800&display=swap");
* {
  box-sizing: border-box;
  font-family: "JetBrains Mono", monospace;
}

h1 {
  color: #052a75;
  font-weight: 800;
  margin-top: 15px;
}

h4{
  margin-top: 0px;
}

input,
select,
button {
  padding: 1.425rem;
  margin: 1rem;
}

input,
select {
  font-size: 1.25rem;
  border: 1px solid #1a8dc2;
}

input:focus,
select:focus {
  border-color: #052a75;
  box-shadow: 0 2px 15px #1a8dc259;
  outline: none;
}

input{
  width: 500px;
}

select,
option {
  cursor: pointer;
}

button {
  background-color: #d2dcfd;
  transition: all 0.15s ease;
  padding: 1.6rem;
}

button:not([disabled]):hover {
  background-color: rgba(255, 228, 196, 0.555);
  background-color: #beccfba2;
  border-color: #beccfba2;
  color: #052a75;
  outline: none;
  box-shadow: 0 2px 15px #1a8dc259;
}

button:not([disabled]):focus,
button:not([disabled]):active {
  outline: none;
  border: 1px solid #052a75;
}

button[disabled] {
  cursor: not-allowed;
}

button[disabled]:hover {
  border: 1px solid transparent;
  outline: none;
}

.result {
  margin-block: 2rem;
}

.loader img {
  width: 275px;
}

.w250{
  width: 250px;
}

.download-btn{
transition: all 0.15s ease-in;
margin-right: 1rem;
}

.btn:hover{
color: #052a75;
text-decoration: underline;
}

@media screen and (max-width: 1020px){
  input{
    width: auto;
  }
}

@media screen and (max-width: 850px) {
  #app {
    padding: 1rem;
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
