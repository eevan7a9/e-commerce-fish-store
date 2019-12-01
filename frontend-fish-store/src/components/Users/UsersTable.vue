<template>
    <div class="container">
        <h2>Registered buyers</h2>
        <b-table sticky-header="500px" :fields="fields" :items="usersList" head-variant="light">
            <template v-slot:cell(orders)="data">
                <p class="text-center font-weight-bold">{{data.value}}</p>
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
                        label: "Fish Name"
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
                        label: "Orders Made",
                        formatter: (val) => val.length
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
            ...mapActions(["getUsersList"])
        },
        created() {
            this.getUsersList().then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err);
            });
        }
    }
</script>
<style scoped>
</style>