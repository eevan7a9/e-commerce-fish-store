<template>
    <div class="container d-flex justify-content-center pt-5">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">
                    <router-link :to="{name:'checkout'}" class="violet d-flex align-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="11 17 6 12 11 7" />
                            <polyline points="18 17 13 12 18 7" />
                        </svg>
                        <span class="font-weight-bold violet text-uppercase">Back</span>
                    </router-link>
                </div>
                <div class="card-body">
                    <hr>
                    <h4>Billing Details :</h4>
                    <div class="col-md-8 mt-3">
                        <label>Name :</label>
                        <input type="text" class="form-control" v-model="billing.name">
                    </div>
                    <div class="col-md-8 mt-3">
                        <label>Email :</label>
                        <input type="text" class="form-control" v-model="billing.email">
                    </div>
                    <div class="col-md-8 mt-3">
                        <label>Address :</label>
                        <textarea class="form-control" v-model="billing.address"></textarea>
                        <p class="text-danger" v-if="error.address">Required</p>
                    </div>
                    <div class="col-md-8 mt-3">
                        <label>Phone :</label>
                        <input type="text" class="form-control" v-model="billing.phone">
                        <p class="text-danger" v-if="error.phone">Required</p>
                    </div>
                    <div class="form-row mt-2">
                        <div class="col-md-6 mt-3">
                            <label>City :</label>
                            <input type="text" class="form-control" v-model="billing.city">
                            <p class="text-danger" v-if="error.city">Required</p>
                        </div>
                        <div class="col-md-6 mt-3">
                            <label>Province :</label>
                            <input type="text" class="form-control" v-model="billing.province">
                            <p class="text-danger" v-if="error.province">Required</p>
                        </div>
                    </div>
                    <div class="form-row mt-2">
                        <div class="col-md-6 mt-3">
                            <label for="sel1">Country (select one):</label>
                            <select class="form-control" id="sel1" v-model="billing.country" required>
                                <option value="us">US</option>
                                <option value="jp">JP</option>
                                <option value="ph">PH</option>
                                <option value="au">AU</option>
                            </select>
                            <p class="text-danger" v-if="error.country">Required</p>
                        </div>
                        <div class="col-md-6 mt-3">
                            <label>postal code :</label>
                            <input type="text" class="form-control" v-model="billing.postal_code">
                            <p class="text-danger" v-if="error.postal_code">Required</p>
                        </div>
                    </div>
                    <button type="button" class="form-control btn btn-success mt-4 font-weight-bold text-uppercase" @click="purchase">Purchase</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {
        mapGetters,
        mapActions
    } from "vuex";
    export default {
        name: "CheckoutCash",
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
                    postal_code: "",
                },
                error: {
                    address: 1,
                    phone: 1,
                    city: 1,
                    province: 1,
                    country: 1,
                    postal_code: 1
                }
            }
        },
        computed: mapGetters(["cart"]),
        methods: {
            ...mapActions([
                "newOrder", "toggleLoader", "deleteCartItem", "makeOrderSuccess"
            ]),
            purchase() {
                // holds if validation finds error  
                let is_error = 0;
                this.validation();
                // check for error
                Object.values(this.error).forEach(values => {
                    if (values) {
                        is_error = 1;
                    }
                });
                // if there's no error
                if (!is_error) {
                    this.toggleLoader(); // init loader
                    const order = {
                        items: this.cart,
                        email: this.billing.email,
                        phone: this.billing.phone,
                        address: this.billing.address,
                        country: this.billing.country,
                        city: this.billing.city,
                        state: this.billing.province,
                        postal_code: this.billing.postal_code,
                        token: null,
                        last4: null,
                        payment_method: "cod"
                    };
                    // we submit request to server
                    this.newOrder(order).then(res => {
                        if (res.status === 201) {
                            console.log(res)
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
                                name: "checkout_success"
                            });
                            this.toggleLoader(); // stop loader
                        } else {
                            console.log(res);
                            this.toggleLoader(); // stop loader
                            alert(res.data.message);
                        }
                    });
                }
            },
            validation() {
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
            validPhone(input) {
                if (input.length > 8) {
                    const re = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s/0-9]*$/g;
                    return re.test(input);
                }
            }
        }
    }
</script>
<style scoped>
    a {
        text-decoration: none;
    }

    a:hover {
        color: #6f1b9d;
    }
</style>