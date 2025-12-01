<template>
  <div id="smooth-wrapper">
    <div id="smooth-content">
      <div class="layout">
        <Header />
        <main class="main-content">
          <slot />
        </main>
        <Footer />
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
import { onMounted, onUnmounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

if (process.client) {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
}

let smoothy = null;

onMounted(() => {
  if (process.client) {
    smoothy = ScrollSmoother.create({
      smooth: 1,
      effects: true,
      normalizeScroll: true,
      ignoreMobileResize: true,
    });
  }
});

onUnmounted(() => {
  if (smoothy) {
    smoothy.kill();
  }

  ScrollTrigger.getAll().forEach((t) => t.kill());
});

const nuxtApp = useNuxtApp();
nuxtApp.hook("page:finish", () => {
  if (smoothy) {
    smoothy.refresh();
  }
  ScrollTrigger.refresh();
});
</script>

<style>
#smooth-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
