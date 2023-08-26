<template>

  <ProgressBar v-if="loading"></ProgressBar>

  <div id="main">
    <div class="d-flex div-top-arrow test">
      <p class="text-title font-title m-0">تمام سفارشات</p>
      <img onclick="history.back()" class="svg-arrow" src="../assets/img/arrow.svg" alt="">
    </div>
    <!-- == -->
    <div v-if="loading == false" class="my-6 py-3">
      <div class="main-body">

        <div class="d-flex font-color font-5">
          <p class="">آخرین بروزرسانی</p>
          <p class="mx-3"> {{ update_time.date }} </p>
          <p> {{ update_time.time }} </p>
          <p> {{ update_time.week_day }} </p>
        </div>
        <div v-if="list.length > 0">
          <div v-for="item in list" :key="item.id" class="holder-element-all-orders shadow-sm my-3">
            <div class="d-flex align-items-start position-absolute" style="left: 10px;top: 10px;width: 120px">
              <div style="margin-left: 10px">
                <div class="d-flex align-items-center" style="height: 40px">
                  <img class="img-timer" src="../assets/img/clock(542).svg" alt="">
                  <p class="font-color font-5 m-0 mx-2">زمان تحویل سفارش</p>
                </div>
                <p class="font-color m-0"> {{ item.ready_time }} </p>
              </div>
              <img style="width: 15px;height: 15px" src="../assets/img/multiply-mathematical-sign22.svg" alt="">
            </div>
            <div class="d-flex align-items-center my-2">
              <p class="font-color font-3  m-0">مجموعه :</p>
              <p class="font-4 m-0 mx-1 w-text text-end"> {{ item.unit_info.title }} </p>
            </div>

            <div class="d-flex  my-2">
              <p class="m-0 font-4 font-color">مبدا :</p>
              <p class="m-0 font-5 mx-1 w-text text-end"> {{ item.source }} </p>
            </div>

            <div class="d-flex  my-2">
              <p class="m-0 font-4 font-color">مقصد :</p>
              <p class="m-0 font-5 mx-1 w-text text-end"> {{ item.destination }} </p>
            </div>

            <div class="d-flex my-2">
              <p class="m-0 font-4 font-color">نحوه پرداخت : </p>
              <p class="m-0 font-5 mx-1 w-text text-end"> {{ item.pay_method }} </p>
            </div>

            <hr class="bg-color">
            <div class="d-flex  align-items-center">
              <p class="m-0 font-4 font-color">هزینه پیک :</p>
              <p class="m-0 font-4 mx-1 "> {{ item.payk_price }} </p>
              <router-link :to="{name:'OrderDetails',params:{'order_id':item.id}}"
                           class="btn-show bg-color font-4 text-white rounded-pill costom-element-left router_link">
                مشاهده جزئیات
              </router-link>
            </div>
          </div>
        </div>
        <EmptyPage v-else></EmptyPage>

        <br>
        <br>
      </div>
    </div>
    <!-- == -->
    <MenuBar></MenuBar>
  </div>

</template>

<script>
import MenuBar from "@/components/common/MenuBar";
import ProgressBar from "@/components/common/ProgressBar";
import {ref} from "vue";
import axios from "axios";
import EmptyPage from "@/components/common/EmptyPage";

export default {
  name: "OrdersAll",
  components: {EmptyPage, ProgressBar, MenuBar},

  setup() {

    var urlPeyk = localStorage.getItem('urlPeyk')
    var apikey = localStorage.getItem('apiKey')
    var user_id = localStorage.getItem('userId')
    var loading = ref(true)

    var update_time = ref()
    var list = ref([])

    axios.post(urlPeyk + 'all_orders', {
      apikey: apikey,
      user_id: user_id
    }).then((response) => {
      var res = response.data
      console.log(res)
      loading.value = false
      update_time.value = res.update_time
      list.value = res.list
    })

    return {loading, update_time, list}
  }
}
</script>

<style scoped>

.holder-element-all-orders {
  width: 100%;
  border: 1px solid rgb(216, 216, 216);
  border-radius: 10px;
  padding: 20px 15px;
  position: relative;
  background-color: white;
}

.img-timer {
  height: 20px;
}


.costom-element-left {
  position: absolute;
  left: 15px !important;
}

.w-text {
  width: 50%;
}

.btn-show {
  border: none;
  padding: 8px 20px;
}


</style>
