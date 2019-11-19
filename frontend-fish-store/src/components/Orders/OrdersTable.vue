<template>
    <div class="wrapper-table">
        <b-table sticky-header="500px" :fields="fields" :items="orders" head-variant="light">
            <template v-slot:head(user_id)>
                <div class="text-nowrap">Buyer ID</div>
            </template>
            <template v-slot:head(created_at)>
                <div class="text-nowrap">Ordered at</div>
            </template>
            <template v-slot:cell(User Id)="data">
                <!-- `data.value` is the value after formatted by the Formatter -->
                <a :href="`#${data.value}`">{{ data.value }}</a>
            </template>
            <template v-slot:cell(Action)="data">
                <!-- `data.value` is the value after formatted by the Formatter -->
                <!-- <button @click="view(data.item.id)" class="btn btn-outline-primary">Edit</button> -->
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
                      formatter: val => 'lb '+val
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
                        key: "Action",
                        label: "Action"
                    }
                ]
            };
        },
        computed: mapGetters(["orders"]),
        methods: {
            ...mapActions(["getOrders"]),
            view(value) {
                alert(value);
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