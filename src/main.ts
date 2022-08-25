import {createApp} from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementPlus from "element-plus"
import 'element-plus/dist/index.css'
import './style.css'
import {dragDirective} from "./unit/drag";

const app = createApp(App)
app.use(ElementPlus);
app.use(router);
app.directive('drag', dragDirective)
app.mount('#app');
