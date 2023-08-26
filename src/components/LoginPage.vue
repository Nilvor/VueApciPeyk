<template>
  <ProgressBar v-if="loading"></ProgressBar>
  <ProgressBarMini v-if="loadingmini"></ProgressBarMini>

  <div id="blackforget" style="z-index: 50" @click="ToggleForget" class="blackbackedit"></div>

  <div id="main">
    <div class="holder">
      <LoginJson></LoginJson>
      <div class="main-element shadow mt-4">
        <p class="font-6 mb-4">جهت ورود لطفا نام کاربری و رمز عبور خود را وارد نمایید</p>
        <div class="d-flex div-input-number">
          <input v-model="username" class="input-number rounded-pill font-6 " type="text" placeholder="نام کاربری">
          <div class="icon-phone bg-color">
            <img class="svg-phone" src="../assets/img/user(1).svg" alt="">
          </div>
        </div>
        <div class="d-flex div-input-number my-2">
          <input v-model="password" class="input-number rounded-pill font-6 " type="text" placeholder="رمز عبور">
          <div class="icon-phone bg-color">
            <img class="svg-phone" src="../assets/img/login.svg" alt="">
          </div>
        </div>
        <button @click="SendLogin()" class="bg-color btn-number rounded-pill text-white font-5" type="submit">ارزیابی
        </button>
        <br>
        <div @click="ToggleForget" class="div-a mt-4">
          <p class="a-otp font-6 text-dark ">فراموشی رمز</p>
        </div>
      </div>
    </div>
  </div>

  <div id="holder_forget" class="holder_forget">
    <div class="main-element shadow mt-4">
      <p class="font-6 mb-4">نام و شماره تماس خود را عبور وارد کنید</p>
      <div class="d-flex div-input-number">
        <input v-model="name" class="input-number rounded-pill font-6 " type="text" placeholder="نام کاربری">
      </div>
      <div class="d-flex div-input-number my-2">
        <input v-model="number" class="input-number rounded-pill font-6 " type="tel" placeholder="شماره تماس">
      </div>
      <button @click="ForgetSend()" class="bg-color btn-number rounded-pill text-white font-5" type="submit">
        بازیابی رمز عبور
      </button>
    </div>
  </div>
</template>


<script>

import {ref} from "vue";
import validation from "../assets/js/validation";
import axios from "axios";
import ProgressBar from "@/components/common/ProgressBar";
import LoginJson from "@/components/common/LoginJson";
import ProgressBarMini from "@/components/common/ProgressBarMini";
import done from "@/assets/js/done";


export default {

  name: "LoginPage",
  components: {ProgressBar,ProgressBarMini, LoginJson},

  setup() {

    var urlPeyk = localStorage.getItem('urlPeyk')
    var urlBase = localStorage.getItem('urlBase')
    var apikey = localStorage.getItem('apiKey')
    var loading = ref(false)
    var loadingmini = ref(false)
    var username = ref('')
    var password = ref('')

    var name = ref('')
    var number = ref('')

    function SendLogin() {

      if (username.value === "") {
        validation('نام کاربری را وارد کنید');
        return false
      }
      if (password.value === "") {
        validation('کلمه عبور را وارد کنید');
        return false
      }

      loadingmini.value = true
      axios.post(urlPeyk + 'login', {
        apikey: apikey,
        username: username.value,
        password: password.value,

      }).then(function (response) {
        var res = response.data
        loadingmini.value = false

        if (res.status == 'ok') {
          localStorage.setItem('userId', res.user_id)
          window.location.href = '/homepage'
        } else if (res.status == 'error') {
          validation('نام کاربری یا کلمه عبور اشتباه است')
        } else {
          validation('ارتباط با سرور با خطا مواجه شد')
        }
      })
    }

    function ToggleForget() {
      var blackforget = document.getElementById("blackforget");
      var sheet = document.getElementById("holder_forget");
      if (sheet.style.display == "block") {
        sheet.style.display = "none";
        blackforget.style.display = 'none'
      } else {
        sheet.style.display = "block";
        blackforget.style.display = 'block'
      }
    }

    function ForgetSend() {

      if (name.value == '' || number.value == '') {
        validation('موارد بالا الزامی میباشد');
        return false
      }

      if (number.value.length < 11 || number.value.length > 11 || number.value.charAt(0) != 0 || number.value.charAt(1) != 9) {
        validation('شماره را بصورت صحیح وارد کنید');
        return false
      }

      loadingmini.value = true
      axios.post(urlBase + 'reset_password_request', {
        apikey: apikey,
        phonenumber: number.value,
        full_name: name.value
      }).then(function (response) {
        ToggleForget()
        loadingmini.value = false
        var res = response.data
        if (res.status == 'ok') {
          done('درخواست شما ثبت شد', 'LoginPage')
        } else if (res.message == 'limit reached') {
          validation('درخواست قبلی شما در حال بررسی است')
        } else {
          validation('ارتباط با سرور با خطا مواجه شد')
        }
      })
    }


    return {loading,loadingmini, username, password, name, number,ForgetSend, ToggleForget,SendLogin}
  }


}
</script>


<style scoped>

#main {
  background-color: rgb(239, 247, 247);
  background-image: url(../assets/img/Path-1399.svg);
  background-size: 110vw;
  background-repeat: no-repeat;
  background-position: bottom;
}

.main-element {
  background-color: #ffffff;
  border-radius: 30px;
  padding: 50px 30px 50px 30px;
  text-align: center;
}

.holder {
  padding: 70px 40px;
}

.img-login-phone {
  width: 100%;
}

.input-number {
  width: 100%;
  line-height: 40px;
  border: none;
  outline: 1px solid rgb(239, 247, 247);
  text-align: center;
  box-shadow: 0 0 15px rgb(212, 212, 212);
}

.input-number:focus {
  outline: 1px solid #02DCCC;
  transition: 0.9s;
}

.div-input-number {
  position: relative;
  text-align: center;
}

.icon-phone {
  height: 35px;
  width: 35px;
  border-radius: 50%;
  position: absolute;
  text-align: center;
  margin: 4px;
  padding: 5px;
  border: 2px solid #02DCCC;
}

.svg-phone {
  height: 18px;
}

.btn-number {
  width: 80%;
  border: none;
  line-height: 35px;
  margin: 15px 0 0 0;
}

.a-otp {
  text-decoration: none;
}

.holder_forget {
  display: none;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 52;
}
</style>
