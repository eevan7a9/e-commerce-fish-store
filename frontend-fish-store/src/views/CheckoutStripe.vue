<template>
    <div class="container pt-3 pb-5">
        <div class="ml-auto mr-auto col-md-8">
            <div class="card">
                <div class="card-header">
                    <router-link :to="{ name: 'checkout' }" class="violet d-flex align-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="11 17 6 12 11 7" />
                            <polyline points="18 17 13 12 18 7" />
                        </svg>
                        <span class="font-weight-bold violet text-uppercase">Back</span>
                    </router-link>
                </div>
                <div class="card-body">
                    <hr />
                    <h4 class="mb-4">Billing Details :</h4>
                    <div class="form-row">
                        <div class="form-group col-sm-6">
                            <label class="text-capitalize">Name</label>
                            <input @input="validation" type="text" v-model="billing.name" class="form-control" required />
                            <p class="text-danger" v-if="error.name">Required</p>
                        </div>
                        <div class="form-group col-sm-6">
                            <label class="text-capitalize">Email</label>
                            <input @input="validation" type="email" v-model="billing.email" class="form-control" required />
                            <p class="text-danger" v-if="error.email">Required</p>
                        </div>
                        <div class="form-group col-sm-6">
                            <label class="text-capitalize">Address</label>
                            <input @input="validation" type="text" v-model="billing.address" class="form-control" required />
                            <p class="text-danger" v-if="error.address">Required</p>
                        </div>
                        <div class="form-group col-sm-6">
                            <label class="text-capitalize">Phone</label>
                            <input @input="validation" type="text" v-model="billing.phone" class="form-control" required />
                            <p class="text-danger" v-if="error.phone">Required</p>
                        </div>
                        <div class="form-group col-sm-4">
                            <label class="text-capitalize">City</label>
                            <input @input="validation" type="text" v-model="billing.city" class="form-control" required />
                            <p class="text-danger" v-if="error.city">Required</p>
                        </div>
                        <div class="form-group col-sm-4">
                            <label class="text-capitalize">Province</label>
                            <input @input="validation" type="text" v-model="billing.province" class="form-control" required />
                            <p class="text-danger" v-if="error.province">Required</p>
                        </div>
                        <div class="form-group col-sm-4">
                            <label for="sel1">Country (select one):</label>
                            <select class="form-control" id="sel1" v-model="billing.country" required>
                                <option value="us">US</option>
                                <option value="jp">JP</option>
                                <option value="ph">PH</option>
                                <option value="au">AU</option>
                            </select>
                            <p class="text-danger" v-if="error.country">Required</p>
                        </div>
                        <div class="form-group col-sm-4">
                            <label class="text-capitalize">postal code</label>
                            <input @input="validation" type="text" v-model="billing.postal_code" class="form-control" required />
                            <p class="text-danger" v-if="error.postal_code">Required</p>
                        </div>
                    </div>
                    <hr />
                    <h4>Payment Details :</h4>
                    <StripeCards class="mb-2" />
                    <div ref="card" class="p-3 mb-2 border rounded"></div>
                    <small v-b-toggle.collapse-1 class="text-info font-weight-bold" style="cursor:pointer;">DEMO CARD: click me!</small>
                    <b-collapse id="collapse-1" class="mt-2">
                        <div class="bg-light text-secondary d-flex justify-content-between">
                            <span>CARD: 4242 4242 4242 4242</span>
                            <span>04 / 24 [any] [any]</span>
                        </div>
                    </b-collapse>
                    <button v-on:click="purchase" class="btn btn-success form-control font-weight-bold text-uppercase mt-3">Purchase</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script id="stripe-js" src="https://js.stripe.com/v3/" async></script>
<script>
    let stripe = Stripe(`pk_test_7nkOweBBNAxRdKMS2449Desn00zmvCOyAJ`),
        // elements = stripe.elements(),
        card = undefined;
    import axios from "axios";
    import {
        mapGetters,
        mapActions
    } from "vuex";
    // import StripeCards from "../components/StripeCards";
    import StripeCards from "../components/StripeCards";
    export default {
        name: "StripePaymentForm",
        components: {
            StripeCards
        },
        data() {
            return {
                billing: {
                    name: "",
                    email: "",
                    address: "",
                    phone: "",
                    city: "",
                    province: "",
                    country: "",
                    postal_code: ""
                },
                elements: null,
                error: {
                    name: 1,
                    email: 1,
                    address: 1,
                    phone: 1,
                    city: 1,
                    province: 1,
                    country: 1,
                    postal_code: 1
                }
            };
        },
        computed: mapGetters(["cart"]),
        mounted: function() {
            this.elements = stripe.elements();
            card = this.elements.create("card");
            card.mount(this.$refs.card);
        },
        methods: {
            ...mapActions([
                "newOrder",
                "deleteCartItem",
                "toggleLoader",
                "makeOrderSuccess"
            ]),
            purchase: function() {
                let is_error = 0; // holds value if theres error
                this.validation();
                // we check if error exists after validation
                Object.values(this.error).forEach(values => {
                    if (values) {
                        is_error = 1;
                    }
                });
                if (!is_error) {
                    this.toggleLoader();
                    const items = this.cart;
                    const billing_details = this.billing;
                    let self = this;
                    const additional_data = {
                        name: billing_details.name,
                        address_line1: billing_details.address,
                        address_city: billing_details.city,
                        address_state: billing_details.province,
                        address_zip: billing_details.zip,
                        address_country: billing_details.country,
                        currency: "usd"
                    };
                    stripe.createToken(card, additional_data).then(function(result) {
                        if (result.error) {
                            self.hasCardErrors = true;
                            self.$forceUpdate(); // Forcing the DOM to update so the Stripe Element can update.
                            self.toggleLoader();
                            return;
                        }
                        // console.log(JSON.stringify(result));
                        const order = {
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
                        };
                        self.addToServer(order);
                    });
                }
            },
            addToServer(order) {
                this.newOrder(order).then(res => {
                    if (res.status === 201) {
                        this.billing.name = "";
                        this.billing.email = "";
                        this.billing.address = "";
                        this.billing.phone = 0;
                        this.billing.city = "";
                        this.billing.province = "";
                        this.billing.zip = 0;
                        this.billing.country = "";
                        this.deleteCartItem();
                        this.makeOrderSuccess();
                        this.$router.push({
                            name: "checkout_success",
                            params: {
                                receipt_url: res.data.order.receipt_url
                            }
                        });
                        this.toggleLoader();
                    } else {
                        this.toggleLoader();
                        alert(res.data.message);
                    }
                });
            },
            validation() {
                this.error.name = this.billing.name ? 0 : 1;
                this.error.email = this.validEmail(this.billing.email) ? 0 : 1;
                this.error.address = this.billing.address ? 0 : 1;
                this.error.phone = this.validPhone(this.billing.phone) ? 0 : 1;
                this.error.city = this.billing.city ? 0 : 1;
                this.error.province = this.billing.province ? 0 : 1;
                this.error.postal_code =
                    this.billing.postal_code.length < 4 || isNaN(this.billing.postal_code) ?
                    1 :
                    0;
                this.error.country = this.billing.country ? 0 : 1;
            },
            validEmail(string) {
                const re = /\S+@\S+\.\S+/;
                return re.test(string);
            },
            validPhone(input) {
                if (input.length > 8) {
                    const re = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
                    return re.test(input);
                }
            }
        }
    };
</script>
<style scoped>
    a {
        text-decoration: none;
    }

    a:hover {
        color: #6f1b9d;
    }
</style>