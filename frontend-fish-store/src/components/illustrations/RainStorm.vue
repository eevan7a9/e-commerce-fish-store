<script setup lang="ts">
defineOptions({
  name: 'RainStorm',
});
const droplets = Array.from({ length: 50 }, () => ({
  x: Math.floor(Math.random() * 100),
  o: Math.random() * 0.7 + 0.3, // Opacity between 0.3 and 1 for variation
  s: Math.random() * 1.2 + 0.4, // Scale for stretch effect
  size: Math.random() * 20 + 10, // Size variation
  duration: `${Math.random() * 2 + 2}s`, // Between 2s and 4s
  delay: `${Math.random() * 5}s`, // Up to 5s delay for staggered effect
}));
</script>

<template>
  <div class="rain">
    <svg
      v-for="(drop, index) in droplets"
      :key="index"
      class="rain__drop"
      :style="{
        '--x': drop.x,
        '--o': drop.o,
        '--s': drop.s,
        '--size': `${drop.size}px`,
        '--duration': drop.duration,
        '--delay': drop.delay,
      }"
      preserveAspectRatio="xMinYMin"
      viewBox="0 0 5 50"
    >
      <path
        stroke="none"
        d="M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"
      />
    </svg>
  </div>
</template>
<style lang="scss" scoped>
.rain {
  position: absolute;
  overflow: hidden;
  height: 100%;
  width: 100%;
}
// Rain starts Here
.rain__drop {
  position: absolute;
  height: calc(10px + var(--size, 20px)); // Randomize droplet size
  left: calc(var(--x) * 1%);
  transform: translateY(-50px);
  animation: drop var(--duration, 3s) linear var(--delay, 0s) infinite;

  path {
    fill: #a1c6cc;
    opacity: var(--o);
    transform: scaleY(calc(var(--s) * 1.5));
  }
}

@keyframes drop {
  0% {
    opacity: var(--o);
    transform: translateY(-50px) scaleY(calc(var(--s) * 1.5));
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(100vh) scaleY(calc(var(--s) * 1.5));
  }
}
</style>
