<template>
  <div>
    <div class="interier-wrapper" :style="sliderStyle">
      <div class="container">
        <div class="interier-content">
          <swiper
            class="interier-slider"
            :slides-per-view="1"
            :space-between="10"
            :direction="'horizontal'"
            :loop="true"
            :centered-slides="true"
            :initial-slide="2"
            :modules="modules"
            :effect="'coverflow'"
            :coverflow-effect="coverflowEffect"
            :observer="true"
            :observe-parents="true"
            @swiper="onSwiper"
            @init="onSwiperInit"
          >
            <swiper-slide v-for="(image, index) in interImgs" :key="index">
              <div class="interier-slide">
                <img :src="image.img" :alt="image.alt" />
                <div class="interier-slide-data">
                  <p>ул.Советской армии 177</p>
                  <div>
                    <p>
                      Пространство которое идеально подойдет для больших
                      компаний и семейных посиделок вблизи парка Гагарина.
                    </p>
                    <a href="">
                      <svg
                        width="36"
                        height="39"
                        viewBox="0 0 36 39"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M33 27.495V32.37C33.0017 32.8226 32.9161 33.2706 32.7488 33.6852C32.5814 34.0999 32.336 34.4721 32.0281 34.7781C31.7203 35.084 31.3569 35.3169 30.9611 35.4619C30.5654 35.6069 30.1461 35.6608 29.73 35.62C25.1143 35.0767 20.6805 33.368 16.785 30.6313C13.1608 28.1364 10.088 24.8076 7.78502 20.8813C5.24999 16.642 3.67239 11.8154 3.18002 6.79253C3.14254 6.34317 3.19183 5.89027 3.32477 5.46267C3.45771 5.03508 3.67138 4.64216 3.95217 4.30892C4.23296 3.97568 4.57473 3.70944 4.95571 3.52713C5.33669 3.34483 5.74853 3.25046 6.16502 3.25004H10.665C11.393 3.24227 12.0987 3.52154 12.6507 4.03578C13.2026 4.55001 13.5631 5.26414 13.665 6.04503C13.855 7.60514 14.2072 9.13697 14.715 10.6113C14.9168 11.1929 14.9605 11.825 14.8409 12.4327C14.7212 13.0404 14.4433 13.5982 14.04 14.04L12.135 16.1038C14.2704 20.172 17.3797 23.5405 21.135 25.8538L23.04 23.79C23.4479 23.3531 23.9627 23.052 24.5237 22.9224C25.0846 22.7928 25.6681 22.8401 26.205 23.0588C27.5659 23.6089 28.9799 23.9905 30.42 24.1963C31.1487 24.3076 31.8141 24.7052 32.2898 25.3135C32.7655 25.9217 33.0183 26.6981 33 27.495Z"
                          stroke="#FF6905"
                          stroke-width="4"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </swiper-slide>
          </swiper>
          <button class="btn-more">
            <ClientOnly>
              <GlassSurface
                :width="'100%'"
                :height="'100%'"
                :displace="2"
                :borderWidth="0.01"
                :saturation="1"
                :distortionScale="-100"
                class="glass-btn"
              />
            </ClientOnly>
            <p>Подробней</p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import mainBg from "@/assets/images/main.png";
import { Swiper, SwiperSlide } from "swiper/vue";
import GlassSurface from "~/components/UI/GlassSurface.vue";
import { EffectCoverflow } from "swiper/modules";

import interSlide from "@/assets/images/is.png";

const interImgs = [
  { img: interSlide, alt: "Помещение" },
  { img: interSlide, alt: "Помещение" },
  { img: interSlide, alt: "Помещение" },
  { img: interSlide, alt: "Помещение" },
  { img: interSlide, alt: "Помещение" },
  { img: interSlide, alt: "Помещение" },
];

const sliderStyle = {
  backgroundImage: `url(${mainBg})`,
};

const coverflowEffect = {
  rotate: 10,
  stretch: 0,
  depth: 100,
  modifier: 4,
  slideShadows: true,
};

const modules = [EffectCoverflow];
const swiperInstance = ref(null);

// const onSwiper = (swiper) => {
//   swiperInstance.value = swiper;
// };

// const onSwiperInit = (swiper) => {
//   // Принудительное обновление после инициализации
//   setTimeout(() => {
//     swiper.update();
//     swiper.slideTo(2, 0);
//   }, 50);
// };
</script>

<style>
.interier-content {
  border: 0.5px solid rgba(0, 0, 0, 0.2);
  border-radius: 100px;
  width: 80%;
  height: 800px;
  box-shadow: inset 0 12px 33px 0 rgba(0, 0, 0, 0.14);
  background: rgb(255, 230, 196);
  overflow: hidden;
  padding: 50px 0;
  margin: 0 auto;
  position: relative;
}

.interier-slider {
  width: 500px;
  height: 100%;
  overflow: visible;
}

.interier-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 50px;
}

.interier-slide:after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.276) 12%,
    rgba(0, 0, 0, 0) 100%
  );
}

.interier-slide > div {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 0 30px 50px 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
}

.interier-slide > div > p {
  color: #fff;
  font-family: "Arial", sans-serif;
  font-weight: 400;
  font-size: 28px;
  line-height: 118%;
  letter-spacing: -0.07em;
}

.interier-slide > div > div > p {
  color: #fff;
  font-family: "Arial", sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 125%;
  letter-spacing: 0.06em;
}

.interier-slide > div > div {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 30px;
}

.interier-slide > div > div a {
  box-shadow: inset 0 4px 15px -8px rgba(0, 0, 0, 0.25),
    -2px 3px 11px -4px rgba(0, 0, 0, 0.25);
  background: rgba(65, 60, 60, 0.865);
  border-radius: 35px;
  border-left: 1px solid #ffffff91;
  border-right: 1px solid #ffffff45;
  padding: 5px 33px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.interier-slide-data {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  z-index: 2;
}

.interier-slide > div > div a svg {
  width: 36px;
  height: 39px;
}

.interier-slide img {
  width: 100%;
  height: 100%;
  border-radius: 50px;
  object-fit: cover;
}

.interier-slider .swiper-slide {
  filter: grayscale(1);
  transition: 0.3s ease;
}

.interier-slider .swiper-slide-active {
  transform: scale(1.05);
  z-index: 1;
  filter: grayscale(0);
  transition: 0.3s ease;
}

.btn-more {
  position: absolute;
  bottom: 50px;
  right: 200px;
  background: initial;
  border: none;
  width: 206px !important;
  height: 55px !important;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.btn-more p {
  position: relative;
  z-index: 2;
  font-family: "Arial", sans-seri;
  font-weight: 700;
  font-size: 24px;
  line-height: 83%;
  letter-spacing: -0.04em;
  color: #ff6905;
}

.glass-btn {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  background: #7b7b7b53 !important;
  border-radius: 40px !important;
}
</style>
