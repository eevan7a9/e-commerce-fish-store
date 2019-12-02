<template>
    <div class="container d-flex justify-content-center">
        <div class="col-8 card mt-5">
            <h3 class="violet font-weight-bolder text-center my-3">Well done!</h3>
            <p>
                {{ message_alert }}
            </p>
            <hr>
            <div class="img-cont d-flex justify-content-right">
                <img src="../assets/img/order_illu.svg" class="img-fluid" alt="success">
            </div>
            <hr>
            <p class="mb-0 my-2">
                Please be patient we will email you for more information about your order!!!
            </p>
            <div class="d-flex justify-content-between py-3">
                <router-link :to="{name:'home'}" class="btn btn-secondary font-weight-bold text-light">
                    Go Back
                </router-link>
                  <a :href="receipt_url" target="_blank" class="btn btn-info font-weight-bold text-light" 
                  v-if="receipt_url">
                    View Receipt
                </a>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
    export default {
        name: "checkoutSuccess",
        props: {
            receipt_url: String
        },
        data() {
            return {
                message_alert: "Success, your order is being processed...",
            }
        },
        computed: mapGetters(["orderSuccess"]),
        methods: {
            ...mapActions(["removeOrderSuccess"])
        },
        created(){
            if (!this.orderSuccess) {
                this.$router.push({name:"home"});
            }
        },
        destroyed(){
            this.removeOrderSuccess();
        }
    }
</script>
<style scoped>
</style>