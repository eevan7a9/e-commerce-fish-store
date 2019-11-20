<template>
    <b-modal v-model="modalShow" ok-only>
      
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