<template>
  <div class="pos-icon-chat">
    <img class="icon-chat" src="../../assets/img/empty.svg" alt="">
    <p class="font-6 my-3 text-nowrap">موردی یافت نشد ..!</p>
  </div>
</template>

<script>
export default {
  name: "EmptyPage"
}
</script>

<style scoped>

.pos-icon-chat {
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%);
  /* width: 120px; */
  text-align: center;
}

.icon-chat {
  height: 70px;
  margin: 0 auto;
}

</style>
