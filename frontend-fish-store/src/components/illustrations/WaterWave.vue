<script setup lang="ts">
defineOptions({
  name: 'WaterWave',
});
</script>

<template>
  <div class="tw-absolute tw-w-full tw-bottom-0">
    <svg
      class="waves"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 24 150 28"
      preserveAspectRatio="none"
      shape-rendering="auto"
    >
      <defs>
        <path
          id="eevan7a9"
          d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
        />
      </defs>
      <g class="parallax">
        <use xlink:href="#eevan7a9" x="48" y="0" fill="#70bdddcc" />
        <use xlink:href="#eevan7a9" x="48" y="3" fill="#8ba7df" />
        <use xlink:href="#eevan7a9" x="48" y="5" fill="rgba(255,255,255,0.3)" />
        <use xlink:href="#eevan7a9" x="48" y="7" fill="#99b9f7" />
      </g>
    </svg>
  </div>
</template>

<style lang="scss" scoped>
.waves {
  position: relative;
  width: 100%;
  height: 15vh;
  margin-bottom: -7px;
  min-height: 100px;
  max-height: 150px;
}

.parallax {
  > use {
    animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;

    &:nth-child(1) {
      animation-delay: -2s;
      animation-duration: 7s;
    }
    &:nth-child(2) {
      animation-delay: -3s;
      animation-duration: 10s;
    }
    &:nth-child(3) {
      animation-delay: -4s;
      animation-duration: 13s;
    }
    &:nth-child(4) {
      animation-delay: -5s;
      animation-duration: 20s;
    }
  }
}

@keyframes move-forever {
  0% {
    transform: translate3d(-90px, 0, 0);
  }
  100% {
    transform: translate3d(85px, 0, 0);
  }
}
</style>
