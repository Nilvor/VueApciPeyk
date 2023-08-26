<template>

  <div class="d-flex div-top-arrow test">
    <p class="text-title font-title m-0">مدریت پیشنهاد های شگفت انگیز</p>
    <Router-link :to="{name:'HomePage'}">
      <img class="svg-arrow" src="../../assets/img/arrow.svg" alt="">
    </Router-link>
  </div>
  <!-- = -->
  <div class="main-body" style="padding-top: 40px">

    <div class="holder-header border-color  mt-5 d-flex align-items-center justify-content-center">

      <RouterLink :to="{name:'AmazingOffer',params:{product_id:product_id}}"
                  class="holder-section d-flex align-items-center justify-content-center router_link"
                  :class="{'router-link-active_custom' : page_mode == 'offer' }">
        <p class="m-0 text-nowrap">پیشنهاد شگفت انگیز</p>
      </RouterLink>

      <img class="svg-line" src="../../assets/img/Line-38545.svg" alt="">
      <RouterLink :to="{name:'AmazingOfferWaiting'}"
                  class="holder-section d-flex align-items-center justify-content-center router_link"
                  :class="{'router-link-active_custom' : page_mode == 'waiting' }">
        <p class="m-0 text-nowrap ">محصولات در انتظار</p>
      </RouterLink>

      <img class="svg-line" src="../../assets/img/Line-38545.svg" alt="">
      <RouterLink :to="{name:'AmazingOfferRunning'}"
                  class="holder-section d-flex align-items-center justify-content-center router_link"
                  :class="{'router-link-active_custom' : page_mode == 'running' }">
        <p class="m-0 text-nowrap">محصولات در حال اجرا</p>
      </RouterLink>

    </div>

  </div>

</template>

<script>


import {ref} from "vue";

export default {
  name: "AmazingHeader",
  props: ['page_type'],

  setup(props) {

    var page_mode = ref(props.page_type)
    var product_id = localStorage.getItem('amazing_id')

    if (product_id == null){
      product_id = 0
    }

    return {page_mode,product_id}
  }
}
</script>

<style scoped>

@media screen and (max-width: 400px) {
  .holder-header {
    font-size: 12px !important;
  }
}

.router-link-active_custom {
  height: 100%;
  border-bottom: 5px solid #02DCCC;
  color: #02DCCC;
  display: flex;
  align-items: center;
}

.holder-header {
  width: 100%;
  height: 60px;
  font-size: 14px;
  border-radius: 10px;
  background-color: white;
}

.holder-section {
  width: 30%;
  height: 100%;
}

.svg-line {
  margin: 0 3px;
  height: 40px;
}

</style>
