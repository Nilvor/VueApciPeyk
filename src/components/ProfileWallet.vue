<template>

  <ProgressBar v-if="loading"></ProgressBar>
  <ProgressBarMini v-if="loadingmini"></ProgressBarMini>


  <div id="main">
    <div id="blackwallet" @click="toggleSheet" class="blackback"></div>

    <div class="d-flex div-top-arrow test">
      <p class="text-title font-title m-0">کیف پول</p>
      <img onclick="history.back()" class="svg-arrow" src="../assets/img/arrow.svg" alt="">
    </div>
    <!-- == -->
    <div v-if="loading == false" class="my-6">
      <div class="main-body">
        <div class="font-color font-4 title-wallet">
          <p>موجودی کیف پول شما</p>
        </div>

        <!-- = -->
        <div class="main-holder-wallet">
          <div class="justify-content-center" style="height: 55px; position: relative;">
            <div class="div-line-back d-flex ">
              <img class="line-back" src="../assets/img/Path2225.svg" alt="">
            </div>
            <div class="d-flex main-title justify-content-center">
              <div class="text-discount rounded-pill align-items-center">
                <p class="font-4 m-0  text-center-discount font-color">
                  {{ String(wallet).replace(/(.)(?=(\d{3})+$)/g, '$1,') }}
                </p>
                <img class="line-css-titile " src="../assets/img/Path2225.svg" alt="">
              </div>
              <div @click="toggleSheet()" class="holder-minus">
                <div class="holder-txt-all d-flex justify-content-center align-items-center">
                  <img class="img-discount" src="../assets/img/Path545321.svg" alt="">
                </div>
                <p class="font-color font-6 text-nowrap m-0 mt-2">درخواست تسویه</p>
              </div>
            </div>
          </div>
        </div>
        <!-- === -->
        <hr class="hr-big ">
        <div class="font-color font-4 title-club mt-3">
          <p class="font-4 m-0">درآمد روزانه</p>
        </div>
        <div class="d-flex align-items-center justify-content-center">
          <select v-model="this_month" @change="ChangeDay()" name="month" id=""
                  class="select-munt shadow-costom rounded-pill font-4 my-3">
            <option value="1">فروردین</option>
            <option value="2">اردیبهشت</option>
            <option value="3">خرداد</option>
            <option value="4">تیر</option>
            <option value="5">مرداد</option>
            <option value="6">شهریور</option>
            <option value="7">مهر</option>
            <option value="8">آبان</option>
            <option value="9">آذر</option>
            <option value="10">دی</option>
            <option value="11">بهمن</option>
            <option value="12">اسفند</option>
          </select>
        </div>
        <div class="d-flex align-items-center justify-content-center my-3">

          <div v-for="item in this_week" :key="item.id" @click="ChangeDay(item.day)"
               class="holder-week d-flex align-items-center justify-content-around"
               :style="item.day == today?'background-color:#02DCCC;color:white;border-radius:10px':''">
            <div class="div-day-week font-5 w-100">
              <p class="m-0 text-center w-100"> {{ item.name }} </p>
              <p class="m-0 text-center"> {{ item.day }} </p>
            </div>
            <img class="svg-line" src="../assets/img/Line-38545.svg" alt="">
          </div>

        </div>
        <!-- = -->
        <div class="d-flex justify-content-between align-items-center font-5 px-3">
          <p class="m-0">تعداد سفارش در این تاریخ</p>
          <p class="m-0 font-color">{{ current_report.delivery }}</p>
        </div>
        <hr class="bg-color">
        <div class="d-flex justify-content-between align-items-center font-5 px-3">
          <p class="m-0">پیک <span class="text-muted">(مبلغ درآمد بدون احتساب تحویل درب واحد)</span></p>
          <p class="m-0 font-color">
            {{ String(current_report.income - current_report.in_apartment).replace(/(.)(?=(\d{3})+$)/g, '$1,') }}
          </p>
        </div>
        <hr class="bg-color">
        <div class="d-flex justify-content-between align-items-center font-5 px-3">
          <p class="m-0">ویژه <span class="text-muted">(مبلغ تحویل درب واحد)</span></p>
          <p class="m-0 font-color">
            {{ String(current_report.in_apartment).replace(/(.)(?=(\d{3})+$)/g, '$1,') }}
          </p>
        </div>
        <hr class="bg-color">
        <div class="d-flex justify-content-between align-items-center font-5 px-3">
          <p class="m-0">درآمد <span class="text-muted">(مجموع کارکرد)</span></p>
          <p class="m-0 font-color">
            {{ String(current_report.income).replace(/(.)(?=(\d{3})+$)/g, '$1,') }}
          </p>
        </div>
        <hr class="bg-color">
        <div class="d-flex justify-content-between align-items-center font-5 px-3">
          <p class="m-0">تعداد سفارشات وجه نقد</p>
          <p class="m-0 font-color"> {{ current_report.cash.count }} </p>
        </div>
        <hr class="bg-color">
        <div class="d-flex justify-content-between align-items-center font-5 px-3">
          <p class="m-0">مبلغ دریافتی سفارشات وجه نقد</p>
          <p class="m-0 font-color">
            {{ String(current_report.cash.income).replace(/(.)(?=(\d{3})+$)/g, '$1,') }}
          </p>
        </div>
        <hr class="bg-color">
        <div class="d-flex justify-content-between align-items-center font-5 px-3">
          <p class="m-0">تعداد سفارشات وجه کارتخوان</p>
          <p class="m-0 font-color"> {{ current_report.credit.count }} </p>
        </div>
        <hr class="bg-color">
        <div class="d-flex justify-content-between align-items-center font-5 px-3">
          <p class="m-0"> مبلغ دریافتی سفارشات وجه کارتخوان</p>
          <p class="m-0 font-color">
            {{ String(current_report.credit.income).replace(/(.)(?=(\d{3})+$)/g, '$1,') }}
          </p>
        </div>
        <hr class="bg-color">
        <div class="d-flex justify-content-between align-items-center font-5 px-3">
          <p class="m-0">مبلغ خسارات</p>
          <p class="m-0 font-color">
            {{ String(current_report.damage).replace(/(.)(?=(\d{3})+$)/g, '$1,') }}
          </p>
        </div>
        <!-- = -->
        <hr class="hr-big">
        <p class="font-color font-4 text-center mt-3">گزارش گیری</p>
        <div class="d-flex w-100 my-3 justify-content-center">

          <div class="d-flex align-items-center justify-content-around">
            <span style="font-size: 12px">از: </span>
            <date-picker style="margin: 5px" v-model="date_from"></date-picker>
            <span style="font-size: 12px">تا: </span>
            <date-picker style="margin: 5px" v-model="date_to"></date-picker>
          </div>
        </div>
        <div @click="Report()" class="element-report font-6 shadow-costom d-flex justify-content-center">
          <p class="font-4 m-0 selection-header">گزارش گیری دوره ای</p>
        </div>
        <!-- = -->
        <div class="my-4">
          <div class="d-flex justify-content-between align-items-center font-5 px-3">
            <p class="m-0">تعداد سفارش در این تاریخ</p>
            <p class="m-0 font-color">{{ range_report.delivery }}</p>
          </div>
          <hr class="bg-color">
          <div class="d-flex justify-content-between align-items-center font-5 px-3">
            <p class="m-0">پیک <span class="text-muted">(مبلغ درآمد بدون احتساب تحویل درب واحد)</span></p>
            <p class="m-0 font-color">
              {{ String(range_report.income - range_report.in_apartment).replace(/(.)(?=(\d{3})+$)/g, '$1,') }}
            </p>
          </div>
          <hr class="bg-color">
          <div class="d-flex justify-content-between align-items-center font-5 px-3">
            <p class="m-0">ویژه <span class="text-muted">(مبلغ تحویل درب واحد)</span></p>
            <p class="m-0 font-color">
              {{ String(range_report.in_apartment).replace(/(.)(?=(\d{3})+$)/g, '$1,') }}
            </p>
          </div>
          <hr class="bg-color">
          <div class="d-flex justify-content-between align-items-center font-5 px-3">
            <p class="m-0">درآمد <span class="text-muted">(مجموع کارکرد)</span></p>
            <p class="m-0 font-color">
              {{ String(range_report.income).replace(/(.)(?=(\d{3})+$)/g, '$1,') }}
            </p>
          </div>
          <hr class="bg-color">
          <div class="d-flex justify-content-between align-items-center font-5 px-3">
            <p class="m-0">تعداد سفارشات وجه نقد</p>
            <p class="m-0 font-color"> {{ range_report.cash.count }} </p>
          </div>
          <hr class="bg-color">
          <div class="d-flex justify-content-between align-items-center font-5 px-3">
            <p class="m-0">مبلغ دریافتی سفارشات وجه نقد</p>
            <p class="m-0 font-color">
              {{ String(range_report.cash.income).replace(/(.)(?=(\d{3})+$)/g, '$1,') }}
            </p>
          </div>
          <hr class="bg-color">
          <div class="d-flex justify-content-between align-items-center font-5 px-3">
            <p class="m-0">تعداد سفارشات وجه کارتخوان</p>
            <p class="m-0 font-color"> {{ range_report.credit.count }} </p>
          </div>
          <hr class="bg-color">
          <div class="d-flex justify-content-between align-items-center font-5 px-3">
            <p class="m-0"> مبلغ دریافتی سفارشات وجه کارتخوان</p>
            <p class="m-0 font-color">
              {{ String(range_report.credit.income).replace(/(.)(?=(\d{3})+$)/g, '$1,') }}
            </p>
          </div>
          <hr class="bg-color">
          <div class="d-flex justify-content-between align-items-center font-5 px-3 pb-3">
            <p class="m-0">مبلغ خسارات</p>
            <p class="m-0 font-color">
              {{ String(range_report.damage).replace(/(.)(?=(\d{3})+$)/g, '$1,') }}
            </p>
          </div>
        </div>
      </div>
      <!-- == -->
      <div id="sheet" class="holder-menu" style="z-index: 11">
        <div class="p-sheet">
          <hr class="hr-top bg-color">
          <div class="d-flex px-3  mt-4">
            <img class="svg-creditcard" src="../assets/img/creditcard-plus.svg" alt="">
            <p class="font-5 text-center">لطفا شماره کارت و نام خانوادگی دارنده کارت را به صورت صحیح تکمیل کرده و دکمه
              <span class="font-color">"تایید"</span> را فشار دهید</p>
          </div>
          <br>
          <div class="shadow-costom holder-cart">
            <div class="d-flex position-relative holder-header-shet">
              <p class="font-color m-0 text-card">کارت بانکی</p>
              <img class="img-cart-sheet" src="../assets/img/Group649.svg" alt="">
            </div>
            <div class="">
              <form class="d-flex mt-3 digits_holder">
                <input @keyup="focusNext" v-model="card1" class="input-cart shadow-costom font-5  mx-1" type="text"
                       placeholder="- - - -" maxlength="4">
                <input @keyup="focusNext" v-model="card2" class="input-cart shadow-costom font-5 mx-1" type="text"
                       placeholder="- - - -" maxlength="4">
                <input @keyup="focusNext" v-model="card3" class="input-cart shadow-costom font-5 mx-1" type="text"
                       placeholder="- - - -" maxlength="4">
                <input @keyup="focusNext" v-model="card4" class="input-cart shadow-costom font-5  mx-1" type="text"
                       placeholder="- - - -" maxlength="4">
              </form>
              <div>
                <input v-model="bank_name" class="input-name shadow-costom font-6 mt-4" type="text"
                       placeholder="نام و نام خانوادگی">
              </div>

              <div class="d-flex align-items-center justify-content-center  mb-3">
                <button @click="BankOut" class="font-3 text-white btn-submit-sheet rounded-pill mt-5">تایید</button>
              </div>
              <div class="w-100 d-flex justify-content-center align-items-center">
                <img class="svg-Polygon mx-1" src="../assets/img/Polygon150.svg" alt="">
                <p class="font-color font-6 m-0">مبلغ کیف پول شما تا 72 ساعت آینده به حساب اعلامی شما واریز خواهد شد</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- == -->
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
import done from "@/assets/js/done";
import DatePicker from 'vue3-persian-datetime-picker'

export default {
  name: "ProfileWallet",
  components: {ProgressBar,ProgressBarMini, DatePicker},

  setup() {

    var urlPeyk = localStorage.getItem('urlPeyk')
    var apikey = localStorage.getItem('apiKey')
    var user_id = localStorage.getItem('userId')
    var loading = ref(true)
    var loadingmini = ref(false)

    var card1 = ref('')
    var card2 = ref('')
    var card3 = ref('')
    var card4 = ref('')
    var bank_name = ref('')

    var active_checkout = ref()
    var wallet = ref()
    var this_month = ref()
    var this_week = ref([])
    var current_report = ref()
    var range_report = ref()

    var today = ref()
    var date_from = ref()
    var date_to = ref()

    function GetWallet(one_day) {

      if (one_day == 'none') {
        var one_day_today = true
      }

      var date_from_send = 'none'
      if (date_from.value != undefined) {
        date_from_send = date_from.value
      }

      var date_to_send = 'none'
      if (date_to.value != undefined) {
        date_to_send = date_to.value
      }

      console.log({
        apikey: apikey,
        user_id: user_id,
        one_date: one_day,
        start_date: date_from_send,
        end_date: date_to_send
      })

      axios.post(urlPeyk + 'financial_page', {
        apikey: apikey,
        user_id: user_id,
        one_date: one_day,
        start_date: date_from_send,
        end_date: date_to_send
      }).then((response) => {
        var res = response.data
        console.log(res)
        loading.value = false
        loadingmini.value = false

        active_checkout.value = res.active_checkout
        wallet.value = res.wallet
        this_week.value = res.this_week.this_week
        current_report.value = res.current_report
        range_report.value = res.range_report

        if (one_day_today) {
          this_month.value = res.this_week.this_month.month

          var check = true
          res.this_week.this_week.forEach((item) => {
            if (check) {
              if (item.is_today == true) {
                today.value = item.day
                check = false
              }
            }
          })
        }
      })
    }

    GetWallet('none')

    function toggleSheet() {
      var blackwallet = document.getElementById("blackwallet");
      var sheet = document.getElementById("sheet");
      if (sheet.style.height == "470px") {
        sheet.style.height = "0px";
        blackwallet.style.display = 'none'
      } else {
        sheet.style.height = "470px";
        blackwallet.style.display = 'block'
      }
    }

    function focusNext(e) {

      const inputs = Array.from(e.target.form.querySelectorAll('input[type="text"]'));
      const index = inputs.indexOf(e.target);
      const max_length = inputs[0].getAttribute('maxlength');
      const value = inputs[index].value.length;

      console.log(index)
      if (e.key === "Backspace" || e.key === "Delete") {
        if (value == 0 && index > 0) {
          if (index < inputs.length) {
            inputs[index - 1].focus();
          }
        }
      }
      if (value == max_length && index < 3) {
        if (index < inputs.length) {
          inputs[index + 1].focus();
        }
      }
    }

    function BankOut() {
      if (card1.value.length < 4 || card2.value.length < 4 || card3.value.length < 4 || card4.value.length < 4) {
        validation("شماره کارت را بدرستی وارد کنید")
      } else if (bank_name.value == '') {
        validation("نام و نام خانوادگی حود را وارد کنید")
      } else {
        var bank_card = card1.value + '-' + card2.value + '-' + card3.value + '-' + card4.value

        swal.fire({
          icon: 'question',
          iconColor: '#004b45',
          text: 'از تسویه حساب کاربری اطمینان دارید؟ ',
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
            loadingmini.value = true
            axios.post(urlPeyk + 'payk_check_out', {
              apikey: apikey,
              user_id: user_id,
              card_number: bank_card,
              full_name: bank_name.value
            }).then((response) => {
              loadingmini.value = false
              var res = response.data
              if (res.status == 'ok') {
                done("درخواست تسویه حساب ارسال شد")
              }else {
                validation('درخواست قبلی شما در حال بررسی میباشد')
              }
            })
          }
        })
      }
    }

    function ChangeDay(day) {
      if (day != null) {
        today.value = day
      }

      var options = {year: 'numeric'};
      var year_fa = new Date().toLocaleDateString('fa-IR', options)
      var year_en = year_fa.replaceAll('۱', 1).replaceAll('۴', 4).replaceAll('۰', 0)

      var oneDay = year_en + '/' + this_month.value + '/' + today.value
      console.log(oneDay)
      loadingmini.value= true
      GetWallet(oneDay)
    }

    function Report(){
      loadingmini.value = true
      GetWallet('none')
    }

    return {
      loading,
      loadingmini,
      active_checkout,
      wallet,
      this_month,
      this_week,
      today,
      date_from,
      date_to,
      current_report,
      range_report,
      card1,
      card2,
      card3,
      card4,
      bank_name,
      GetWallet,
      Report,
      toggleSheet,
      ChangeDay,
      focusNext,
      BankOut
    }

  }
}

</script>

<style scoped>

.title-wallet {
  width: 100%;
  display: flex;
  justify-content: center;
}

.div-line-back {
  position: absolute;
  top: 50%;
}

.line-back {
  /* position: relative; */
  width: 80%;
  height: 10px;
  margin: 0 auto;
  display: block;
}

.main-title {
  position: absolute;
  top: 10px;
}

.main-holder-wallet {
  padding: 0 50px;
}

.holder-discount {
  margin: 0 auto;
  width: 45px;
  height: 45px;
  border-radius: 50px;
  box-shadow: 5px 5px 10px #c1d9d9, -5px -5px 10px white;
  background-color: rgb(239, 247, 247);
}

.img-discount {
  height: 25px;
  width: 25px;
}

.text-discount {
  box-shadow: 5px 5px 10px #c1d9d9, -5px -5px 10px white;
  background-color: rgb(239, 247, 247);
  height: 45px;
  width: 45%;
}

.holder-minus {
  position: absolute;
  left: 0;
  /* width: 55px; */
}

.text-center-discount {
  /* margin: 0 15% !important; */
  position: relative;
  top: 25%;
  width: 100%;
  text-align: center;
}

.holder-txt-all {
  margin: 0 auto;
  width: 45px;
  height: 45px;
  border-radius: 50px;
  box-shadow: 5px 5px 10px #c1d9d9, -5px -5px 10px white;
  background-color: rgb(239, 247, 247);
  padding: 12px;
}

.line-css-titile {
  height: 10px;
  margin: 0 15%;
  width: 70%;
  visibility: hidden;
}

.hr-big {
  width: 100%;
  height: 10px !important;
  margin: 70px 0 0 0;
  background-color: #adadad !important;
}

.title-club {
  width: 100%;
  display: flex;
  justify-content: center;
}

.select-munt {
  padding: 10px 20px;
  background-color: white;
  border: none;
  outline: none;
}

.select-munt:focus {
  outline: none;
}

.holder-week {
  width: 100%;
  height: 80px;
  /* background-color: red; */
  overflow: scroll;
}

.holder-week::-webkit-scrollbar {
  display: none;
  /* for Chrome, Safari, and Opera */
}

.holder-week {
  -ms-overflow-style: none;
  /* for Internet Explorer, Edge */
  scrollbar-width: none;
  /* for Firefox */
  overflow-y: scroll;
}

.div-day-week {
  width: 14%;
  flex-shrink: 0;
}

.svg-line {
  height: 60px;
}

.element-report {
  width: 60%;
  margin-right: 20%;
  height: 40px;
  margin-bottom: 20px;
  border-radius: 20px;
  /* background-color: rgb(239, 247, 247); */
  background-color: white;
  border: none;
  outline: none;
}

.element-report::placeholder {
  text-align: center;
}

.element-report:focus {
  outline: none;
}

.selection-header {
  height: 100%;
  border-bottom: 5px solid #02DCCC;
  color: #02DCCC;
  display: flex;
  align-items: center;
}

.digits_holder {
  direction: ltr;
}

/* == */

.holder-menu {
  position: fixed;
  /* left: 0; */
  bottom: 0;
  /* right: 0; */
  width: 100%;
  max-width: 500px;
  border-radius: 50px 50px 0 0;
  border-top: 1px solid rgb(161, 161, 161);
  background-color: rgb(239, 247, 247);
  height: 0px;
  transition: 1s;
  /* padding: 35px 20px 0 15px; */
}

.p-sheet {
  padding: 10px 20px 0 20px;
}

.hr-top {
  width: 50%;
  height: 4px !important;
  margin: 0 auto;
}

.svg-creditcard {
  height: 25px;
}

.holder-cart {
  width: 90%;
  border-radius: 10px;
  height: 230px;
  margin: 0 auto;
  padding: 0 20px;
}

.img-cart-sheet {
  height: 100px;
  position: absolute;
  left: -30px;
}

.text-card {
  font-size: 20px;
  position: absolute;
  right: 0;
  top: 40px;
}

.input-cart {
  width: 25%;
  height: 35px;
  border: none;
  border-radius: 25px;
  background-color: rgb(239, 247, 247);
  outline: none;
  text-align: center;
}

.input-cart:focus {
  outline: none;
}

.input-cart::placeholder {
  text-align: center;
  color: black;
  font-size: 16px;
}

.input-cart::placeholder {
  color: rgb(199, 199, 199);
}

.holder-header-shet {
  height: 100px;
}

.input-name {
  height: 35px;
  border: none;
  border-radius: 25px;
  background-color: rgb(239, 247, 247);
  outline: none;
  text-align: center;
}

.btn-submit-sheet {
  height: 50px;
  background-image: linear-gradient(to left, #00ACA0, #02DCCC);
  border: none;
  padding: 0 80px;
  margin: 40px 0 0 0;
}

.svg-Polygon {
  height: 15px;
}

.digits_holder {
  direction: ltr;
}

.color-green {
  color: #48e836;
}

.holder-bd-code {
  border-radius: 10px;
}

.hr-wallet {
  width: 90%;
  margin: 0 auto;
}
</style>
