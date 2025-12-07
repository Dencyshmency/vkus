<template>
  <MainSlider />
  <Interier />
  <About />
</template>

<script setup>
import MainSlider from "~/components/MainSlider.vue";
import Interier from "~/components/Interier.vue";
import About from "~/components/About.vue";

definePageMeta({
  layout: "layout",
});
</script>

<style></style>
