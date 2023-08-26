import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import Vue3PersianDatetimePicker from 'vue3-persian-datetime-picker'

import '../src/assets/css/style.css';
import '../src/assets/css/mycss.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@vueform/toggle/themes/default.css'


localStorage.setItem('urlBase','https://adelathari.com/dezful/api/')
localStorage.setItem('urlPeyk','https://adelathari.com/dezful/api/payk/')
localStorage.setItem('urlUpload','https://adelathari.com/dezful/api/upload_pic')
localStorage.setItem('urlFile','https://adelathari.com/dezful/')
localStorage.setItem('apiKey','under_development')

window.scrollTo(0, document.body.scrollHeight);

// console.log(localStorage.getItem('userId'))
// localStorage.clear();
const app = createApp(App)
app.component('DatePicker', Vue3PersianDatetimePicker)
app.use(router)
app.mount('#app')
