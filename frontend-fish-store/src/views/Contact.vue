<template>
    <div class="container py-5">
        <!-- Alert starts -->
        <b-alert :show="dismissCountDown" dismissible variant="success" @dismissed="dismissCountDown=0" @dismiss-count-down="countDownChanged">
            <h3>Success, message sent</h3>
            <p>This alert will dismiss after {{ dismissCountDown }} seconds...</p>
            <b-progress variant="success" :max="dismissSecs" :value="dismissCountDown" height="4px"></b-progress>
        </b-alert>
        <!-- Alert ends -->
        <div class="col-md-8 m-auto">
            <div class="card">
                <div class="card-header bg-custom-violet text-light">
                    <h4>We would love to hear from you.</h4>
                </div>
                <div class="card-body">
                    <div class="form-group">
                        <label>Email :</label>
                        <input type="email" v-model="email" class="form-control" @blur="validation" placeholder="Johndoe@email.com">
                        <small class="text-danger" v-if="error.email">Require, must be valid.</small>
                    </div>
                    <div class="form-group">
                        <label>Name :</label>
                        <input type="text" v-model="name" class="form-control" @blur="validation" placeholder="John Doe">
                        <small class="text-danger" v-if="error.name">Require</small>
                    </div>
                    <div class="form-group">
                        <label>Message</label>
                        <textarea class="form-control" v-model="message" @blur="validation" placeholder="Questions, Clarification, Problems..."></textarea>
                        <small class="text-danger" v-if="error.message">Require, atleast 12 char.</small>
                    </div>
                    <div class="text-right">
                        <button class="btn-custom-violet px-3" @click="sendMessage">Submit
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <line x1="22" y1="2" x2="11" y2="13" />
                                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                </svg>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "Contact",
        data() {
            return {
                dismissSecs: 10,
                dismissCountDown: 0,
                showDismissibleAlert: false,
                email: "",
                name: "",
                message: "",
                error: {
                    name: 1,
                    email: 1,
                    message: 1
                }
            }
        },
        methods: {
            countDownChanged(dismissCountDown) {
                this.dismissCountDown = dismissCountDown
            },
            sendMessage() {
                let is_error = 0;
                this.validation();
                Object.values(this.error).forEach(values => {
                    if (values) {
                        is_error = 1;
                    }
                });
                if (!is_error) {
                    this.dismissCountDown = this.dismissSecs
                    this.email = "";
                    this.name = "";
                    this.message = "";
                }
            },
            validation() {
                this.error.name = this.name ? 0 : 1;
                this.error.email = this.validEmail(this.email) ? 0 : 1;
                this.error.message = this.message.length > 12 ? 0 : 1;
            },
            validEmail(string) {
                const re = /\S+@\S+\.\S+/;
                return re.test(string);
            },
        }
    }
</script>
<style scoped></style>