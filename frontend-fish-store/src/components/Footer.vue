<template>
    <div class="w-100 bg-custom-violet pt-5">
        <div class="container">
            <div class="row">
                <div class="col-md-3">
                    <h5 class="text-light font-weight-bold text-uppercase">Stay Connected</h5>
                    <ul class="list-group mb-3">
                        <li class="list-group-item">
                            <a href="#" class="text-light"><span class="mr-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                    </svg></span>Facebook</a>
                        </li>
                        <li class="list-group-item">
                            <a href="#" class="text-light"><span class="mr-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                                    </svg></span>Twitter</a>
                        </li>
                        <li class="list-group-item">
                            <a href="#" class="text-light"><span class="mr-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                    </svg></span>Instagram</a>
                        </li>
                    </ul>
                </div>
                <div class="col-md-3">
                    <h5 class="text-light font-weight-bold text-uppercase">About Us</h5>
                    <ul class="list-group mb-3">
                        <li class="list-group-item">
                            <a href="#" class="text-light">Privacy</a>
                        </li>
                        <li class="list-group-item">
                            <a href="#" class="text-light">Terms and Service</a>
                        </li>
                        <li class="list-group-item">
                            <a href="#" class="text-light">Location</a>
                        </li>
                        <li class="list-group-item">
                            <a href="#" class="text-light">Payment Support</a>
                        </li>
                    </ul>
                </div>
                <div class="col-md-3">
                    <h5 class="text-light font-weight-bold text-uppercase">Quick Links</h5>
                    <ul class="list-group mb-3">
                        <li class="list-group-item" v-if="!token">
                            <span class="text-light mr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                                    <polyline points="10 17 15 12 10 7" />
                                    <line x1="15" y1="12" x2="3" y2="12" />
                                </svg>
                            </span>
                            <router-link :to="{name:'login'}" class="text-light">
                                Login
                            </router-link>
                        </li>
                        <li class="list-group-item" v-if="!token">
                            <span class="text-light mr-2">
                                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                                </svg>
                            </span>
                            <router-link :to="{name:'register'}" class="text-light">
                                Register
                            </router-link>
                        </li>
                        <li class="list-group-item" v-if="token">
                            <span class="text-light mr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                    <polyline points="16 17 21 12 16 7" />
                                    <line x1="21" y1="12" x2="9" y2="12" />
                                </svg>
                            </span>
                            <a href="#" @click="out" class="text-light">
                                Logout
                            </a>
                        </li>
                        <li class="list-group-item">
                            <span class="text-light mr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <circle cx="9" cy="21" r="1" />
                                    <circle cx="20" cy="21" r="1" />
                                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                                </svg>
                            </span>
                            <router-link :to="{name:'catalog'}" class="text-light">
                                Start shopping
                            </router-link>
                        </li>
                    </ul>
                </div>
                <div class="col-md-3">
                    <h5 class="text-light font-weight-bold text-uppercase">Mailing lists</h5>
                    <ul class="list-group mb-3">
                        <li class="list-group-item">
                            <input type="text" name="mailing" class="form-control" value="">
                            <button type="button" class="btn btn-info mt-2 form-control">Submit
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <line x1="22" y1="2" x2="11" y2="13" />
                                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                    </svg>
                                </span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="w-100 text-center py-4 credit">
            <a href="https://github.com/eevan7a9/e-commerce-fish-store" class="text-light">&#169; 2019: https://github.com/eevan7a9/e-commerce-fish-store</a>
        </div>
    </div>
</template>
<script>
    import {
        mapGetters,
        mapActions
    } from "vuex";
    export default {
        name: "Footer",
        computed: mapGetters(["token"]),
        methods: {
            ...mapActions(["logout"]),
            out() {
                this.logout().then(res => {
                    this.$router.push({
                        name: "login"
                    });
                    if (res !== undefined) {
                        alert(res.data.message);
                    }
                });
            }
        }
    };
</script>
<style scoped>
    .credit {
        background: #36094f;
    }

    li {
        background: #6f1b9d;
    }

    a:hover {
        text-decoration: none;
    }
</style>