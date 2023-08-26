<template>

  <ProgressBar v-if="loading"></ProgressBar>
  <div id="blackwallet" @click="toggleSheet" class="blackback"></div>

  <div id="main">
    <div class="d-flex div-top-arrow test">
      <p class="text-title font-title m-0">مشاهده جزئیات</p>
      <img onclick="history.back()" class="svg-arrow" src="../assets/img/arrow.svg" alt="">
    </div>
    <!-- == -->
    <div v-if="loading == false" class="my-6 py-3">
      <div class="main-body">
        <div class="holder-order-details shadow-sm">
          <p class="text-center font-3"> {{ info.unit_info.title }} </p>
          <hr class="hr-sm">
          <div class="d-flex font-5">
            <p class="font-5 m-0">تاریخ سفارش</p>
            <div class="d-flex costom-element-left">
              <p class="m-0"> {{ info.order_info.date_info.week_day }} </p>
              <p class="m-0 mx-3"> {{ info.order_info.date_info.date }} </p>
              <p class="m-0"> {{ info.order_info.date_info.time }} </p>
            </div>
          </div>
          <hr class="hr-sm">
          <div class="d-flex">
            <p class="font-5 m-0">تعداد اقلام</p>
            <div class="costom-element-left">
              <p class="m-0 font-5"><span class="mx-2"> {{ info.order_info.products.length }} </span>مورد</p>
            </div>
          </div>
          <hr class="hr-sm">
          <div class="orders_box">
            <div v-for="item in info.order_info.products" :key="item.id" class=" div-info-order">
              <div>
                <div class="position-relative">
                  <img class="img-order" :src="urlFile+item.pic" alt="">
                  <div class="div-num-order bg-color">
                    <p class="m-0 text-white font-6"> {{ item.count }} </p>
                  </div>
                </div>
                <p class="font-6 m-0 mt-2"> {{ item.title }} </p>
              </div>
            </div>
          </div>
          <!-- = -->
          <hr class="hr-sm">
          <div class="d-flex">
            <p class="font-5 m-0">مبلغ کل سفارش</p>
            <div class="costom-element-left">
              <p class="m-0 font-5">
                {{ String(info.order_info.factor.whole_price).replace(/(.)(?=(\d{3})+$)/g, '$1,') + ' تومان ' }}
              </p>
            </div>
          </div>
          <hr class="hr-sm">
          <div class="d-flex align-items-center">
            <img class="svg-loc mx-1" src="../assets/img/location(3).svg" alt="">
            <p class="font-5 m-0 px-1">مبدا : </p>
            <p class="m-0 font-5 text-end"> {{ info.unit_info.post_address }} </p>
          </div>
          <hr class="hr-sm">
          <div class="d-flex align-items-center">
            <img class="svg-loc mx-1" src="../assets/img/location(3).svg" alt="">
            <p class="font-5 m-0 px-1">مقصد : </p>
            <p class="m-0 font-5 text-end"> {{ info.address_info.post_address }} </p>
          </div>
          <hr class="hr-sm">
          <div class="d-flex">
            <p class="font-5 m-0">هزینه پیک</p>
            <div class="costom-element-left">
              <p class="m-0 font-5">
                {{ String(info.order_info.factor.payk_price).replace(/(.)(?=(\d{3})+$)/g, '$1,') + ' تومان ' }}
              </p>
            </div>
          </div>
          <hr class="hr-sm">
          <div class="d-flex">
            <p class="font-5 m-0">اصلاحیه فاکتور</p>
            <div class="costom-element-left">
              <p class="m-0 font-5">
                {{ String(info.order_info.factor.factor_alteration).replace(/(.)(?=(\d{3})+$)/g, '$1,') + ' تومان ' }}
              </p>
            </div>
          </div>
          <hr class="hr-sm">
          <div class="d-flex">
            <p class="font-5 m-0">خسارت پیک</p>
            <div class="costom-element-left">
              <p class="m-0 font-5">
                {{ String(info.order_info.factor.payk_damage).replace(/(.)(?=(\d{3})+$)/g, '$1,') + ' تومان ' }}
              </p>
            </div>
          </div>
          <hr class="hr-sm">
          <div class="d-flex">
            <p class="font-5 m-0">نحوه پرداخت</p>
            <div class="costom-element-left">
              <p class="m-0 font-5">
                {{ String(info.order_info.factor.whole_price).replace(/(.)(?=(\d{3})+$)/g, '$1,') + ' تومان ' }}
              </p>
            </div>
          </div>
          <hr class="hr-sm">
          <div class="d-flex">
            <p class="font-5 m-0">شماره پیگیری پرداخت</p>
            <div class="costom-element-left">
              <p class="m-0 font-5"> {{ info.order_info.pay_method }} </p>
            </div>
          </div>
          <br>
          <button v-if="can_take == false" class="btn btn-outline-danger my-2 w-75">
            محدودیت در قبول سفارش
          </button>
          <button v-else @click="toggleSheet()" class="btn btn-outline-success my-2 w-75">
            قبول سفارش
          </button>
          <!-- = -->
        </div>
      </div>
    </div>
    <!-- == -->
    <div id="sheet" class="holder-menu" style="z-index: 11">

      <div v-if="multi_order && has_active_order">
        <div class="p-sheet">
          <hr class="hr-top bg-color">

          <div class="d-flex justify-content-center mt-3">
            <img class="img-info mx-1" src="../assets/img/location(3).svg" alt="">
            <div>
              <div class="font-5 text-center m-1">کاربر گرامی در نظر داشته باشید که شما یک سفارش فعال دارید</div>
              <div class="font-4 text-center m-1 font-color">آیا همچنان مایل به قبول سفارش هستید ؟</div>
            </div>
          </div>
        </div>
        <div class="d-flex align-items-center justify-content-center my-4 mb-3 ">
          <button @click="OrderAccept()" class="btn btn-outline-primary btn-edit-story mx-2 ">قبول سفارش همزمان</button>
          <button class="font-5 text-white btn-delate rounded-pill mx-2 ">رد سفارش</button>
        </div>
      </div>

      <div v-else>
        <div class="p-sheet">
          <hr class="hr-top bg-color">

          <div class="d-flex justify-content-center mt-3">
            <img class="img-info mx-1" src="../assets/img/location(3).svg" alt="">
            <div>
              <div class="font-4 text-center m-1 font-color">آیا مایل به قبول سفارش هستید ؟</div>
            </div>
          </div>
        </div>
        <div class="d-flex align-items-center justify-content-center my-4 mb-3 ">
          <button @click="OrderAccept()" class="font-5 text-white btn-edit-story rounded-pill mx-2 ">قبول سفارش</button>
          <button class="font-5 text-white btn-delate rounded-pill mx-2 ">رد سفارش</button>
        </div>
      </div>

    </div>

    <!-- == -->
  </div>

</template>

<script>
import ProgressBar from "@/components/common/ProgressBar";
import {ref} from "vue";
import {useRoute} from "vue-router";
import axios from "axios";
import validation from "@/assets/js/validation";
import swal from "sweetalert2";
import router from "@/router";

export default {
  name: "OrderDetails",
  components: {ProgressBar},
  setup() {

    var urlPeyk = localStorage.getItem('urlPeyk')
    var urlFile = localStorage.getItem('urlFile')
    var apikey = localStorage.getItem('apiKey')
    var user_id = localStorage.getItem('userId')
    var loading = ref(true)

    var order_id = useRoute().params.order_id
    var can_take = ref()
    var has_active_order = ref()
    var multi_order = ref()
    var info = ref()
    var lat = ref()
    var lng = ref()

    axios.post(urlPeyk + 'get_order_details', {
      apikey: apikey,
      user_id: user_id,
      order_id: order_id
    }).then((response) => {
      var res = response.data
      console.log(res)
      loading.value = false
      can_take.value = res.can_take
      has_active_order.value = res.has_active_order
      multi_order.value = res.multi_order
      info.value = res.info
      lat.value = res.info.location.lat
      lng.value = res.info.location.lng
    })

    function toggleSheet() {
      var blackwallet = document.getElementById("blackwallet");
      var sheet = document.getElementById("sheet");
      if (sheet.style.height == "200px") {
        sheet.style.height = "0px";
        blackwallet.style.display = 'none'
      } else {
        sheet.style.height = "200px";
        blackwallet.style.display = 'block'
      }
    }

    function OrderAccept() {
      loading.value = true
      axios.post(urlPeyk + 'take_order', {
        apikey: apikey,
        user_id: user_id,
        order_id: order_id
      }).then((response) => {
        var res = response.data
        console.log(res)
        loading.value = false

        if (res.status == 'ok') {

          swal.fire({
            icon: 'question',
            iconColor: '#004b45',
            text: ' سفارش ثبت شد. مسیریابی خودکار انجام شود؟ ',
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
              navigator.geolocation.getCurrentPosition((pos) => {
                window.location.href = 'https://www.google.com/maps/dir/' + pos.coords.latitude + ',' + pos.coords.longitude + '//@' + lat.value + ',' + lng.value + ',14z/data=!4m2!4m1!3e2'
              });
            } else {
              router.push({name: 'HomePgae'})
            }
          })

        } else {
          validation('درخواست شما با خطا مواجه شد')
        }

      })

    }


    return {loading, can_take, has_active_order, multi_order, info, urlFile, toggleSheet, OrderAccept}
  }
}
</script>

<style scoped>

.holder-order-details {
  width: 100%;
  border: 1px solid rgb(221, 221, 221);
  padding: 15px;
  position: relative;
  border-radius: 15px;
  background-color: white;
}

.hr-sm {
  background-color: rgb(199, 199, 199);
  height: 0.5px !important;
}

.costom-element-left {
  position: absolute;
  left: 15px;
}

.img-order {
  height: 100px;
  width: 90px;
  border-radius: 10px;
}

.orders_box {
  width: 80%;
  margin-right: 40px;
  display: grid;
  grid-template-columns: auto auto auto;
  grid-template-rows: auto auto auto;
}

.div-info-order {
  width: 33%;
  display: flex;
  justify-content: center;
  margin: 5px 0;
}

.div-num-order {
  width: 25px;
  height: 25px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: -5px;
  bottom: -5px;
}

.svg-loc {
  height: 20px;
}

.btn-accept {
  width: 60%;
  padding: 15px 0;
  background-color: #1CCF98;
  border: none;
  display: block;
  margin: 0 auto;
}

.holder-menu {
  position: fixed;
  /* left: 0; */
  bottom: 0;
  /* right: 0; */
  width: 100%;
  max-width: 500px;
  border-radius: 50px 50px 0 0;
  border-top: 1px solid rgb(161, 161, 161);
  background-color: rgb(255, 255, 255);
  height: 0px;
  transition: 1s;
  /* padding: 35px 20px 0 15px; */
}

.hr-top {
  width: 50%;
  height: 4px !important;
  margin: 0 auto;
}

.p-sheet {
  padding: 10px 25px 0 25px;
}

.btn-edit-story {
  height: 50px;
  background-color: #3bb921;
  border: none;
  /* padding: 0 80px; */
  width: 35%;
}

.btn-delate {
  height: 50px;
  border: none;
  width: 35%;
  background-color: #E53935;
}

.img-info {
  height: 30px;
}

.p-sheet {
  padding: 10px 20px 0 20px;
}

.hr-top {
  width: 50%;
  height: 4px !important;
  margin: 0 auto;
}
</style>
