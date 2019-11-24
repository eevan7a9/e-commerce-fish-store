<template>
    <div>
        <h2 class="font-weight-bold text-uppercase text-secondary">Pay with ?</h2>
        <div class="row d-flex justify-content-around">
            <div class="col-md-5">
                <router-link :to="{name:'checkout_stripe'}">
                    <div class="icon-contaier">
                        <img class="stripe" src="../assets/img/stripe.svg" alt="paypal">
                        <StripeCards />
                    </div>
                </router-link>
            </div>
            <div class="col-md-5">
                <router-link :to="{name:'checkout_cash'}">
                    <div class="cash-container text-center d-flex flex-column justify-content-center">
                        <img class="cash" src="../assets/img/cash.png" alt="cash">
                        <h4 class="font-weight-bold text-uppercase">Cash on Delivery</h4>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
    import StripeCards from "./StripeCards.vue";
    export default {
        name: "PayOptions",
        components: {
            StripeCards
        }
    }
</script>
<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Righteous&display=swap');

    a:hover {
        text-decoration: none;
    }

    .icon-contaier {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
    }

    .stripe {
        height: 120px;
        width: 200px;
    }

    .cash-container {
        /*background: red;*/
        color: #3752a4;
        font-family: 'Righteous', cursive;
    }

    .cash {
        height: 150px;
        width: 200px;
        margin: auto;
    }
</style>