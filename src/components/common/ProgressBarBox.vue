<template>

  <div id="progress_back">
    <Vue3Lottie :animationData="AstronautJSON" class="loading_bar"/>
    <p id="progress_wait" class="font-6 font-color text-nowrap">لطفا منتظر بمانید ...</p>
    <button onclick="window.location.reload()" id="btn" class="btn btn-outline-info btn_try">
      تلاش مجدد
    </button>
  </div>

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

var btn_time = setInterval(() => {
  document.getElementById('progress_wait').style.display = 'none'
  document.getElementById('btn').style.display = 'block'
  clearInterval(btn_time)
}, 10000)

</script>

<style scoped>

.loading_bar {
  z-index: 100;
  position: relative;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
}

#progress_back {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 120px;
  height: 120px;
  background-color: white;
  border-radius: 15px;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  padding-bottom: 20px;
  box-shadow: 0px 0px 10px 10px rgba(2, 220, 204, 0.77);
}

.btn_try {
  display: none;
  font-size: 10px
}

#btn_try:hover {
  color: white;
  background-color: #02DCCCC4;
}
</style>
