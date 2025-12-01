<template>
  <div>
    <div class="about-wrapper" :style="sliderStyle" ref="aboutWrapper">
      <div class="container">
        <div class="about-items" ref="aboutItems">
          <div
            class="about-item"
            v-for="(item, index) in CardData"
            :key="item.id || index"
            @click="openPopup(item)"
          >
            <div>
              <span>{{ item.number }}</span>
              <p></p>
            </div>
            <p>{{ item.text }}</p>
          </div>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <div v-if="showPopup" class="popup-overlay" @click="closePopup">
        <div class="popup-content" @click.stop>
          <button class="popup-close" @click="closePopup">&times;</button>
          <h2>{{ selectedTitle }}</h2>
          <p class="popup-description">{{ selectedDescription }}</p>
          <p class="popup-for">{{ selectedFor }}</p>
          <button class="popup-button" @click="closePopup">Закрыть</button>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import mainBg from "@/assets/images/main.png";

const CardData = [
  {
    id: "01",
    number: "(01)",
    text: "Кондитерское производство с ежедневной свежей выпечкой, десертами, круассанами и авторскими изделиями.",
    description:
      " Наша кондитерская — это цех, где ежедневно создаются десерты, выпечка и изделия ручной работы из натуральных ингредиентов. Тут мы делаем торты, пирожные, пироги, круассаны и сезонные линейки. Это место, где нет химии, заменителей или масс-маркет-подхода: всё собирается вручную и готовится в день продажи.",
    for: "Для гостей, которые хотят натуральные десерты к чаю, наборы к празднику и свежеиспечённую выпечку.",
  },
  {
    id: "02",
    number: "(02)",
    text: "Выездные сладкие столы, фуршеты, корпоративы и обслуживание мероприятий",
    description:
      "Мы закрываем потребности в выездном обслуживании: готовим еду, десерты, закуски и сервируем их на вашем мероприятии. Подходит для семейных встреч, свадеб, праздников, корпоративов и деловых событий. Работаем в формате фуршета, кофе-поинта, сладкого стола или полного меню под вашу задачу.",
    for: "Для тех, кто ищет надёжный выездной сервис с понятной едой и красивой подачей.",
  },
  {
    id: "03",
    number: "(03)",
    text: " Торты под индивидуальный запрос — вкус, размер и оформление по вашему желанию.",
    description:
      "Мы создаём торты на дни рождения, свадьбы, детские праздники и любые события. Возможность выбрать вкус, начинку, оформление, уровень сложности. Все торты собираются вручную только из натуральных ингредиентов. Формы — от классики до персональных концепций.",
    for: "Для тех, кому нужен красивый и вкусный торт под мероприятие.",
  },
  {
    id: "04",
    number: "(04)",
    text: " Пространство для завтраков, обедов, ужинов, встреч и семейного отдыха.",
    description:
      "Ресторан — это место, где мы готовим блюда из-под ножа, проводим завтраки, обеды и ужины. Здесь есть горячие блюда, салаты, напитки, десерты и кондитерские изделия. Подходит для встреч с друзьями, семейных выходных и спокойных вечерних ужинов.",
    for: "Для гостей, которые ценят понятную еду, уют и атмосферу.",
  },
];

gsap.registerPlugin(ScrollTrigger);

const sliderStyle = {
  backgroundImage: `url(${mainBg})`,
};

const showPopup = ref(false);
const selectedTitle = ref("");
const selectedDescription = ref("");
const selectedFor = ref("");

const openPopup = (item) => {
  selectedTitle.value = item.number;
  selectedDescription.value = item.description;
  selectedFor.value = item.for;
  showPopup.value = true;

  gsap.fromTo(
    ".popup-content",
    { scale: 0.8, opacity: 0, y: 50 },
    { scale: 1, opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
  );
};

const closePopup = () => {
  gsap.to(".popup-content", {
    scale: 0.8,
    opacity: 0,
    y: 50,
    duration: 0.2,
    ease: "power2.in",
    onComplete: () => {
      showPopup.value = false;
    },
  });
};

const aboutItems = ref(null);
const aboutWrapper = ref(null);

onMounted(() => {
  setTimeout(() => {
    ScrollTrigger.refresh();

    gsap.set(".about-item", { opacity: 0, y: 150 });

    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: aboutItems.value,
        start: "top 10%",
        end: "+=200%",
        scrub: true,
        pin: aboutWrapper.value,
        pinSpacing: true,
        anticipatePin: 1,
      },
    });

    tl.to(".about-item:nth-child(1)", {
      duration: 1,
      opacity: 1,
      y: 0,
      ease: "none",
    })
      .to(".about-item:nth-child(2)", {
        duration: 1,
        opacity: 1,
        y: 30,
        ease: "none",
      })
      .to(".about-item:nth-child(3)", {
        duration: 1,
        opacity: 1,
        y: 0,
        ease: "none",
      })
      .to(".about-item:nth-child(4)", {
        duration: 1,
        opacity: 1,
        y: 30,
        ease: "none",
      });
  }, 100);
});
</script>

<style>
.about-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  padding: 200px 0;
  position: relative;
  overflow: hidden;
}

.about-items {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.about-items > div {
  background: #ffffff53;
}

.about-item {
  width: 500px;
  height: 500px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(4px);
  background: #ffffff4e;
  border-radius: 10px;
  display: flex;
  padding: 30px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.about-item:hover {
  transform: scale(1.02);
}

.about-item:nth-child(1) {
  transform: rotate(-4deg);
}

.about-item:nth-child(2) {
  transform: rotate(3deg);
}

.about-item:nth-child(3) {
  transform: rotate(-2deg);
}

.about-item:nth-child(4) {
  transform: rotate(4deg);
}

.about-item > p {
  font-family: "Arial", sans-serif;
  font-weight: 700;
  font-size: 26px;
  line-height: 110%;
  letter-spacing: -0.03em;
  color: #272525;
  text-align: center;
}

.about-item > div span {
  font-family: "Arial", sans-serif;
  font-weight: 700;
  font-size: 26px;
  line-height: 110%;
  letter-spacing: -0.03em;
  color: #272525;
  text-align: center;
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(4px);
}

.popup-content {
  background: #ffdd6d4e;
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 10px;
  padding: 40px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.popup-close {
  position: absolute;
  top: 10px;
  right: 15px;
  background: none;
  border: none;
  font-size: 24px;
  color: #272525;
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup-content h2 {
  font-family: "Arial", sans-serif;
  font-weight: 700;
  font-size: 28px;
  color: #272525;
  margin-bottom: 20px;
  text-align: center;
}

.popup-description {
  font-family: "Arial", sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 150%;
  color: #272525;
  margin-bottom: 20px;
  text-align: center;
}

.popup-for {
  font-family: "Arial", sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 140%;
  color: #272525;
  margin-bottom: 30px;
  text-align: center;
  font-style: italic;
}

.popup-button {
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 5px;
  padding: 12px 24px;
  color: #272525;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  transition: background 0.2s ease;
}

.popup-button:hover {
  background: rgba(255, 255, 255, 0.8);
}
</style>
