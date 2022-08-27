import {createApp} from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementPlus from "element-plus"
import 'element-plus/dist/index.css'
import './style.css'
import {dragDirective} from "./unit/drag";
import Loading from "./components/Loading.vue"

const app = createApp(App);
app.use(ElementPlus);
app.use(router);
app.component('Loading', Loading)
app.directive('drag', dragDirective)
app.mount('#app');
