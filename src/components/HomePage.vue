<template>

  <ProgressBar v-if="loading"></ProgressBar>
  <ProgressBarMini v-if="loadingmini"></ProgressBarMini>


  <div id="main">
    <div class="position-relative w-100 h-100">

      <div class="map">
        <l-map ref="my_map" style="width: 100%;height: 100%" :zoom="map.zoom" :center="map.center" :maxZoom="17"
               @click="toggleMarker">
          <l-tile-layer :url="map.url" :attribution="map.attribution" :icon="map.icon"></l-tile-layer>
          <l-marker :lat-lng="map.markerLatLng" icon="map.icon"></l-marker>
        </l-map>
      </div>

      <div class="d-flex position-absolute holder-head-map px-2">
        <router-link :to="{name:'ProfilePage'}" class="div-user shadow router_link">
          <img class="img-user" src="../assets/img/user(10).svg" alt="">
        </router-link>
        <router-link :to="{name:'ProfileWallet'}" class="div-price rounded-pill font-color shadow mx-3 router_link">
          <p class="m-0 font-5"> {{ wallet }} </p>
          <img class="svg-arrow-head" src="../assets/img/arrow123.svg" alt="">
        </router-link>
      </div>

      <div id="all_orders" class="holder-messages">
        <div v-for="item in orders" :key="item.id" :id="'order_'+item.id"
             class="holder-element-all-orders shadow-sm my-3">

          <div class="d-flex align-items-start position-absolute" style="left: 10px;top: 10px">
            <div style="margin-left: 10px">
              <div class="d-flex align-items-center" style="height: 40px">
                <img class="img-timer" src="../assets/img/clock(542).svg" alt="">
                <p class="font-color font-5 m-0 mx-2">زمان تحویل سفارش</p>
              </div>
              <p class="font-color m-0"> {{ item.ready_time }} </p>
            </div>
            <img @click="CloseOrder('order_'+item.id,'one')" style="width: 15px;height: 15px"
                 src="../assets/img/multiply-mathematical-sign22.svg" alt="">
          </div>

          <div @click="OrderMap(item.location.lat,item.location.lat)">

            <div class="d-flex align-items-center my-2">
              <p class="font-color font-3  m-0">مجموعه :</p>
              <p class="font-3 m-0 mx-1 w-text text-end">کیترینگ زند</p>
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

      <div class="holder-switch rounded-pill holder-start">
        <div @click="GetPosition()" style="width: 10%">
          <img class="svg-filter" src="../assets/img/myloc.png" alt="">
        </div>
        <div @click="OpenClose">
          <img v-if="is_online" style="width: 90%;height: 100%" src="../assets/img/close_peyk.png" alt="">
          <img v-else style="width: 90%;height: 100%" src="../assets/img/open_peyk.png" alt="">
        </div>
        <div @click="CloseOrder(0,'all')" class="div-messages" style="width: 10%;">
          <img class="svg-alert" src="../assets/img/notification.png" alt="">
          <img v-if="has_new" class="svg-messages" src="../assets/img/Ellipse233.svg" alt="">
        </div>
      </div>

    </div>
    <!-- = -->
    <MenuBar></MenuBar>

  </div>

</template>

<script>
import ProgressBar from "@/components/common/ProgressBar";
import ProgressBarMini from "@/components/common/ProgressBarMini";
import {ref} from "vue";
import MenuBar from "@/components/common/MenuBar";
import {LMap, LMarker, LTileLayer} from "vue3-leaflet";
import {icon} from "leaflet";
import axios from "axios";
import validation from "../assets/js/validation";


export default {
  name: "HomePage",
  components: {MenuBar, ProgressBar,ProgressBarMini, LMap, LTileLayer, LMarker},
  setup() {

    var urlPeyk = localStorage.getItem('urlPeyk')
    var apikey = localStorage.getItem('apiKey')
    var user_id = localStorage.getItem('userId')
    var loading = ref(true)
    var loadingmini = ref(false)

    var my_map = ref(null)
    var map = ref({
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 15,
      flyTo: [],
      center: [32.66569, 51.65846],
      markerLatLng: [32.66569, 51.65846],
      icon: icon({
        iconUrl: "https://picsum.photos/200/300",
        iconSize: [32, 37],
        iconAnchor: [16, 37]
      })
    })
    var is_online = ref()
    var has_new = ref()
    var wallet = ref('')
    var orders = ref([])

    axios.post(urlPeyk + 'get_home', {
      apikey: apikey,
      user_id: user_id
    }).then((response) => {
      var res = response.data
      console.log(res)
      loading.value = false
      loadingmini.value = false
      is_online.value = res.info.is_online
      wallet.value = res.info.wallet
      orders.value = res.info.orders
      has_new.value = res.info.has_new
    })

    function CloseOrder(id, type) {
      if (type == 'one') {
        document.getElementById(id).style.display = 'none'
      } else if (type == 'all') {
        if (document.getElementById('all_orders').style.display == 'none') {
          document.getElementById('all_orders').style.display = 'block'
        } else {
          document.getElementById('all_orders').style.display = 'none'
        }
      }
    }

    function OpenClose() {
      loadingmini.value = true
      axios.post(urlPeyk + 'toggle_online_state', {
        apikey: apikey,
        user_id: user_id
      }).then((response) => {
        var res = response.data
        console.log(res)
        loadingmini.value = false
        is_online.value = res.is_online
      })
    }

    function toggleMarker(e) {
      map.value.markerLatLng = e.latlng
    }

    function OrderMap(lat, lng) {
      map.value.center = [lat, lng]
      map.value.markerLatLng = [lat, lng]
      map.value.zoom = 15
      my_map.value.flyTo([lat, lng])
    }

    function GetPosition() {

      // const successCallback = (position) => {
      //   console.log(position);
      // };
      // const errorCallback = (error) => {
      //   console.log(error);
      // };
      // navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          console.log(pos)
          // map.value.center = [pos.coords.latitude, pos.coords.longitude]
          map.value.center[0] = pos.coords.latitude
          map.value.center[1] = pos.coords.longitude
          // map.value.markerLatLng = [pos.coords.latitude, pos.coords.longitude]
          map.value.markerLatLng[0] = pos.coords.latitude
          map.value.markerLatLng[1] = pos.coords.longitude
          map.value.zoom = 15
          my_map.value.flyTo([pos.coords.latitude, pos.coords.longitude])
        });
      } else {
        validation('خطا در پیدا کردن موقعیت فعلی شما پیش آمده')
      }
    }

    GetPosition()


    // setInterval(()=>{
    //   axios.post(urlPeyk + 'update_location', {
    //     apikey: apikey,
    //     user_id: user_id,
    //     lat:map.value.markerLatLng[0],
    //     lng:map.value.markerLatLng[1],
    //   }).then((response) => {
    //     var res = response.data
    //     loadingmini.value = false
    //     is_online.value = res.is_online
    //   })
    // },5000)

    return {
      loading,
      loadingmini,
      is_online,
      wallet,
      map,
      my_map,
      has_new,
      orders,
      OpenClose,
      toggleMarker,
      CloseOrder,
      OrderMap,
      GetPosition
    }
  }
}
</script>

<style scoped>

.map {
  position: fixed;
  bottom: 0;
  top: 0;
  width: 100%;
  max-width: 500px;
  height: 100%;
}

.holder-head-map {
  top: 30px;
}

.div-user {
  width: 55px;
  height: 55px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
}

.img-user {
  height: 25px;
}

.div-price {
  width: 200px;
  height: 55px;
  background-color: white;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.svg-arrow-head {
  height: 15px;
}

.img-nav {
  height: 25px;
  display: block;
  margin: 0 auto;
}

.holder-start {
  width: 90%;
  height: 70px;
  position: fixed;
  right: 10px;
  bottom: 85px;
  max-width: 400px;
  /*right: 35%;*/
  /*transform: translate(50%, 0);*/
  display: flex;
  align-items: center;
  justify-content: space-around;
}


.holder-filter {
  direction: ltr;
  position: fixed;
  width: 10vw;
  max-width: 500px;
  bottom: 80px;
  left: 20px;
}

.svg-filter {
  height: 50px;
  cursor: pointer;
}

.svg-alert {
  height: 60px;
  cursor: pointer;
}

.div-messages {
  position: relative;
  bottom: 0;
  left: 0;

}

.svg-messages {
  height: 18px;
  position: absolute;
  top: 0;
  right: 5px;
}

.icon-driver {
  height: 50px;
  position: absolute;
}

.holder-element-all-orders {
  width: 100%;
  border: 1px solid rgb(216, 216, 216);
  border-radius: 10px;
  padding: 20px 15px;
  position: relative;
  background-color: white;
}

.svg-close {
  height: 20px;
  margin: 0 20px 0 0;
  position: absolute;
  top: 5px;
  left: 5px;
}

.img-timer {
  height: 20px;
}

.style-time {
  position: absolute;
  left: 35px;
  top: 55px;
  font-size: 25px;
}

.w-text {
  width: 50%;
}

.btn-show {
  border: none;
  padding: 8px 20px;
}

.holder-messages {
  position: fixed;
  top: 100px;
  width: 100%;
  max-width: 500px;
  padding: 0 15px;
  max-height: 500px;
  overflow: scroll;
}

.holder-messages {
  -ms-overflow-style: none;
  /* Internet Explorer 10+ */
  scrollbar-width: none;
  /* Firefox */
}

.holder-messages::-webkit-scrollbar {
  display: none;
  /* Safari and Chrome */
}


</style>
