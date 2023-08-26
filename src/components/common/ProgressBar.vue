<template>

  <div id="progress_blur"></div>
  <div id="progress_box">
    <p id="progress_wait" class="font-5 text-nowrap">لطفا منتظر بمانید ...</p>
    <Vue3Lottie id="loading" :animationData="AstronautJSON" :height="200" :width="200"/>
  </div>
  <button id="progress_reload" onclick="window.location.reload()" class="btn btn-outline-info font-5"> تلاش مجدد
  </button>


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
  document.getElementById('progress_reload').style.visibility = 'visible'
  clearInterval(loading)
}, 10000)
// clearInterval(loading)

</script>

<style scoped>


#progress_blur {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: rgba(255, 255, 255, 0.16);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
  z-index: 90;
}

#progress_box {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  width: 150px;
  height: 150px;
  background-color: white;
  /*border: 1px solid #02DCCC;*/
  box-shadow: inset 0 50px 70px 5px rgb(188, 255, 249);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}


#progress_wait {
  color: #02DCCC;
  margin-top: 10px;
  z-index: 100;
}

#loading {
  position: fixed;
  top: 62%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100
}

#progress_reload {
  position: fixed;
  top: 62%;
  left: 50%;
  z-index: 100;
  transform: translate(-50%, -50%);
  visibility: hidden;
  border: none;
  box-shadow: inset 0 10px 100px 10px rgb(224, 255, 253);
}

#progress_reload:hover {
  color: white;
  background-color: #02DCCC;
}


</style>
