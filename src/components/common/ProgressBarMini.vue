<template>


  <div id="progress_box"></div>
  <Vue3Lottie :animationData="AstronautJSON" :height="100" :width="100" class="loading"/>



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
clearInterval(loading)

</script>

<style scoped>

.loading {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100
}

#progress_box {
  margin: 0;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
  width: 40px;
  height: 40px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
</style>
