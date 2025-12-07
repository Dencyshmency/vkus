<template>
  <Header />
  <div id="smooth-wrapper">
    <div id="smooth-content">
      <div class="layout">
        <main class="main-content">
          <slot />
        </main>
        <Footer />
      </div>
    </div>
  </div>
  <div v-if="showPreloader" class="preloader-wrapper">
    <Preloader
      :from="0"
      :to="100"
      :duration="2"
      separator=","
      className="countup-text"
      @on-start="handleStart"
      @on-end="handleEnd"
    />
  </div>
</template>

<script setup lang="js">
import { onMounted, onUnmounted, ref, provide} from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import Preloader from "~/components/UI/Preloader.vue";


const showPreloader = ref(true);
provide('preloader', showPreloader)
const handleStart = () => {};

const handleEnd = () => {
  showPreloader.value = false;
};

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

.preloader-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999999999999999999999999999999;
  background: rgb(255, 230, 196);
}

.countup-text {
  font-family: "Arial", sans-serif;
  font-weight: 700;
  font-size: 72px;
  line-height: 83%;
  letter-spacing: -0.03em;
  color: #2b2b2b;
}
</style>
