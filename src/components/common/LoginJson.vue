<template>
  <Vue3Lottie style="z-index: 100" :animationData="AstronautJSON" :height="200" :width="200"/>
</template>

<script>

import { Vue3Lottie } from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'

import AstronautJSON from '../../assets/json/bbb.json'

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


</script>
