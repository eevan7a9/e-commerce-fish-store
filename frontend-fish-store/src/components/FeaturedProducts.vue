<template>
  <div>
    <section class="row align-items-center m-5">
      <div class="h-400 col-12 text-center text-dark">
        <h2 class="font-weight-light featured-header text-inner-shadow-violet">Featured Products</h2>
      </div>
    </section>
    <div class="row mt-5">
      <div class="col-md-4">
        <div class="card mb-4 box-shadow">
          <img class="card-img-top" src="../assets/img/f1.jpg" alt="Card image cap" />
          <div class="card-body">
            <p
              class="card-text"
            >This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
                <button type="button" class="btn-custom-outline-violet  px-3 py-2">$30 | A piece</button>
              </div>
              <small class="text-muted">9 mins</small>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card mb-4 box-shadow">
          <img class="card-img-top" src="../assets/img/f2.jpg" alt="Card image cap" />
          <div class="card-body">
            <p
              class="card-text"
            >This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
                <button type="button" class="btn-custom-outline-violet  px-3 py-2">$30 | A piece</button>
              </div>
              <small class="text-muted">9 mins</small>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card mb-4 box-shadow">
          <img class="card-img-top" src="../assets/img/f3.jpg" alt="Card image cap" />
          <div class="card-body">
            <p
              class="card-text"
            >This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
                <button type="button" class="btn-custom-outline-violet  px-3 py-2">$30 | A piece</button>
              </div>
              <small class="text-muted">9 mins</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FeaturedProducts"
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Staatliches&display=swap");
img {
  width: 100%;
  height: 300px;
}
.featured-header {
  font-family: "Staatliches", cursive;
}
</style>