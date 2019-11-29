<template>
    <div>
        <b-card>
            <div class="row">
                <div class="col-sm-3 text-right">Email address :</div>
                <p class="col-sm-9">{{ order.email }}</p>
            </div>
             <div class="row">
                <div class="col-sm-3 text-right">Phone :</div>
                <p class="col-sm-9">{{ order.phone }}</p>
            </div>
            <div class="row">
                <div class="col-sm-3 text-right">Address :</div>
                <p class="col-sm-9">{{ order.address }}</p>
            </div>
            <hr />
            <div class="row w-100">
                <div class="col-sm-4 text-center">
                    <label>Country</label>
                    <p>{{ order.country }}</p>
                </div>
                <div class="col-sm-4 text-center">
                    <label>City</label>
                    <p>{{ order.city }}</p>
                </div>
                <div class="col-sm-4 text-center">
                    <label>State</label>
                    <p>{{ order.state }}</p>
                </div>
            </div>
            <hr />
            <div class="row">
                <div class="col-sm-3 text-right">Description:</div>
                <p class="col-sm-9">{{ order.description }}</p>
            </div>
            <div class="row">
                <div class="col-sm-3 text-right">Ordered at :</div>
                <p class="col-sm-9">{{ order.created_at }}</p>
            </div>
            <hr />
            <div class="row w-100">
                <div class="col-sm-4 text-center">
                    <label>Quantity</label>
                    <p>{{ order.quantity }}</p>
                </div>
                <div class="col-sm-4 text-center">
                    <label>Amount</label>
                    <p>{{ order.amount }}</p>
                </div>
                <div class="col-sm-4 text-center">
                    <label>Weight</label>
                    <p>{{ order.weight }}</p>
                </div>
            </div>
            <hr />
            <div class="col-12">
              <button class="btn btn-info mt-3" v-b-toggle.collapse-products>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </span>
                Product
              </button>
              <b-collapse id="collapse-products" class='mt-2'> 
                <div class="row">
                  <div class="col-sm-6 col-md-4" v-for="product in order.products" :key="product.id">
                  <b-card :img-src="product.image_location" img-alt="Image" img-top>
                    <small class="text-dark">{{product.name}}</small>
                      <ul class="list-group">
                        <li class="list-group-item">
                          <small>Quantity : {{product.pivot.quantity}}</small>
                        </li>
                        <li class="list-group-item">
                          <small>Total price : ${{product.pivot.amount}}</small>
                        </li>
                        <li class="list-group-item">
                          <small>Total weight : lb{{product.pivot.weight}}</small>
                        </li>
                      </ul>
                    <template v-slot:footer>
                    </template>
                  </b-card>
                </div>
                </div>
              </b-collapse>
            </div>
            <hr />
            <div class="row mb-2">
                <div class="col-sm-3 text-right">Payment Method:</div>
                <div class="col-sm-9 text-capitalize">{{ order.payment_method }}</div>
            </div>
            <div class="row mb-2">
                <div class="col-sm-3 text-right">Delivered :</div>
                <div class="col-sm-9">{{ order.is_delivered ? 'Yes' : 'No' }}</div>
            </div>
            <div class="row mb-2">
                <div class="col-sm-3 text-right">Delivered at:</div>
                <div class="col-sm-9">{{ order.delivered_at }}</div>
            </div>
        </b-card>
    </div>
</template>
<script>
    export default {
        name: "OrdersDetails",
        props: {
            order: Object
        },
        data() {
            return {
                edit_mode: 0
            };
        }
    };
</script>
<style scoped>
</style>