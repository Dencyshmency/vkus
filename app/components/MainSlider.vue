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

        <div class="main-btns">
          <a href="" class="buy-btn"><img :src="link" /></a>
          <a href="" class="call-btn">
            <svg
              width="36"
              height="39"
              viewBox="0 0 36 39"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M33 27.495V32.37C33.0017 32.8225 32.9161 33.2705 32.7488 33.6852C32.5814 34.0998 32.336 34.4721 32.0281 34.778C31.7203 35.084 31.3569 35.3169 30.9611 35.4619C30.5654 35.6069 30.1461 35.6607 29.73 35.62C25.1143 35.0766 20.6805 33.368 16.785 30.6312C13.1607 28.1363 10.088 24.8075 7.78501 20.8812C5.24997 16.6419 3.67237 11.8153 3.18001 6.79247C3.14252 6.34311 3.19182 5.89021 3.32476 5.46261C3.4577 5.03502 3.67136 4.64209 3.95216 4.30886C4.23295 3.97562 4.57471 3.70938 4.95569 3.52707C5.33667 3.34477 5.74852 3.2504 6.16501 3.24997H10.665C11.393 3.24221 12.0987 3.52148 12.6506 4.03572C13.2026 4.54995 13.5631 5.26408 13.665 6.04497C13.8549 7.60508 14.2072 9.13691 14.715 10.6112C14.9168 11.1929 14.9605 11.825 14.8409 12.4327C14.7212 13.0403 14.4433 13.5982 14.04 14.04L12.135 16.1037C14.2703 20.172 17.3797 23.5404 21.135 25.8537L23.04 23.79C23.4478 23.3531 23.9627 23.052 24.5237 22.9224C25.0846 22.7928 25.6681 22.8401 26.205 23.0587C27.5659 23.6089 28.9799 23.9905 30.42 24.1962C31.1487 24.3076 31.8141 24.7052 32.2898 25.3134C32.7655 25.9216 33.0183 26.698 33 27.495Z"
                stroke="#272525"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </a>
        </div>
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
import link from "@/assets/images/link.svg";
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
  }, 500);

  setTimeout(() => {
    showThirdText.value = true;
  }, 1300);

  setTimeout(() => {
    showFourthText.value = true;
  }, 2100);

  setTimeout(() => {
    showFifthText.value = true;
  }, 2900);

  setTimeout(() => {
    showSixthText.value = true;
  }, 3700);
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

.main-btns {
  position: absolute;
  bottom: -90px;
  right: 140px;
  width: 197px;
  height: 55px;
  box-shadow: inset 0 4px 16px -8px rgba(0, 0, 0, 0.25),
    -2px 3px 11px -4px rgba(0, 0, 0, 0.25);
  background: rgba(255, 255, 255, 0.05);
  border-radius: 35px;
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.call-btn {
  width: 95px;
  height: 100%;
  border-radius: 35px;
  box-shadow: inset 0 4px 16px -8px rgba(0, 0, 0, 0.25),
    -2px 3px 11px -4px rgba(0, 0, 0, 0.25);
  background: rgba(255, 255, 255, 0.05);
  border-radius: 35px;
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ffffff9a;
}

.call-btn svg {
  width: 36px;
  height: 39px;
}

.buy-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 95px;
  height: 100%;
  border-radius: 35px;
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
  color: #c2c2c2;
  font-family: "Arial", sans-serif;
}
</style>
