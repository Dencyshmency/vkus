<template>
  <header>
    <div class="container-full">
      <div class="header-wrapper">
        <a href="/" class="logo-header">
          <img :src="logo" alt="Logo" />
        </a>
        <button class="menu-btn" @click="toggleMenu">
          <span></span>
        </button>
      </div>
    </div>
  </header>

  <BurgerMenu
    ref="burgerMenuRef"
    position="right"
    :items="menuItems"
    :social-items="socialItems"
    :display-socials="true"
    :display-item-numbering="true"
    menu-button-color="#fff"
    open-menu-button-color="#fff"
    :change-menu-color-on-open="true"
    :colors="['#9EF2B2', '#27FF64']"
    logo-url="/path-to-your-logo.svg"
    accent-color="#27FF64"
    @menu-open="handleMenuOpen"
    @menu-close="handleMenuClose"
  />
</template>

<script setup>
import { ref } from "vue";
import logo from "@/assets/images/logo.png";
import BurgerMenu from "./UI/BurgerMenu.vue";

const burgerMenuRef = ref(null);

const menuItems = [
  { label: "Главная", ariaLabel: "Go to home page", link: "/" },
  { label: "О нас", ariaLabel: "Learn about us", link: "/about" },
  { label: "Вакансии", ariaLabel: "View our services", link: "/services" },
  { label: "Меню", ariaLabel: "Get in touch", link: "/contact" },
];

// const socialItems = [
//   { label: "", link: "https://twitter.com" },
//   { label: "", link: "https://github.com" },
//   { label: "", link: "https://linkedin.com" },
// ];

const handleMenuOpen = () => console.log("Menu opened");
const handleMenuClose = () => console.log("Menu closed");

// Функция для переключения меню
const toggleMenu = () => {
  if (burgerMenuRef.value) {
    burgerMenuRef.value.toggleMenuFromOutside();
  }
};
</script>

<style>
:root {
  --curent-size: 1440;
}

header {
  position: fixed;
  top: calc((10 / var(--curent-size)) * 100vw);
  left: 0;
  width: 100%;
  z-index: 99999;
  pointer-events: none;
}

.container {
  margin: 0 auto;
  width: calc((1300 / var(--curent-size)) * 100vw);
}

.container-full {
  margin: 0 auto;
  width: calc((1380 / var(--curent-size)) * 100vw);
}

.header-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  position: relative;
  z-index: 9;
}

.menu-btn {
  width: calc((70 / var(--curent-size)) * 100vw);
  height: calc((70 / var(--curent-size)) * 100vw);
  box-shadow: inset -2px 1px 10px -4px rgba(0, 0, 0, 0.25),
    -2px 3px 10px -4px rgba(0, 0, 0, 0.25);
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  backdrop-filter: blur(1px);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  outline: none;
  border: 1px solid #ffffff9a;
  pointer-events: visiblePainted;
  position: relative;
}

.menu-btn span {
  width: calc((30 / var(--curent-size)) * 100vw);
  height: calc((3 / var(--curent-size)) * 100vw);
  border-radius: 200px;
  background: #000;
  position: relative;
}

.menu-btn span:after {
  content: "";
  position: absolute;
  bottom: calc((-6 / var(--curent-size)) * 100vw);
  left: 0;
  width: 100%;
  height: calc((3 / var(--curent-size)) * 100vw);
  background: #000;
}

.menu-btn span:before {
  content: "";
  position: absolute;
  top: calc((-6 / var(--curent-size)) * 100vw);
  left: 0;
  width: 100%;
  height: calc((3 / var(--curent-size)) * 100vw);
  background: #000;
}

.logo-header img {
  pointer-events: visiblePainted;
}

.logo-header img {
  width: calc((90 / var(--curent-size)) * 100vw);
  height: calc((90 / var(--curent-size)) * 100vw);
}
</style>
