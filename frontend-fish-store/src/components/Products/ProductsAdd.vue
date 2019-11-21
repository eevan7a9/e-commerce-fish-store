<template>
  <div class="wrapper">
    <div class="inner-wrapper bg-light">
      <form @submit.prevent="submit" enctype="multipart/form-data">
        <div class="form-group">
          <label for="exampleInputName">Product name</label>
          <input
            type="text"
            class="form-control"
            v-model="product.name"
            id="exampleInputName"
            placeholder="Enter Name"
          />
          <p class="text-danger" v-if="error.name.status">{{ error.name.message }}</p>
        </div>
        <div class="form-group">
          <label for="exampleInputDescription">Description</label>
          <textarea
            class="form-control"
            id="exampleInputDescription"
            v-model="product.description"
            placeholder="Description"
          ></textarea>
          <p class="text-danger" v-if="error.description.status">{{ error.description.message }}</p>
        </div>
        <hr />
        <div class="form-inline">
          <div class="form-group mx-sm-3 my-2">
            <label for="units pr-1">Units :</label>
            <input
              type="number"
              class="form-control"
              id="units"
              :min="min_unit"
              v-model="product.units"
              placeholder="units"
            />
          </div>

          <div class="form-group mx-sm-3 my-2">
            <label for="weight">Weight :</label>
            <div class="input-group-prepend">
              <span class="input-group-text">lb</span>
            </div>
            <input
              type="number"
              class="form-control"
              id="weight"
              min="0.01"
              v-model="product.weight"
              step=".01"
              placeholder="Weight"
            />
          </div>
          <div class="form-group mx-sm-3 my-2">
            <label for="price">Price :</label>
            <div class="input-group-prepend">
              <span class="input-group-text">$</span>
            </div>
            <input
              type="number"
              class="form-control"
              id="price"
              min="0.01"
              step=".01"
              v-model="product.price"
              placeholder="Price"
            />
          </div>
        </div>
        <div class="form-group mt-3 w-50">
          <label for="exampleFormControlFile1">Upload Image</label>
          <input type="file" class="form-control-file" id="exampleFormControlFile1" v-on:change="onImageChange" />
        </div>
        <div class="w-100">
          <button
            type="submit"
            class="btn float-right"
            :class="{'btn-success': edit_product === undefined, 'btn-info': edit_product !== undefined}"
          >
            <span v-if="edit_product !== undefined">Edit</span>
            <span v-if="edit_product === undefined">Add</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "ProductsNew",
  props: {
    edit_product: Object
  },
  data() {
    return {
      min_unit: 1,
      product: {
        name: "",
        description: "",
        units: 1,
        weight: 0.01,
        price: 0.01,
        image: null
      },
      error: {
        name: {
          status: 0,
          message: "Product's name is required | atleast 4 char long"
        },
        description: {
          status: 0,
          message: "Products's description is required"
        }
      }
    };
  },
  methods: {
    ...mapActions(["addProduct", "editProduct", "toggleLoader"]),
    onImageChange(e){
      // console.log(e.target.files[0]);
      this.product.image = e.target.files[0];
    },
    validate() {
      this.error.name.status = this.product.name.trim().length < 4 ? 1 : 0;
      this.error.description.status =
        this.product.description.trim().length < 1 ? 1 : 0;
    },
    submit() {
      this.validate();
      if (this.error.name.status != 1 && this.error.description.status != 1) {
        // we show loader
        this.toggleLoader();
        // After we check for error
        // we check if it's for 'adding' or 'editing' a product
        if (this.edit_product === undefined) {
          // if we're adding product we procceed here...
          this.addProduct(this.product).then(res => {
            if (res.status === 201) {
              this.$router.push({ name: "application.products" });
              this.toggleLoader();
               alert("added");
            }
          });
        } else {
          // if were editing a product we procceed here...
          this.product.id = this.edit_product.id;
          this.editProduct(this.product).then(res => {
            if (res.status === 201) {
              this.$router.push({ name: "application.products" });
              this.toggleLoader();
              alert("Edit, success.");
            }else{
              alert("something went wrong.");
            }
          });
        }
      }
    }
  },
  watch: {
    edit_product: function() {
      this.product.name = "";
      this.product.description = "";
      this.product.units = 1;
      this.product.weight = 0.1;
      this.product.price = 0.1;
    }
  },
  created() {
    // We check if we are adding or editing
    if (this.edit_product != undefined) {
      this.product = { ...this.edit_product };
      this.product.image = null;
      this.min_unit = 0;
    }
  }
};
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.inner-wrapper {
  width: 100%;
  height: 100%;
  padding: 20px 30px;
}
.price-cont {
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: center;
}
button {
  padding: 10px 20px;
}
</style>