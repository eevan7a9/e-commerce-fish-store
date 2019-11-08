<template>
  <div class="wrapper-table">
    <b-table sticky-header :fields="fields" :items="items" head-variant="light">
      <template v-slot:cell(name)="data">
        <!-- `data.value` is the value after formatted by the Formatter -->
        <a :href="`#${data.value}`">{{ data.value }}</a>
      </template>

      <template v-slot:cell(Action)="data">
        <!-- `data.value` is the value after formatted by the Formatter -->
        <button @click="view(data.item.name)" class="btn btn-outline-primary">Edit</button>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: "ProductsTable",
  data() {
    return {
      fields: [
        {
          // A column that needs custom formatting,
          // calling formatter 'fullName' in this app
          key: "name",
          label: "Fish Name"
        },
        // A regular column
        {
          key: "weight",
          label: "Weigth"
        },
        {
          // A regular column with custom formatter
          key: "price",
          label: "Price"
        },
        {
          // A virtual column with custom formatter
          key: "Action",
          label: "Action"
        }
      ],
      items: [
        { name: "Koi First", weight: 21.2, price: 42 },
        { name: "Koi Third", weight: 15.5, price: 36 },
        { name: "Koi Second", weight: 21.2, price: 73 },
        {
          name: "Some Koi",
          weight: 15.5,
          price: 62
        },
        { name: "Koi First", weight: 21.2, price: 42 },
        { name: "Koi Third", weight: 15.5, price: 36 },
        { name: "Koi Second", weight: 21.2, price: 73 },
        {
          name: "The Koi of Koi",
          weight: 15.5,
          price: 62
        }
      ]
    };
  },
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