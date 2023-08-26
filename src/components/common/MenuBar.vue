<template>

  <div class="holder-nav d-flex rounded-pill justify-content-evenly">

    <router-link :to="{name:'HomePage'}" class="router_link">
      <img class="img-nav my-1" src="../../assets/img/map(3).png" alt="" style="padding: 7px 15px"
           :class="{'router-link-active_custom' : routeName == 'HomePage' }">
      <p :style="routeName == 'HomePage'?'color:#02DCCC':''" class="m-0 font-6 mt-1">خانه</p>
    </router-link>

    <router-link :to="{name:'OrdersUser'}" class="router_link">
      <img class="img-nav my-1" src="../../assets/img/fast-delivery-_1_.png" alt="" style="padding: 7px 15px"
           :class="{'router-link-active_custom' : routeName == 'OrdersUser' }">
      <p :style="routeName == 'OrdersUser'?'color:#02DCCC':''" class="m-0 font-6 mt-1">سفارشات من</p>
    </router-link>

    <router-link :to="{name:'OrdersAll'}" class="router_link">
      <img class="img-nav my-1" src="../../assets/img/edit(2).png" alt="" style="padding: 7px 15px"
           :class="{'router-link-active_custom' : routeName == 'OrdersAll' }">
      <p :style="routeName == 'OrdersAll'?'color:#02DCCC':''" class="m-0 font-6 mt-1">سفارشات</p>
    </router-link>

    <router-link :to="{name:'FinancialPage'}" class="router_link">
      <img class="img-nav my-1" src="../../assets/img/deposit.png" alt="" style="padding: 7px 15px"
           :class="{'router-link-active_custom' : routeName == 'FinancialPage' }">
      <p :style="routeName == 'FinancialPage'?'color:#02DCCC':''" class="m-0 font-6 mt-1">گزارشات واریزی ها</p>
    </router-link>


  </div>

</template>

<script>
import {useRoute} from "vue-router";

export default {
  name: "MenuBar",
  setup() {

    var routeName = useRoute().name
    console.log(routeName)

    return {routeName}
  }
}
</script>

<style scoped>

.holder-nav {
  width: 100vw;
  max-width: 500px;
  height: 60px !important;
  position: fixed;
  bottom: 20px;
  padding: 5px;
  background-color: rgb(239, 247, 247);
  align-items: center;
  box-shadow: 0 0 10px rgb(104 103 103);
  z-index: 101;
  display: flex;
  align-items: center;
}

.img-nav {
  height: 35px;
  width: 50px;
  display: block;
  padding: 5px 10px;
  margin: 0 auto;
}

.router-link-active_custom {

  /*border-bottom: 5px solid #02DCCC;*/
  background-color: #02DCCC;
  /*display: flex;*/
  /*align-items: center;*/
  border-radius: 10px;
}

</style>


