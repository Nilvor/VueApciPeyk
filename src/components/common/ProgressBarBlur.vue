<template>

  <!--  <div style="border: red 1px solid">-->
  <div id="progress_back"></div>
  <Vue3Lottie style="z-index: 100" :animationData="AstronautJSON" :height="200" :width="200" class="loading"/>
  <p id="progress_wait" class="font-5 text-nowrap">لطفا منتظر بمانید ...</p>
  <button onclick="window.location.reload()" id="progress_reload" class="btn btn-outline-info font-5"> تلاش مجدد
  </button>
  <!--  </div>-->


</template>

<script>

import {Vue3Lottie} from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'

import AstronautJSON from '../../assets/json/loading.json'

export default {
  components: {
    Vue3Lottie,
  },
  data() {
    return {
      AstronautJSON,
    }
  },
}

var loading = setInterval(() => {
  document.getElementById('progress_reload').style.display = 'block'
  clearInterval(loading)
}, 10000)

</script>

<style scoped>

.loading {
  margin: 0;
  position: fixed;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -65%);
}

#progress_back {
  position: fixed;
  width: 100vw;
  height: 100vh;

  background: rgba(255, 255, 255, 0.16);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
  z-index: 90;
}

#progress_wait {
  color: #02DCCC;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100
}

#progress_reload {
  position: fixed;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -45%);
  z-index: 100;
  display: none;
}

#progress_reload:hover{
  color: white;
}
</style>
