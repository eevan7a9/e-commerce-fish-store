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
            <template v-slot:cell(is_delivered)="data">
                <div class="w-100 text-center" v-if="spinner === data.item.id">
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
            <template v-slot:cell(view)="data">
                <button @click="$bvModal.show(`${data.item.id}`)" class="btn btn-outline-success">View</button>
                <!-- Modal starts -->
                <b-modal :id="`${data.item.id}`" size="lg" title="Orders Made:" ok-only>
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
                        key: "weight",
                        label: "weight",
                        formatter: val => 'lb ' + val
                    },
                    {
                        key: "is_delivered",
                        label: "Delivered",
                        formatter: val => (val == 1 ? "Yes" : "Pending")
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
                        key: "view",
                        label: "View"
                    },
                ],
                spinner: 0,
                hide: 0
            };
        },
        computed: mapGetters(["orders", "user"]),
        methods: {
            ...mapActions(["getOrders", "setOrderDelivered"]),
            setDeliver(id) {
                const confirmed = confirm("you are about to update the delivered status, are you sure?");
 
                if (confirmed) {
                    this.spinner = id;
                    const find_order = this.orders.find(order => order.id === id);
                    if (find_order) {
                        const order = {
                            id: find_order.id,
                            is_delivered: !find_order.is_delivered
                        };
                        this.setOrderDelivered(order).then(() => {
                            this.spinner = 0;
                        }).catch(err => {
                            alert(err);
                        });
                    }
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