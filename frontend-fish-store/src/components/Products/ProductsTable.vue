<template>
  <div class="wrapper-table">
    <b-alert
      :show="dismissCountDown"
      dismissible
      variant="success"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
    >
      <h4 class="text-success font-weight-bold">Success</h4>
      <p>{{ alertMessage}}</p>
      <b-progress
        variant="success"
        :max="dismissSecs"
        :value="dismissCountDown"
        height="4px"
      ></b-progress>
    </b-alert>
    <b-table sticky-header :fields="fields" :items="products" head-variant="light">
      <template v-slot:head(Action)>
           <div class="text-nowrap text-center">Action</div>
      </template>
      <template v-slot:cell(name)="data">
        <!-- `data.value` is the value after formatted by the Formatter -->
        <a :href="`#${data.value}`">{{ data.value }}</a>
      </template>

      <template v-slot:cell(Action)="data">
        <!-- `data.value` is the value after formatted by the Formatter -->
        <!-- <button @click="view(data.item.id)" class="btn btn-outline-primary">Edit</button> -->
        <div class="d-flex align-items-center justify-content-center">
          <router-link :to="{name:'application.products.edit', params:{edit_product:data.item}}" 
              class="btn btn-outline-primary mr-2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
          </router-link>
          <button class="btn btn-outline-danger" @click="remove(data.item)">
            <span v-if="spinner === data.item.id">
              <b-spinner small type="grow"></b-spinner>
              Loading...
            </span>
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
              v-else
            >
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              <line x1="10" y1="11" x2="10" y2="17" />
              <line x1="14" y1="11" x2="14" y2="17" />
            </svg>
          </button>
        </div>
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
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
          label: "Weigth",
          formatter: (val) => 'lb ' + val
        },
        {
          key: "price",
          label: "Price",
          formatter: (val) => '$ ' + val
        },
        {
          key: "Action",
          label: "Action"
        }
      ],
      alertMessage: "",
      spinner: 0,
      dismissSecs: 10,
      dismissCountDown: 0,
    };
  },
  computed: mapGetters(["products"]),
  methods: {
    ...mapActions(["deleteProduct"]),
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs
    },
    remove(product) {
      this.spinner = product.id;
      const confirmed = confirm(`Are you sure you want to remove ${product.name}`);
      if (confirmed) {
        this.deleteProduct(product.id).then((res) => {
          this.alertMessage = `${res.data.name} have been removed`;
          this.spinner = 0;
          this.showAlert();
        });
      }else{
        this.spinner = 0;
      }
    }
  }
};
</script>

<style scoped>
.b-table-sticky-header {
  max-height: 500px;
}
</style>