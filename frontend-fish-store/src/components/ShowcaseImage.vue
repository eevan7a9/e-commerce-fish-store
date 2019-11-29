<template>
  <header class="masterhead">
    <div class="container h-100">
      <div class="row h-100 align-items-center">
        <div class="col-sm-6 text-white py-5">
          <div class="showcase-header-bg">
            <h1 class="font-weight-light">Organic Fed Kois</h1>
            <p class="lead">We grow the Fish the way a Fish normally should.</p>
          </div>
          <div class="w-100 text-right mt-5">
            <button class="btn-shopping font-weight-bold py-2 px-3 text-uppercase pulse">Start shopping
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="27"
                  height="27"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
              </span>
            </button>
          </div>
        </div>
        <div class="col-sm-6 text-center text-white">
          <img class="rotating" src="../assets/img/koi-violet.png" alt="">
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
  height: 93vh;
  min-height: 500px;
  background: linear-gradient(0deg,rgba(15, 13, 13, 0.3),rgba(23, 19, 21, 0.3)), url("https://cdn.pixabay.com/photo/2014/04/21/11/51/koi-329076_960_720.jpg");
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
  text-shadow: 3px 3px 5px #6f1b9d, -1px -1px 5px #6f1b9d, 1px -1px 5px #413f3f,
    -1px 1px 5px #413f3f, 1px 1px 5px #413f3f;
}
.btn-shopping {
  border: 3px solid #6f1b9d;
  color: #6f1b9d;
  border-radius: 4px;
  font-size: 18px;
  font-family: "Anton", sans-serif;
  letter-spacing: 2px;
}
.btn-shopping:hover{
  color: aliceblue;
  border: 3px solid aliceblue;
  transition: 1s;
  background: #6f1b9d;
}
</style>