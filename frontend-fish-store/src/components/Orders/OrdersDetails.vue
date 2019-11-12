<template>
  <div>
    <b-card-group deck>
      <b-card>
        <div class="grouper">
          <div class="inner-group">
            <label>Product Name :</label>
            <p>{{ order.product_name }}</p>
          </div>

          <div class="inner-group">
            <label>Email address :</label>
            <p>{{ order.user_email }}</p>
          </div>

          <div class="inner-group">
            <label>Quantity :</label>
            <p>{{ order.quantity }}</p>
          </div>

          <div class="inner-group">
            <label>Address :</label>
            <p>{{ order.address }}</p>
          </div>

          <div class="inner-group">
            <label>Created at :</label>
            <p>{{ order.created_at }}</p>
          </div>

          <div class="inner-group">
            <label>Updated at :</label>
            <p>{{ order.updated_at }}</p>
          </div>
        </div>
        <hr />
        <div class="grouper">
          <div class="inner-group">
            <label>Delivered :</label>
            <p>{{ order.is_delivered }}</p>
          </div>
          <div class="inner-group">
            <label>Delivered at:</label>
            <p>0000-00-00</p>
          </div>
        </div>
        <!-- <hr />
        <router-link :to="{name:'application.orders'}" class="btn btn-secondary px-4">Go back</router-link>-->
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
export default {
  name: "OrdersDetails",
  props: {
    order: Object
  },
  data() {
    return {
      edit_mode: 0
    };
  }
};
</script>

<style scoped>
.grouper {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  font-size: 18px;
}
.inner-group {
  width: 80%;
  display: grid;
  grid-template-columns: 150px 1fr;
  /* background: rebeccapurple; */
}
label,
p {
  padding: 10px;
  margin: 0;
}
label {
  text-align: right;
}
</style>