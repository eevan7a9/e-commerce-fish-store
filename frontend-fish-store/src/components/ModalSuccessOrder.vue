<template>
    <b-modal v-model="modalShow" ok-only>
        <h3 class="alert-heading">Well done!</h3>
        <p>
            {{ message_alert }}
        </p>
        <div class="img-cont d-flex justify-content-right">
            <img src="../assets/img/order_illu.svg" alt="">
        </div>
        <hr>
        <p class="mb-0">
            Please be patient we will email you for more information about your order!!!
        </p>
    </b-modal>
</template>

<script>
export default {
  name: "ModalSuccessOrder",
  data(){
    return {
        message_alert : "Success, your order is being processed...",
        modalShow: false
    }
  },
}  
</script>
<style scoped>
img{
  width:100%;
  height: 100%;
  object-fit: contain;
}
.img-cont{
  width: 100%;
}
</style>