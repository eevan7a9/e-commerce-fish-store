<template>
  <div class="wrapper-table">
    <b-table sticky-header :fields="fields" :items="products" head-variant="light">
      <template v-slot:cell(name)="data">
        <!-- `data.value` is the value after formatted by the Formatter -->
        <a :href="`#${data.value}`">{{ data.value }}</a>
      </template>

      <template v-slot:cell(Action)="data">
        <!-- `data.value` is the value after formatted by the Formatter -->
        <!-- <button @click="view(data.item.id)" class="btn btn-outline-primary">Edit</button> -->
        <router-link
          :to="{name:'application.products.edit', params:{edit_product:data.item}}"
          class="btn btn-outline-primary"
        >Edit</router-link>
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
          key: "name",
          label: "Fish Name"
        },
        {
          key: "units",
          label: "Units"
        },
        {
          key: "weight",
          label: "Weigth"
        },
        {
          key: "price",
          label: "Price"
        },
        {
          key: "Action",
          label: "Action"
        }
      ]
    };
  },
  computed: mapGetters(["products"]),
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
</style>