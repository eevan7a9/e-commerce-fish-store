<template>
    <div ref="card">
        <button @click="purchase">Purchase</button>
        <h1>Hello</h1>
    </div>
</template>
<script>
    let stripe = Stripe(`YOUR_STRIPE_PUBLISHABLE_KEY`),
        elements = stripe.elements(),
        card = undefined;
    export default {
        name: "PaymentForm",
        mounted: function() {
            card = elements.create('card');
            card.mount(this.$refs.card);
        },
        purchase: function() {
            stripe.createToken(card).then(function(result) {
                if (result.error) {
                    self.hasCardErrors = true;
                    self.$forceUpdate(); // Forcing the DOM to update so the Stripe Element can update.
                    return;
                }
            });
        }
    };
</script>h