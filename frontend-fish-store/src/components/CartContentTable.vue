<template>
  <div>
    <b-table sticky-header :items="cart" :fields="fields" head-variant="light"></b-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "CartContentTable",
  data() {
    return {
      fields: [
        // {
        //   key: "id",
        //   label: "Id"
        // },
        {
          key: "name",
          label: "Name",
          sortable: true
        },
        {
          key: "quantity",
          label: "Quantity",
          sortable: true
        },
        {
          key: "price",
          label: "Price",
          formatter: value => `$ ${value}`,
          sortable: true
        }
      ]
    };
  },
  computed: mapGetters(["cart"])
};
</script>

<style scoped>
</style>