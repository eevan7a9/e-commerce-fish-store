<template>
    <div class=" wrapper">
        <div class="sidebar bg-dark">
            <b-list-group>
                <!-- Application Section Starts -->
                <b-list-group-item v-b-toggle.collapse-3 class="pointer font-weight-bolder text-light bg-dark">Application
                    <img src="../assets/img/chevron-down.svg" alt="">
                </b-list-group-item>
                <b-collapse visible id="collapse-3" class="pl-3 bg-dark">
                    <b-list-group>
                        <b-list-group-item class="bg-secondary">
                            <router-link :to="{name:'application.info'}" class="text-light">App Status
                                <img src="../assets/img/bar-chart-2.svg" class="ml-1" alt="">
                            </router-link>
                        </b-list-group-item>
                        <!-- <b-list-group-item class="bg-secondary text-light">Layout</b-list-group-item> -->
                    </b-list-group>
                </b-collapse>
                <!-- Application Ends -->
                <!-- Products Section Starts-->
                <b-list-group-item v-b-toggle.collapse-1 class="pointer font-weight-bolder text-light bg-dark">Products
                    <img src="../assets/img/chevron-down.svg" alt="">
                </b-list-group-item>
                <b-collapse visible id="collapse-1" class="pl-3 bg-dark">
                    <b-list-group>
                        <b-list-group-item class="bg-secondary">
                            <router-link :to="{name:'application.products'}" class="text-light">Data Table
                                <img src="../assets/img/file-text.svg" class="ml-1" alt="">
                            </router-link>
                        </b-list-group-item>
                        <b-list-group-item class="bg-secondary">
                            <router-link :to="{name:'application.products.add'}" class="text-light">Add Products
                                <img src="../assets/img/plus-square.svg" class="ml-1" alt=""></router-link>
                        </b-list-group-item>
                    </b-list-group>
                </b-collapse>
                <!-- Products End -->
                <!-- Orders Section Starts -->
                <b-list-group-item v-b-toggle.collapse-2 class="pointer font-weight-bolder text-light bg-dark">Orders
                    <img src="../assets/img/chevron-down.svg" alt="">
                </b-list-group-item>
                <b-collapse visible id="collapse-2" class="pl-3 bg-dark">
                    <b-list-group>
                        <b-list-group-item class="bg-secondary">
                            <router-link :to="{name:'application.orders'}" class="text-light">Data Table
                                <img src="../assets/img/file-text.svg" class="ml-1" alt="">
                            </router-link>
                        </b-list-group-item>
                        <!-- <b-list-group-item class="bg-secondary text-light">Add Order</b-list-group-item> -->
                    </b-list-group>
                </b-collapse>
                <!-- Orders End -->
            </b-list-group>
        </div>
        <div class="main container  pt-5">
            <transition name="fade" mode="out-in">
                <router-view />
            </transition>
        </div>
    </div>
</template>
<script>
    export default {
        name: "Application"
    };
</script>
<style scoped>
    a:hover {
        text-decoration: none;
    }

    .wrapper {
        display: grid;
        grid-template-columns: auto 1fr;
    }

    .sidebar {
        /* background: rebeccapurple; */
        width: 300px;
        background: red;
        height: 100vh;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.3s;
    }

    .fade-enter,
    .fade-leave-to

    /* .fade-leave-active below version 2.1.8 */
        {
        opacity: 0;
    }
</style>