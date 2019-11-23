<template>
    <div class="d-flex align-items-center">
        <img src="../assets/img/visa.png" alt="visa">
        <img src="../assets/img/discover.png" alt="discover">
        <img src="../assets/img/american_express.png" alt="american express">
        <img src="../assets/img/master_card.png" alt="master card">
        <img src="../assets/img/jcb.png" alt="JCB">
    </div>
</template>
<script>
    export default {
        name: "StripeCards"
    }
</script>
<style scoped>
    img {
        height: 35px;
        width: 55px;
        margin-left: 5px;
    }
</style>