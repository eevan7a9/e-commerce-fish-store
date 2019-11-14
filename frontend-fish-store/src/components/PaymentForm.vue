<template>
    <div>
        <hr>
        <h4>Billing Details :</h4>
        <div class="form-row">
            <div class="form-group col-sm-5">
                <label>Name</label>
                <input type="text" v-model="billing.name" class="form-control">
            </div>
            <div class="form-group col-sm-5">
                <label>Email</label>
                <input type="text" v-model="billing.email" class="form-control">
            </div>
            <div class="form-group col-sm-5">
                <label>Address</label>
                <input type="text" v-model="billing.address" class="form-control">
            </div>
            <div class="form-group col-sm-5">
                <label>Phone</label>
                <input type="text" v-model="billing.phone" class="form-control">
            </div>
            <div class="form-group col-sm-5">
                <label>City</label>
                <input type="text" v-model="billing.city" class="form-control">
            </div>
            <div class="form-group col-sm-5">
                <label>Province</label>
                <input type="text" v-model="billing.province" class="form-control">
            </div>
        </div>
        <hr>
        <h4>Payment Details :</h4>
        <div ref="card" class="p-3 mb-2 border rounded"></div>
        <button v-on:click="purchase" class="btn btn-success form-control font-weight-bold text-uppercase">Purchase</button>
    </div>
</template>
<script id="stripe-js" src="https://js.stripe.com/v3/" async></script>
<script>
    let stripe = Stripe(`pk_test_7nkOweBBNAxRdKMS2449Desn00zmvCOyAJ`),
        // elements = stripe.elements(),
        card = undefined;
    export default {
        data() {
            return {
                billing: {
                    name: "",
                    email: "",
                    address: "",
                    phone: "0",
                    city: "",
                    province: ""
                },
                card: null,
                elements: null
            }
        },
        mounted: function() {
            this.elements = stripe.elements(),
                card = this.elements.create('card');
            card.mount(this.$refs.card);
        },
        methods: {
            purchase: function() {
                let self = this;
                stripe.createToken(card).then(function(result) {
                    if (result.error) {
                        self.hasCardErrors = true;
                        self.$forceUpdate(); // Forcing the DOM to update so the Stripe Element can update.
                        return;
                    }
                    console.log(result);
                });
            }
        }
    };
</script>
<style scoped>
</style>