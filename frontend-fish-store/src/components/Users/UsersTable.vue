<template>
    <div class="container">
        <h2>Registered buyers</h2>
        <b-table sticky-header="500px" :fields="fields" :items="usersList" head-variant="light">
            <template v-slot:cell(orders)="data">
                <p class="text-center font-weight-bold">{{data.value}}</p>
            </template>
            <template v-slot:cell(deleted_at)="data">
                <p class="text-center font-weight-bold"
                :class="data.item.deleted_at ? 'text-danger' : 'text-success'"
                 >{{data.value}}</p>
            </template>
            <template v-slot:cell(Action)="data">
                <div class="text-center">
                    <button class="btn btn-danger" @click="removeUser(data.item.id)" v-if="!data.item.deleted_at">
                        <!-- <span class="font-weight-bold mr-1">Cancel</span> -->
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                        </svg>
                    </button>
                    <span class="font-weight-bold text-danger" v-else>-</span>
                </div>
            </template> 
        </b-table>
    </div>
</template>
<script>
    import {
        mapGetters,
        mapActions
    } from 'vuex';
    export default {
        name: "UsersTable",
        data() {
            return {
                fields: [{
                        key: "name",
                        label: "Username"
                    },
                    {
                        key: "email",
                        label: "Email"
                    },
                    {
                        key: "created_at",
                        label: "Joined",
                    },
                    {
                        key: "orders",
                        label: "Orders Total",
                        formatter: (val) => val.length
                    },
                    {
                        key: "deleted_at",
                        label: "Status",
                        formatter: val => val ? "Banned" : "Active"
                    },
                    {
                        key: "Action",
                        label: "Action"
                    }
                ],
            }
        },
        computed: mapGetters(["usersList"]),
        methods: {
            ...mapActions(["getUsersList", "deleteUser", "toggleLoader"]),
            removeUser(id) {
               const answer = confirm("Are you sure you want to ban this user?");
               if (answer) {
                    this.toggleLoader();
                    this.deleteUser(id).then(() => {
                        setTimeout(()=>{
                            this.toggleLoader();
                        }, 1000);
                    });
               }
            }
        },
        created() {
            this.getUsersList();
        }
    }
</script>
<style scoped>
</style>