<template>
  <div>
    <div class="interier-wrapper" :style="sliderStyle">
      <div class="container">
        <div class="interier-content">
          <swiper
            class="interier-slider"
            :slides-per-view="3"
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
                  <p></p>
                  <div>
                    <p></p>
                    <a href=""></a>
                  </div>
                </div>
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import mainBg from "@/assets/images/main.png";
import { Swiper, SwiperSlide } from "swiper/vue";

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
  width: 100%;
  height: 1000px;
  box-shadow: inset 0 12px 33px 0 rgba(0, 0, 0, 0.14);
  background: rgb(255, 230, 196);
  overflow: hidden;
  padding: 50px 0;
}

.interier-slider {
  width: 100%;
  height: 100%;
}

.interier-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.interier-slide img {
  width: 100%;
  height: 100%;
  border-radius: 20px;
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
</style>
