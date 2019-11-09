<template>
  <div class="wrapper">
    <div class="inner-wrapper bg-light">
      <form @submit.prevent="submit">
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
              min="1"
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
          <div class="form-group mx-sm-3 mt-4">
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
          <input type="file" class="form-control-file" id="exampleFormControlFile1" />
        </div>
        <div class="w-100">
          <button type="submit" class="btn btn-success float-right">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "ProductsNew",
  data() {
    return {
      product: {
        name: "",
        description: "",
        units: 1,
        weight: 0.01,
        price: 0.01
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
    ...mapActions(["addProduct"]),
    validate() {
      this.error.name.status = this.product.name.trim().length < 4 ? 1 : 0;
      this.error.description.status =
        this.product.description.trim().length < 1 ? 1 : 0;
    },
    submit() {
      this.validate();
      if (this.error.name.status != 1 && this.error.description.status != 1) {
        alert(
          `${this.product.name} ${this.product.description} ${this.product.units} ${this.product.weight} ${this.product.price}`
        );
        this.addProduct(this.product).then(() =>
          this.$router.push({ name: "application.products" })
        );
      }
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