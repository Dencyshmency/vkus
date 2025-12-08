<template>
  <div class="main-slider-wrapper">
    <div class="main-slider" :style="sliderStyle">
      <swiper
        class="main-sliders"
        :slides-per-view="1"
        :space-between="50"
        :direction="'vertical'"
        :loop="'true'"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
      >
        <swiper-slide v-for="(image, index) in sliderImages" :key="index">
          <div class="main-slide-content">
            <img :src="image.img" :alt="image.alt" class="slide-image" />
          </div>
        </swiper-slide>
      </swiper>
      <div class="main-text">
        <BlurText
          v-if="!preloader && isVisible"
          :delay="200"
          text="Вы"
          class-name="text-2xl font-semibold text-center"
          animate-by="words"
          direction="top"
          :threshold="0.1"
          root-margin="0px"
          :step-duration="0.35"
        ></BlurText>

        <BlurText
          v-if="showSecondText"
          :delay="200"
          text="скорее всего"
          class-name="text-2xl font-semibold text-center"
          animate-by="words"
          direction="top"
          :threshold="0.1"
          root-margin="0px"
          :step-duration="0.35"
        ></BlurText>

        <BlurText
          v-if="showThirdText"
          :delay="200"
          text=" уже с нами"
          class-name="text-2xl font-semibold text-center"
          animate-by="words"
          direction="top"
          :threshold="0.1"
          root-margin="0px"
          :step-duration="0.35"
        ></BlurText>

        <BlurText
          v-if="showFourthText"
          :delay="200"
          text="уже с нами знакомы потому "
          class-name="text-2xl font-semibold text-center"
          animate-by="words"
          direction="top"
          :threshold="0.1"
          root-margin="0px"
          :step-duration="0.35"
        ></BlurText>

        <BlurText
          v-if="showFifthText"
          :delay="200"
          text="давайте"
          class-name="text-2xl font-semibold text-center"
          animate-by="words"
          direction="top"
          :threshold="0.1"
          root-margin="0px"
          :step-duration="0.35"
        ></BlurText>

        <BlurText
          v-if="showSixthText"
          :delay="200"
          text="будем кратки."
          class-name="text-2xl font-semibold text-center"
          animate-by="words"
          direction="top"
          :threshold="0.1"
          root-margin="0px"
          :step-duration="0.35"
        ></BlurText>
      </div>
      <p class="current-slide-name">{{ currentSlideText }}</p>
      <p class="current-slide">{{ curentSlide }}</p>
    </div>
  </div>
</template>

<script setup>
import BlurText from "~/components/UI/BlurText.vue";

import mainBg from "@/assets/images/main.png";
import slideImage1 from "@/assets/images/slide.png";

import { Swiper, SwiperSlide } from "swiper/vue";
import { ref, watch, inject } from "vue";
import "swiper/css";

const preloader = inject("preloader");
const isVisible = ref(false);

const showSecondText = ref(false);
const showThirdText = ref(false);
const showFourthText = ref(false);
const showFifthText = ref(false);
const showSixthText = ref(false);

watch(preloader, (newValue) => {
  if (!newValue) {
    setTimeout(() => {
      isVisible.value = true;

      startTextAnimationChain();
    }, 100);
  }
});

const startTextAnimationChain = () => {
  setTimeout(() => {
    showSecondText.value = true;
  }, 300);

  setTimeout(() => {
    showThirdText.value = true;
  }, 600);

  setTimeout(() => {
    showFourthText.value = true;
  }, 900);

  setTimeout(() => {
    showFifthText.value = true;
  }, 1500);

  setTimeout(() => {
    showSixthText.value = true;
  }, 1800);
};

const sliderStyle = {
  backgroundImage: `url(${mainBg})`,
};

const onSlideChange = (index) => {
  curentSlide.value = `0${index.realIndex + 1}`;
  currentSlideText.value = sliderImages[index.realIndex].alt;
};

const sliderImages = [{ img: slideImage1, alt: "круасан" }];

const curentSlide = ref("01");
const currentSlideText = ref("Круассан");
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.main-slider-wrapper {
  width: 100%;
  height: 100%;
}

.main-slider {
  width: 100%;
  height: 1080px;
  background-size: cover;
  background-repeat: no-repeat;
  overflow: hidden;
  position: relative;
}

.main-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: absolute;
  right: 100px;
  top: 380px;
  width: 639px;
  transition: all 0.3s ease;
}

.main-text p div {
  font-family: "Arial", sans-serif;
  font-weight: 700;
  font-size: 72px;
  line-height: 83%;
  letter-spacing: -0.03em;
  color: #272525;
  opacity: 0;
  transform: translateY(10px);
  animation: fadeInUp 0.5s ease forwards;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.main-text p:nth-child(1) div:first-child {
  text-indent: 190px;
}
.main-text p:nth-child(2) div:first-child {
  text-indent: 80px;
}
.main-text p:nth-child(3) div:first-child {
  text-indent: 20px;
}
.main-text p:nth-child(4) div:first-child {
  text-indent: 0;
}
.main-text p:nth-child(5) div:first-child {
  text-indent: 0;
}
.main-text p:nth-child(6) div:first-child {
  text-indent: 100px;
}

.main-text p:nth-child(3) div:nth-child(3) {
  color: #ff6905;
}

.main-text p:nth-child(5) div {
  color: #ff6905;
}

.swiper {
  width: 100%;
  height: 100%;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.main-sliders {
  width: 100%;
  height: 100%;
  margin-top: auto;
}

.slide-image {
  animation: floating 10s linear infinite;
}

@keyframes floating {
  0% {
    transform: translate(0, 0px) rotate(0deg);
  }
  25% {
    transform: translate(-2px, -8px) rotate(-1deg);
  }
  50% {
    transform: translate(0, -15px) rotate(0deg);
  }
  75% {
    transform: translate(2px, -8px) rotate(1deg);
  }
  100% {
    transform: translate(0, 0px) rotate(0deg);
  }
}

.main-slide-content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.current-slide-name {
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  left: 14%;
  font-weight: 700;
  font-size: 128px;
  line-height: 26%;
  letter-spacing: -0.05em;
  writing-mode: vertical-lr;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  color: #c2c2c2;
  font-family: "Arial", sans-serif;
}

.current-slide {
  position: absolute;
  top: 30%;
  right: -1%;
  font-weight: 900;
  font-size: 128px;
  line-height: 26%;
  letter-spacing: -0.05em;
  color: #ff6905;
  font-family: "Arial", sans-serif;
}
</style>
