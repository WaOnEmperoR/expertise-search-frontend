import { createApp } from 'vue'
import './style.css'
import router from "./router"
import App from './App.vue'
//in your `main.js` file
import '../node_modules/flowbite-vue/dist/index.css'
import JsonCSV from 'vue-json-csv'

// Vue.component('downloadCsv', JsonCSV)

const app = createApp(App);
app.use(router);
app.component('downloadCsv', JsonCSV);
app.mount("#app");

