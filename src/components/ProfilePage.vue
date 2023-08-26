<template>

  <ProgressBar v-if="loading"></ProgressBar>
  <ProgressBarMini v-if="loadingmini"></ProgressBarMini>


  <div id="main">
    <div class="d-flex div-top-arrow test">
      <p class="text-title font-title m-0">کاربری</p>
      <img onclick="history.back()" class="svg-arrow" src="../assets/img/arrow.svg" alt="">
    </div>
    <!-- == -->
    <div v-if="loading == false" class="my-6">
      <div class="main-body">
        <div class="holder-user shadow-sm">
          <div class="d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center">
              <img class="img-profile shadow-sm" :src="urlFile+info.pic" alt="">
              <div class="mx-3">
                <p class="font-4 m-0 my-1"><span> {{info.full_name}} </span> عزیز </p>
                <p class="font-4  m-0 my-1"> {{info.phonenumber}} </p>
              </div>
            </div>
            <img @click="ExitPayk()" class="svg-exit" src="../assets/img/doorexit.png" alt="">
          </div>
          <hr>
          <div>
            <a :href="'tel:'+info.support_phone" class="holder-suport rounded-pill router_link">
                <img class="img-call" src="../assets/img/phonee.png" alt="">
                <p class="font-5 text-center text-white my-auto">ارتباط با پشتیبانی</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import ProgressBar from "@/components/common/ProgressBar";
import ProgressBarMini from "@/components/common/ProgressBarMini";
import {ref} from "vue";
import axios from "axios";
import swal from "sweetalert2";
import validation from "@/assets/js/validation";

export default {
  name: "ProfilePage",
  components: {ProgressBar,ProgressBarMini},

  setup() {

    var urlPeyk = localStorage.getItem('urlPeyk')
    var apikey = localStorage.getItem('apiKey')
    var user_id = localStorage.getItem('userId')
    var urlFile = localStorage.getItem('urlFile');
    var urlBase = localStorage.getItem('urlBase')

    var loading = ref(true)
    var loadingmini = ref(false)

    var info = ref()

    axios.post(urlPeyk+'get_profile',{
      apikey:apikey,
      user_id:user_id
    }).then((response)=>{
      var res =response.data
      console.log(res)
      loading.value = false
      info.value = res.info
    })

    function ExitPayk() {
      loadingmini.value = true
      swal.fire({
        icon: 'question',
        iconColor: '#004b45',
        text: 'خروج از برنامه ؟',
        width: 250,
        color: '#004b45',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'بله',
        cancelButtonText: 'خیر',
        confirmButtonColor: '#02c2b2',
        cancelButtonColor: '#004b45',
        background: 'white',
      }).then((result) => {
        if (result.isConfirmed) {
          axios.post(urlBase + 'logout', {
            apikey: apikey,
            user_id: user_id

          }).then(function (response) {
            loadingmini.value = false
            var res = response.data
            if (res.status == 'ok') {
              localStorage.clear()
              location.reload()
            } else {
              validation('خطای ارتباط با سرور')
            }
          })
        }
      })
    }

    return{loading,loadingmini,urlFile,info,ExitPayk}
  }
}
</script>

<style scoped>

.holder-user {
  width: 100%;
  border-radius: 15px;
  padding: 20px 15px;
  background-color: white;
}

.img-profile {
  border-radius: 50%;
  width: 60px;
  height: 60px;
}

.svg-exit {
  height: 50px;
}

.holder-suport {
  background-color: rgb(29, 175, 168);
  height: 50px;
  position: relative;
  width: 65%;
  display: flex;
  justify-content: center;
  margin: 0 auto;
}

.img-call {
  height: 50px;
  position: absolute;
  right: 0;
}
</style>
