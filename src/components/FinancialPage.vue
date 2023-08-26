<template>

  <ProgressBar v-if="loading"></ProgressBar>

  <div id="main">
    <div class="d-flex div-top-arrow test">
      <p class="text-title font-title m-0">گزارش تسویه حساب</p>
      <img onclick="history.back()" class="svg-arrow" src="../assets/img/arrow.svg" alt="">
    </div>
    <!-- == -->
    <div class="my-6 py-3">
      <div class="main-body">
        <div v-if="list.length > 0">
          <div v-for="item in list" :key="item.id" class="border-color holder-transaction my-2">
            <div class="d-flex position-relative font-5 align-items-center">
              <img class="add-green" src="../assets/img/plus(3).svg" alt="">
              <p class="font-6 m-0 mx-2 font-color-cygn-2">
                {{ item.amount }}
              </p>
              <div class="d-flex costom-element-left">
                <p class="m-0 mx-3"> {{ item.date_info.date }} </p>
                <p class="m-0"> {{ item.date_info.time }} </p>
              </div>
            </div>
            <hr class="m-0 my-3 ">
            <p class="font-5 m-0 text-end"> {{ item.description }} </p>
          </div>
        </div>
        <EmptyPage v-else></EmptyPage>


      </div>
    </div>

    <MenuBar></MenuBar>

  </div>

</template>

<script>
import ProgressBar from "@/components/common/ProgressBar";
import MenuBar from "@/components/common/MenuBar";
import {ref} from "vue";
import axios from "axios";

export default {
  name: "FinancialPage",
  components: {ProgressBar, MenuBar},

  setup() {

    var urlPeyk = localStorage.getItem('urlPeyk')
    var apikey = localStorage.getItem('apiKey')
    var user_id = localStorage.getItem('userId')
    var loading = ref(false)

    var list = ref([])

    axios.post(urlPeyk + 'checkout_report', {
      apikey: apikey,
      user_id: user_id
    }).then((response) => {
      var res = response.data
      console.log(res)
      list.value = res.list
    })


    return {loading, list}
  }
}
</script>

<style scoped>

.holder-transaction {
  background-color: white;
  border-radius: 10px;
  width: 100%;
  padding: 15px;
}

.add-green {
  height: 25px;
}
</style>
