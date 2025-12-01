// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/image"],

  // Опционально: настройки изображений
  image: {
    quality: 80,
    format: ["webp", "avif", "jpg", "png"],
    provider: "ipx", // или 'cloudinary', 'imgix' и т.д.
  },

  vite: {
    optimizeDeps: {
      include: ["gsap"],
    },
  },
});
