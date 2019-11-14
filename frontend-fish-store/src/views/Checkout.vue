<template>
    <div class="container d-flex flex-column justify-content-center align-items-center pt-5">
        <div class="w-100 col-md-9">
            <b-card header-tag="header" footer-tag="footer">
                <template v-slot:header>
                    <h6 class="mb-0">Checkout Order</h6>
                </template>
                <h4>My shopping cart :</h4>
                <!-- shopping cart starts -->
                <CartContentTable />
                <!-- shopping cart ends -->
                <hr />
                <div class="d-flex justify-content-around">
                    <div class="form-group">
                        <label for="quantity">Total Quantity</label>
                        <input type="text" class="form-control bg-light font-weight-bold text-success" v-model="total_quantity" id="quantity" readonly />
                        <small class="form-text text-muted">Total number of fish</small>
                    </div>
                    <div class="form-group">
                        <label for="price">Total Price $</label>
                        <input type="text" class="form-control bg-light font-weight-bold text-success" v-model="total_price" id="price" readonly />
                        <small class="form-text text-muted">Total cost</small>
                    </div>
                </div>
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
                <!-- Payment Details -->
                <h4>Payment Details :</h4>
                <div>
                    <div class="form-group">
                        <label>Name on card</label>
                        <input type="text" v-model="name_on_card" class="form-control">
                    </div>
                    <hr>
                    <!-- stripe card -->
                    <vue-stripe-elements ref="elementsRef" @token="tokenCreated" @loading="loading = $event">
                    </vue-stripe-elements>
                    <!-- stripe card end -->
                    <button @click="submit" class="btn btn-success form-control">Submit</button>
                </div>
                <!-- Payment Details Ends -->
                <template v-slot:footer>
                    <em></em>
                </template>
            </b-card>
        </div>
    </div>
</template>
<script>
    import CartContentTable from "../components/CartContentTable";
    import {
        mapGetters
    } from "vuex";
    export default {
        name: "checkout",
        components: {
            CartContentTable
        },
        data() {
            return {
                billing:{
                  name: "",
                  email: "",
                  address: "",
                  phone: "0",
                  city: "",
                  province: ""
                },
                total_quantity: 0,
                total_price: 0,
                loading: false,
                token: null,
                charge: null,
                name_on_card: ""
            };
        },
        computed: mapGetters(["cart"]),
        methods: {
            getTotalQuantity: cart => {
                return cart
                    .map(item => item.quantity)
                    .reduce((a, b) => parseInt(a) + parseInt(b));
            },
            getTotalPrice: cart => {
                return cart
                    .map(item => item.price)
                    .reduce((a, b) => parseFloat(a) + parseFloat(b));
            },
            submit() {
                this.$refs.elementsRef.submit();
            },
            tokenCreated(token) {
                this.token = token;
                // for additional charge objects go to https://stripe.com/docs/api/charges/object
                this.charge = {
                    source: token.card,
                    amount: this.total_price,
                    name_on_card: this.name_on_card,
                    description: this.description,
                    country: "AUD",
                    metadata: {
                        order: "Hello world",
                        amount: 300
                    },
                }
                this.sendTokenToServer(this.charge);
            },
            sendTokenToServer(charge) {
                console.log(charge)
                // Send to server
            }
        },
        created() {
            if (this.cart.length > 0) {
                this.total_quantity = this.getTotalQuantity(this.cart);
                this.total_price = "$" + this.getTotalPrice(this.cart);
            }
        }
    };
</script>
<style scoped>
</style>