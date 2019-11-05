<template>
  <header class="masterhead">
    <div class="container h-100">
      <div class="row h-100 align-items-center">
        <div class="col-12 text-center showcase-header-bg text-white">
          <h1 class="font-weight-light">Organic Fed Fish</h1>
          <p class="lead">We grow the kois the way a koi normally should.</p>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "ShowcaseImage"
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Anton&display=swap");
.masterhead {
  height: 60vh;
  min-height: 500px;
  background-image: url("https://cdn.pixabay.com/photo/2014/04/21/11/51/koi-329076_960_720.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.showcase-header-bg {
  background: #0000003b;
  padding: 10px 15px;
}
.masterhead h1 {
  font-family: "Anton", sans-serif;
  letter-spacing: 2px;
  text-shadow: 3px 3px 5px #050505, -1px -1px 5px #413f3f, 1px -1px 5px #413f3f,
    -1px 1px 5px #413f3f, 1px 1px 5px #413f3f;
}
</style>