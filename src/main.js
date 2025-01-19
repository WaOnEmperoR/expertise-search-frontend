import { createApp } from 'vue'
import './style.css'
import router from "./router"
import App from './App.vue'
//in your `main.js` file
import '../node_modules/flowbite-vue/dist/index.css'

const app = createApp(App);
app.use(router);
app.mount("#app");

