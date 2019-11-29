<template>
    <div class="wrapper-table">
        <b-table sticky-header="500px" :fields="fields" :items="orders" head-variant="light">
            <template v-slot:head(user_id)>
                <div class="text-nowrap">Buyer ID</div>
            </template>
            <template v-slot:head(created_at)>
                <div class="text-nowrap">Ordered at</div>
            </template>
            <template v-slot:head(is_delivered)>
                <div class="text-nowrap text-center">Delivered</div>
            </template>
            <template v-slot:head(action)>
                <div class="text-nowrap text-left">Action</div>
            </template>
            <template v-slot:cell(is_delivered)="data">
                <div class="w-100 text-center" v-if="spinner_delivered === data.item.id">
                    <b-spinner variant="primary" label="Spinning"></b-spinner>
                </div>
                <div v-else>
                    <div class="custom-control custom-switch" v-if="user.role === 'admin'">
                        <input type="checkbox" class="custom-control-input" :checked="data.item.is_delivered">
                        <label class="custom-control-label font-weight-bold" for="customSwitches" @click="setDeliver(data.item.id)" :class="data.item.is_delivered ?'text-success':'text-danger'">{{data.value}}</label>
                    </div>
                    <div class="text-nowrap font-weight-bold" :class="data.item.is_delivered ?'text-success':'text-danger'" v-if="user.role === 'buyer'">{{data.value}}</div>
                </div>
            </template>
            <template v-slot:cell(deleted_at)="data">
                <div class="w-100 text-center" v-if="spinner_canceled === data.item.id">
                    <b-spinner variant="primary" label="Spinning"></b-spinner>
                </div>
                <p class="text-center" :class="data.item.deleted_at ? 'text-danger' : 'text-success'"
                    v-else
                >
                    {{ data.value }}
                </p>
            </template>
            <template v-slot:cell(action)="data">
                <div class="text-left">
                    <button @click="$bvModal.show(`${data.item.id}`)" class="btn btn-outline-info mr-2">
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
                    </button>
                    <button class="btn btn-outline-danger" @click="trashOrder(data.item.id)" 
                        v-if="!data.item.deleted_at && !data.item.is_delivered && user.role === 'admin'"
                    >
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
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          <line x1="10" y1="11" x2="10" y2="17" />
                          <line x1="14" y1="11" x2="14" y2="17" />
                        </svg>
                    </button>
                </div>
                <!-- Modal starts -->
                <b-modal :id="`${data.item.id}`"  scrollable size="lg" title="Order's details:" ok-only>
                    <OrdersDetails :order="data.item" />
                </b-modal>
                <!-- The modal ends-->
            </template>
        </b-table>
    </div>
</template>
<script>
    import {
        mapGetters,
        mapActions
    } from "vuex";
    import OrdersDetails from "./OrdersDetails";
    export default {
        name: "OrdersTable",
        components: {
            OrdersDetails
        },
        data() {
            return {
                fields: [{
                        key: "user_id",
                        label: "User Id",
                        formatter: (val) => val ? val : " Guest "
                    },
                    {
                        key: "email",
                        label: "Email"
                    },
                    {
                        key: "quantity",
                        label: "Quantity",
                        sortable: true
                    },
                    {
                        key: "amount",
                        label: "Amount",
                        formatter: val => '$ ' + val
                    },
                    {
                        key: "is_delivered",
                        label: "Delivered",
                        formatter: val => (val == 1 ? "Yes" : "No")
                    },
                    {
                        key: "created_at",
                        label: "Ordered at",
                        sortable: true,
                        formatter: val => {
                            const dt = new Date(val);
                            const month = dt.getMonth() + 1 > 9 ? dt.getMonth() + 1 : '0' + (dt.getMonth() + 1)
                            return `${dt.getFullYear()} - ${month} - ${dt.getDate()}`;
                        }
                    },
                    {
                        key: "deleted_at",
                        label: "Status",
                        formatter: val => val ? "Canceled" : "Valid"
                    },
                    {
                        key: "action",
                        label: "Action"
                    },
                ],
                spinner_delivered: 0,
                spinner_canceled: 0,
                hide: 0
            };
        },
        computed: mapGetters(["orders", "user"]),
        methods: {
            ...mapActions(["getOrders", "setOrderDelivered", "cancelOrder"]),
            setDeliver(id) {
                const confirmed = confirm("you are about to update the delivered status, are you sure?");
 
                if (confirmed) {
                    this.spinner_delivered = id;
                    const find_order = this.orders.find(order => order.id === id);
                    if (find_order) {
                        const order = {
                            id: find_order.id,
                            is_delivered: !find_order.is_delivered
                        };
                        this.setOrderDelivered(order).then(()=> {
                            this.spinner_delivered = 0;
                        }).catch(err => {
                            alert(err);
                        });
                    }
                }
            },
            trashOrder(id){
                const answer = confirm(" Are you sure you want to \"Terminate\"  this order? ");
                if (answer) {
                    this.spinner_canceled = id;
                    this.cancelOrder(id).then(() => {
                        setTimeout(() => {
                            this.spinner_canceled = 0;
                        }, 1000);
                    });
                }
            }
        },
        created() {
            this.getOrders();
        }
    };
</script>
<style scoped>
    .b-table-sticky-header {
        max-height: 600px;
    }