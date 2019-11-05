<template>
  <div class="about">
    <h1>This is an about page {{ user }}</h1>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: mapGetters(["user"])
};
</script>