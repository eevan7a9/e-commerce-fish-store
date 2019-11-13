<template>
  <div>
    <b-table sticky-header :items="cart" :fields="fields" head-variant="light">
      <template v-slot:cell(action)="data">
        <button class="btn btn-danger" @click="deleteCartItem(data.item.id)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="3 6 5 6 21 6" />
            <path
              d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
            />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
          </svg>
        </button>
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
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
        },
        {
          key: "action",
          label: "Action"
        }
      ]
    };
  },
  computed: mapGetters(["cart"]),
  methods: {
    ...mapActions(["deleteCartItem"])
  }
};
</script>

<style scoped>
</style>