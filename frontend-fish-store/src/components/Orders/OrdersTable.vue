<template>
  <div class="wrapper-table">
    <b-table sticky-header :fields="fields" :items="orders" head-variant="light">
      <template v-slot:cell(product_name)="data">
        <!-- `data.value` is the value after formatted by the Formatter -->
        <a :href="`#${data.value}`">{{ data.value }}</a>
      </template>

      <template v-slot:cell(Action)="data">
        <!-- `data.value` is the value after formatted by the Formatter -->
        <!-- <button @click="view(data.item.id)" class="btn btn-outline-primary">Edit</button> -->
        <router-link
          :to="{name:'application.orders.details', params:{order:data.item}}"
          class="btn btn-outline-success"
        >View</router-link>
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ProductsTable",
  data() {
    return {
      fields: [
        {
          key: "product_name",
          label: "Product Name"
        },
        {
          key: "user_email",
          label: "Email"
        },
        {
          key: "quantity",
          label: "Quantity"
        },
        {
          key: "address",
          label: "Address"
        },
        {
          key: "is_delivered",
          label: "Delivered"
        },
        {
          key: "created_at",
          label: "Ordered at"
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
    view(value) {
      alert(value);
    }
  }
};
</script>

<style scoped>
.b-table-sticky-header {
  max-height: 500px;
}
