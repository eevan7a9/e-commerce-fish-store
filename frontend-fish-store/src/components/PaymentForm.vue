<template>
    <div>
        <hr>
        <h4>Billing Details :</h4>
        <div class="form-row">
            <div class="form-group col-sm-6">
                <label class="text-capitalize">Name</label>
                <input type="text" v-model="billing.name" class="form-control">
            </div>
            <div class="form-group col-sm-6">
                <label class="text-capitalize">Email</label>
                <input type="email" v-model="billing.email" class="form-control">
            </div>
            <div class="form-group col-sm-6">
                <label class="text-capitalize">Address</label>
                <input type="text" v-model="billing.address" class="form-control">
            </div>
            <div class="form-group col-sm-6">
                <label class="text-capitalize">Phone</label>
                <input type="text" v-model="billing.phone" class="form-control">
            </div>
            <div class="form-group col-sm-4">
                <label class="text-capitalize">City</label>
                <input type="text" v-model="billing.city" class="form-control">
            </div>
            <div class="form-group col-sm-4">
                <label class="text-capitalize">Province</label>
                <input type="text" v-model="billing.province" class="form-control">
            </div>
            <div class="form-group col-sm-4">
                <label for="sel1">Country (select one):</label>
                <select class="form-control" id="sel1" v-model="billing.country">
                    <option value="us">US</option>
                    <option value="jp">JP</option>
                    <option value="ph">PH</option>
                    <option value="au">AU</option>
                </select>
            </div>
            <div class="form-group col-sm-4">
                <label class="text-capitalize">postal code</label>
                <input type="number" v-model="billing.postal_code" class="form-control">
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
    import axios from "axios";
    export default {
        props: {
            items: Array
        },
        data() {
            return {
                billing: {
                    name: "",
                    email: "",
                    address: "",
                    phone: "0",
                    city: "",
                    province: "",
                    country: "",
                    postal_code: 0,
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
                const items = this.items;
                const billing_details = this.billing;

                let self = this;
                const additional_data = {
                    name: billing_details.name,
                    address_line1: billing_details.address,
                    address_city: billing_details.city,
                    address_state: billing_details.province,
                    address_zip: billing_details.zip,
                    address_country: billing_details.country,
                    currency: "usd",
                }
                stripe.createToken(card, additional_data).then(function(result) {
                    if (result.error) {
                        self.hasCardErrors = true;
                        self.$forceUpdate(); // Forcing the DOM to update so the Stripe Element can update.
                        return;
                    }
                    // console.log(JSON.stringify(result));
                    axios.post('/order', {
                        token: result.token.id,
                        items: items,
                        email: billing_details.email,
                        phone: billing_details.phone,

                        address: result.token.card.address_line1,
                        country: result.token.card.address_country,
                        city: result.token.card.address_city,
                        state: result.token.card.address_state,
                        postal_code: result.token.card.address_zip,

                        last4: result.token.card.last4,
                        payment_method: result.token.type

                    }).then((res) => {

                        console.log(res);

                    }).catch(err => {
                        console.log('error', err.response);
                    })
                });
            }
        }
    };
</script>
<style scoped>
</style>