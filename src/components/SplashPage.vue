<template>

  <ProgressBar v-if="loading"></ProgressBar>
  <div id="main">
    <div class="font-3 holder-intero text-center d-flex flex-column align-items-center">
      <img class="img-intro" src="../assets/img/Component2–1.png" alt="">
      <h4 class="font-5 motto"> {{ motto }} </h4>
    </div>

    <div class="d-flex font-title holder-nav-intro align-items-center justify-content-center">
      <div v-if="version != ''" class="div-version rounded-pill text-center shadow flex-center">
        version {{ version }}
      </div>
      <div v-else class="div-version rounded-pill text-center shadow flex-center"> درحال اتصال...</div>
    </div>
  </div>

</template>

<script>


import ProgressBar from "@/components/common/ProgressBar";
import axios from "axios";
import {ref} from "vue";
import router from "@/router";


export default {
  name: "SplashPage",
  components: {ProgressBar},
  setup() {

    var urlBase = localStorage.getItem('urlBase')
    var apikey = localStorage.getItem('apiKey')
    var userId = localStorage.getItem('userId')
    var loading = ref(true)

    var version = ref('')
    var motto = ref('')

    axios.post(urlBase + 'get_user_state', {
      apikey: apikey,
      user_id : userId
    }).then(function (response) {

      loading.value = false
      var res = response.data
      console.log(res)

      if (res.status == 'ok') {
        version.value = res.versions.version_code_unit
        motto.value = res.motto

        var interval = setInterval(() => {
          clearInterval(interval)

          if (res.message == 'deleted'){
            router.push({name: 'LoginPage'})
          }
          if (res.message == 'normal'){
            router.push({name: 'HomePage'})
          }
          if (res.message == 'suspended'){
            motto.value = 'کاربری شما به حالت تعلیق درامده است.. با پشتیبانی تماس بگیرید'
          }
        }, 5000)
      }else {
        version.value = 'خطای ارتباط با سرور'
      }
    })



    return {loading, version, motto}
  }
}
</script>

<style scoped>

#main {
  background-color: rgb(239, 247, 247);
  background-image: url(../assets/img/back_splash.png);
  background-size: cover;
}

.holder-intero {
  width: 350px;
  position: absolute;
  top: 20%;
  right: 50%;
  transform: translate(50%);
  /* background-color: red; */
  color: rgb(119, 119, 119);
}

.img-intro {
  height: 200px;
  /* margin: 0 50%; */
  /* transform: translate(50%); */
}

.arrow-next {
  height: 20px;
}

.holder-nav-intro {
  width: 100%;
  max-width: 500px;
  /* background-color: red; */
  position: absolute;
  bottom: 10%;
  padding: 0 40px;
}

.costom-element-left {
  position: absolute;
  left: 40px;
}

.hr-intro {
  width: 80%;
  margin: 15px auto;
}

.bg-img {
  background-color: white;
  border-radius: 20px;
  width: 200px;
}

.div-version {
  height: 30px;
  font-size: 12px;
  background-color: white;
  width: 40%;
}
</style>

