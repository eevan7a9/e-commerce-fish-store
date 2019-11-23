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
                        <input type="text" class="form-control" v-model="billing.name" readonly="">
                    </div>
                    <div class="col-md-8 mt-3">
                        <label>Email :</label>
                        <input type="text" class="form-control" v-model="billing.email" readonly>
                    </div>
                    <div class="col-md-8 mt-3">
                        <label>Address :</label>
                        <input type="text" class="form-control" v-model="billing.address">
                    </div>
                    <div class="col-md-8 mt-3">
                        <label>Phone :</label>
                        <input type="text" class="form-control" v-model="billing.phone">
                    </div>
                    <div class="form-row mt-2">
                        <div class="col-md-6 mt-3">
                            <label>City :</label>
                            <input type="text" class="form-control" v-model="billing.city">
                        </div>
                        <div class="col-md-6 mt-3">
                            <label>Province :</label>
                            <input type="text" class="form-control" v-model="billing.province">
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
                        </div>
                        <div class="col-md-6 mt-3">
                            <label>postal code :</label>
                            <input type="text" class="form-control" v-model="billing.postal_code">
                        </div>
                    </div>
                    <button type="button" class="form-control btn btn-success mt-4 font-weight-bold text-uppercase">Purchase</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
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
            }
        }
    }
</script>
<style scoped>
a{
	text-decoration: none;
}
a:hover{
	color: #6f1b9d;
}
</style>