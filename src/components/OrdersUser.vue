<template>
  <ProgressBar v-if="loading"></ProgressBar>
  <ProgressBarMini v-if="loadingmini"></ProgressBarMini>

  <div id="blackwallet" @click="toggle_dialog" class="blackback"></div>

  <div id="main">

    <div class="d-flex div-top-arrow test">
      <p class="text-title font-title m-0">سفارشات من</p>
      <img onclick="history.back()" class="svg-arrow" src="../assets/img/arrow.svg" alt="">
    </div>
    <!-- ==== -->
    <div class="main-body">
      <div class="my-6">
        <!-- = -->
        <div class="holder-header mt-5 shadow-sm bg-white d-flex align-items-center justify-content-center">
          <div @click="ChangeAction('current')" :class="{'selection-header':action == 'current'}"
               class="holder-section d-flex align-items-center justify-content-center">
            <p class="m-0 ">سفارشات جاری</p>
          </div>
          <img class="svg-line" src="../assets/img/Line-38545.svg" alt="">
          <div @click="ChangeAction('done')" :class="{'selection-header':action == 'done'}"
               class="holder-section d-flex align-items-center justify-content-center">
            <p class="m-0 text-nowrap">سفارشات انجام شده</p>
          </div>
        </div>
        <br>
        <div v-if="list.length>0">
          <div v-for="item in list" :key="item.id" :id="'order'+item.id"
               class="holder-indo-order shadow-sm bg-white">
            <div @click="SelectOrder(item.id)">
              <div class="d-flex align-items-center justify-content-center">
                <img class="img-profile" :src="urlFile+item.user_info.pic" alt="">
                <div class="font-4 mx-3">
                  <div class="d-flex my-2">
                    <p class="m-0 font-color">نام کاربر</p>
                    <p class="m-0 mx-3"> {{ item.user_info.full_name }} </p>
                  </div>
                  <div class="d-flex align-items-center my-2">
                    <p style="white-space: nowrap;" class="m-0 font-color">شماره تماس</p>
                    <p class="m-0 font-5 mx-3"> {{ item.user_info.phone1 }} </p>
                    <p class="m-0  font-5"> {{ item.user_info.phone2 }} </p>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="action == 'current'">
              <button v-if="item.order_info.status.position == 8" @click="toggle_dialog(item.id)"
                      class="btn btn-outline-info my-2" style="z-index: 5;font-size: 12px"> تحویل و پایان سفارش
              </button>

              <button v-else-if="item.order_info.status.position == 7" @click="OrderRun(item.id)"
                      class="btn btn-outline-primary my-2"
                      style="z-index: 5;font-size: 12px"> حرکت برای تحویل سفارش
              </button>
            </div>

            <hr class="hr-sm">
            <div class="d-flex font-3">
              <p class="font-color m-0">مجموعه :</p>
              <p class="m-0 mx-1"> {{ item.unit_info.title }} </p>
            </div>
            <hr class="hr-sm">
            <!-- = -->
            <div class="d-flex justify-content-between font-6">
              <p class="m-0">تاریخ سفارش</p>
              <div class="d-flex">
                <p class="m-0"> {{ item.order_info.date_info.week_day }} </p>
                <p class="m-0 mx-2"> {{ item.order_info.date_info.date }} </p>
                <p class="m-0"> {{ item.order_info.date_info.time }} </p>
              </div>
            </div>
            <hr class="hr-sm">
            <div class="d-flex justify-content-between font-6">
              <p class="m-0">تعداد اقلام</p>
              <div class="d-flex">
                <p class="m-0 mx-2"> {{ item.order_info.products.length }} </p>
                <p class="m-0">مورد</p>
              </div>
            </div>
            <hr class="hr-sm">
            <!-- = -->
            <div class="d-flex justify-content-center align-items-center mt-4">
              <div class="section-element-1">
                <p class="font-5 m-0 text-center">نام کالا</p>
              </div>
              <img class="svg-line" src="../assets/img/Line-38545.svg" alt="">
              <div class="section-element">
                <p class="font-5 m-0 text-center">تعداد</p>
              </div>
              <img class="svg-line" src="../assets/img/Line-38545.svg" alt="">
              <div class="section-element">
                <p class="font-5 m-0 text-center">مبلغ</p>
              </div>
            </div>
            <hr class="hr-order-1 bg-color">

            <div v-for="items in item.order_info.products" :key="items.id">
              <div class="d-flex justify-content-center align-items-center ">
                <div class="section-element-1 d-flex align-items-center">
                  <img class="img-food-order" :src="urlFile+items.pic" alt="">
                  <p class="font-5 m-0 text-center mx-2"> {{ items.title }} </p>
                </div>
                <img class="svg-line" src="../assets/img/Line-38545.svg" alt="">
                <div class="section-element">
                  <p class="font-5 m-0 text-center"> {{ items.count }} </p>
                </div>
                <img class="svg-line" src="../assets/img/Line-38545.svg" alt="">
                <div class="section-element">
                  <p class="font-5 m-0 text-center">
                    {{ String(items.price).replace(/(.)(?=(\d{3})+$)/g, '$1,') }}
                  </p>
                </div>
              </div>
              <hr class="hr-order-1 bg-color">
            </div>
            <!-- = -->
            <div class="d-flex justify-content-between font-6">
              <p class="m-0">مبلغ کل سفارش</p>
              <div class="d-flex">
                <p class="m-0 mx-2">
                  {{ String(item.order_info.factor.whole_price).replace(/(.)(?=(\d{3})+$)/g, '$1,') }}
                </p>
              </div>
            </div>
            <hr class="hr-sm">
            <div class="d-flex align-items-center">
              <div style="display:flex;align-items: center;width: 50px">
                <p class="font-6 m-0">مبدا</p>
                <img class="svg-loc mx-1" src="../assets/img/location(3).svg" alt="">
              </div>
              <p class="m-0 font-5 text-end"> {{ item.unit_info.post_address }} </p>
            </div>
            <hr class="hr-sm">
            <div class="d-flex align-items-center">
              <div style="display:flex;align-items: center;width: 50px">
                <p class="font-6 m-0">مقصد</p>
                <img class="svg-loc mx-1" src="../assets/img/location(3).svg" alt="">
              </div>
              <p class="m-0 font-5 text-end"> {{ item.address_info.post_address }} </p>
            </div>
            <hr class="hr-sm">
            <div class="d-flex justify-content-between">
              <p class="font-5 m-0">هزینه پیک</p>
              <p class="m-0 font-6">
                {{ String(item.order_info.factor.payk_price).replace(/(.)(?=(\d{3})+$)/g, '$1,') }}
              </p>
            </div>
            <hr class="hr-sm">
            <div class="d-flex justify-content-between">
              <p class="font-5 m-0">اصلاحیه فاکتور</p>
              <p class="m-0 font-6">
                {{ String(item.order_info.factor.factor_alteration).replace(/(.)(?=(\d{3})+$)/g, '$1,') }}
              </p>
            </div>
            <hr class="hr-sm">
            <div class="d-flex justify-content-between">
              <p class="font-5 m-0">خسارت پیک</p>
              <p class="m-0 font-6">
                {{ String(item.order_info.factor.payk_damage).replace(/(.)(?=(\d{3})+$)/g, '$1,') }}
              </p>
            </div>
            <hr class="hr-sm">
            <div class="d-flex justify-content-between">
              <p class="font-5 m-0">نحوه پرداخت</p>
              <p class="m-0 font-6"> {{ item.order_info.pay_method }} </p>
            </div>
            <hr class="hr-sm">
            <div class="d-flex justify-content-between">
              <p class="font-5 m-0">شماره پیگیری پرداخت</p>
              <p class="m-0 font-6"> {{ item.order_info.pay_ref_code }} </p>
            </div>
            <br>
            <br>
          </div>
        </div>
        <EmptyPage v-else></EmptyPage>
        <br>
        <br>
      </div>
    </div>

    <!-- =====dialog===== -->
    <div class="dialog_custom shadow-costom" id="custom_dialog">
      <div class="main-dialog">
        <p class="font-4 text-center mt-4">نحوه پرداخت را مشخص کنید</p>
        <button @click="pay_type = 'credit'" class="btn-payment my-2 shadow-sm font-5"
                :style="pay_type == 'credit'?'background-color:#02DCCC;color:white':''">
          کارت خوان
        </button>
        <button @click="pay_type = 'cash'" class="btn-payment my-2 shadow-sm font-5"
                :style="pay_type == 'cash'?'background-color:#02DCCC;color:white':''">
          وجه نقدی
        </button>
        <input v-model="ref_code_credit" class="input-payment font-5" type="text"
               placeholder="شماره پیگیری کارت خوان را وارد کنید">
        <button @click="OrderFinish()" class="submit-dialog rounded-pill font-4 my-3">ثبت</button>
      </div>
    </div>
    <!-- == -->

    <MenuBar></MenuBar>
  </div>

</template>

<script>
import ProgressBar from "@/components/common/ProgressBar";
import ProgressBarMini from "@/components/common/ProgressBarMini";
import MenuBar from "@/components/common/MenuBar";
import EmptyPage from "@/components/common/EmptyPage";
import {ref} from "vue";
import axios from "axios";
import validation from "@/assets/js/validation";
import done from "@/assets/js/done";


export default {
  name: "OrdersUser",
  components: {ProgressBar, ProgressBarMini, MenuBar,EmptyPage},

  setup() {

    var urlPeyk = localStorage.getItem('urlPeyk')
    var urlFile = localStorage.getItem('urlFile')
    var apikey = localStorage.getItem('apiKey')
    var user_id = localStorage.getItem('userId')
    var loading = ref(true)
    var loadingmini = ref(false)

    var action = ref('current')
    var list = ref([])
    var order_id = ref('')
    var pay_type = ref('')
    var ref_code_credit = ref('')

    function GetOrders() {
      axios.post(urlPeyk + 'get_payk_orders', {
        apikey: apikey,
        user_id: user_id,
        action: action.value,
        page: 0
      }).then((response) => {
        loading.value = false
        loadingmini.value = false
        var res = response.data
        console.log(res)
        list.value = res.list
      })
    }

    GetOrders()

    function ChangeAction(type) {
      loadingmini.value = true
      action.value = type
      GetOrders()
      console.log(action)
    }

    function SelectOrder(id) {
      var order_tag = document.getElementById('order' + id)
      if (order_tag.style.height > '150px') {
        order_tag.style.height = '150px'
      } else {
        order_tag.style.height = 'auto'
      }
    }

    function toggle_dialog(id) {
      var blackwallet = document.getElementById("blackwallet");
      var dialog = document.getElementById("custom_dialog");
      if (dialog.style.height == "320px") {
        dialog.style.height = "0px"
        blackwallet.style.display = 'none'
        order_id.value = ''
        pay_type.value = ''
      } else {
        dialog.style.height = "320px"
        blackwallet.style.display = 'block'
        order_id.value = id
      }
    }

    function OrderFinish() {

      if (pay_type.value == '') {
        validation('نحوه پرداخت را مشخص کنید')
        return false
      }
      if (pay_type.value == 'credit') {
        if (ref_code_credit.value == '') {
          validation('شماره پیگیری کارت خوان را وارد کنید')
          return false
        }
      }

      loadingmini.value = true
      axios.post(urlPeyk + 'order_action', {
        apikey: apikey,
        user_id: user_id,
        action: 'finish',
        order_id: order_id.value,
        pay_type: pay_type.value,
        pay_ref_code: ref_code_credit.value
      }).then((response) => {
        loadingmini.value = false
        var res = response.data
        console.log(res)
        if (res.status == 'ok') {
          done('پایان سفارش ثبت شد', 'OrdersUser')
        }
      })
    }

    function OrderRun(id) {
      loading.value = true
      axios.post(urlPeyk + 'order_action', {
        apikey: apikey,
        user_id: user_id,
        action: 'start_delivery',
        order_id: id
      }).then((response) => {
        loading.value = false
        var res = response.data
        console.log(res)
        if (res.status == 'ok') {
          done('حرکت پیک آغاز شد')
        }
      })
    }

    return {
      loading,
      loadingmini,
      action,
      list,
      urlFile,
      pay_type,
      ref_code_credit,
      ChangeAction,
      SelectOrder,
      toggle_dialog,
      OrderRun,
      OrderFinish
    }
  }
}
</script>

<style scoped>

@media screen and (max-width: 400px) {
  .holder-header {
    font-size: 12px !important;
  }
}

.holder-header {
  width: 100%;
  height: 60px;
  font-size: 14px;
  border-radius: 10px;
}

.holder-section {
  width: 50%;
  height: 100%;
}

.svg-line {
  height: 50px;
}

.selection-header {
  height: 100%;
  border-bottom: 5px solid #02DCCC;
  color: #02DCCC;
  display: flex;
  align-items: center;
}

.holder-indo-order {
  border-radius: 10px;
  padding: 10px 20px;
  height: 150px;
  overflow: hidden;
  transition: 0.5s height;
  margin-bottom: 40px;
}

.img-profile {
  height: 70px;
  width: 70px;
  border-radius: 50%;
}

.section-element-1 {
  width: 40%;
}

.section-element {
  width: 30%;
}

.img-food-order {
  border-radius: 8px;
  width: 50px;
  height: 50px;
}

.svg-line {
  height: 50px;
}

.hr-order-1 {
  width: 100%;
  margin: 10px 0 !important;
}

.hr-sm {
  background-color: rgb(199, 199, 199);
  height: 0.5px !important;
}

.svg-loc {
  height: 20px;
}

.btn-accept {
  width: 60%;
  padding: 15px 0;
  background-color: #ff1100;
  border: none;
  display: block;
  margin: 0 auto;
}

.btn-purple {
  width: 60%;
  padding: 15px 0;
  background-color: #cb0ccb;
  border: none;
  display: block;
  margin: 0 auto;
}

/* =======dialog======== */

.dialog_custom {
  width: 350px;
  height: 0;
  background-color: rgb(253, 253, 253);
  border-radius: 20px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  overflow: hidden;
  transition: 0.5s;
  display: grid;
}

.btn-payment {
  border-radius: 10px;
  width: 75%;
  padding: 18px;
  border: none;
  background-color: white;
  display: block;
  margin: 0 auto;
}

.select-style {
  color: white;
  background-color: #02DCCC;
}

.main-dialog {
  background-color: rgb(239, 247, 247);
}

.input-payment {
  border: none;
  outline: none;
  background-color: white;
  border-radius: 10px;
  width: 75%;
  display: block;
  margin: 0 auto;
  text-align: center;
  height: 50px;
  padding: 5px;
}

.submit-dialog {
  width: 60%;
  padding: 15PX;
  background-color: #1CCF98;
  color: white;
  display: block;
  margin: 0 auto;
  border: none;
}
</style>
