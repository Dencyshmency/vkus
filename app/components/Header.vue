<template>
  <header>
    <div class="container">
      <div class="header-wrapper">
        <a href="/">
          <img :src="logo" alt="Logo" class="logo-header" />
        </a>
        <button class="menu-btn">
          <span></span>
        </button>
      </div>
    </div>
  </header>
</template>
<script setup>
import logo from "@/assets/images/logo.png";
</script>

<style>
:root {
  --curent-size: 1440;
}

header {
  position: absolute;
  top: calc((60 / var(--curent-size)) * 100vw);
  left: 0;
  width: 100%;
  z-index: 9999;
}

.container {
  margin: 0 auto;
  width: calc((1300 / var(--curent-size)) * 100vw);
}

.header-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  position: relative;
  z-index: 999999999999;
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

.logo-header {
  width: calc((90 / var(--curent-size)) * 100vw);
  height: calc((90 / var(--curent-size)) * 100vw);
}
</style>
