<template>
    <div class="container d-flex justify-content-center">
        <div class="col-8 card mt-5">
            <h3 class="violet font-weight-bolder text-center my-3">Well done!</h3>
            <p>
                {{ message_alert }}
            </p>
            <hr>
            <div class="img-cont d-flex justify-content-right">
                <img src="../assets/img/order_illu.svg" alt="">
            </div>
            <hr>
            <p class="mb-0 my-2">
                Please be patient we will email you for more information about your order!!!
            </p>
            <div class="d-flex justify-content-center py-3">
                <router-link :to="{name:'home'}" class="btn-custom-violet py-3 px-5">
                    OK
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "checkoutSuccess",
        data() {
            return {
                message_alert: "Success, your order is being processed...",
            }
        }
    }
</script>
<style scoped>
</style>