<template>
    <div>
        <div>
            <b-card-group deck>
                <b-card bg-variant="primary" text-variant="white" header="Products" class="text-center">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-package">
                            <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                            <line x1="12" y1="22.08" x2="12" y2="12" />
                        </svg>
                    </span>
                    <hr />
                    <h3 class="mt-3 font-weight-bold">{{ products.length }}</h3>
                </b-card>
                <b-card bg-variant="secondary" text-variant="white" header="Registered" class="text-center">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-users">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                    </span>
                    <hr />
                    <h3 class="mt-3 font-weight-bold">{{usersList.length}}</h3>
                </b-card>
                <b-card bg-variant="danger" text-variant="white" header="Pending Order" class="text-center">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clipboard">
                            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                            <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                        </svg>
                    </span>
                    <hr />
                    <h3 class="mt-3 font-weight-bold">{{pendingOrders.length}}</h3>
                </b-card>
                <b-card bg-variant="success" text-variant="white" header="Orders delivered" class="text-center">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="9 11 12 14 22 4" />
                            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                        </svg>
                    </span>
                    <hr />
                    <h3 class="mt-3 font-weight-bold">{{successOrders.length}}</h3>
                </b-card>
            </b-card-group>
        </div>
        <UsersTable class="mt-5" />
    </div>
</template>
<script>
    import UsersTable from "../Users/UsersTable.vue";
    import { mapGetters, mapActions } from "vuex";
    export default {
        name: "ApplicationInfo",
        components:{
            UsersTable
        },
        data() {
            return {
                users: 0,
            }
        },
        computed: mapGetters(["pendingOrders", "successOrders", "products", "usersList"]),
        methods: {
            ...mapActions(["getOrders"])
        },
        created() {
            this.getOrders();
        }
    };
</script>
<style scoped>
    svg {
        width: 50px;
        height: 50px;
    }
</style>