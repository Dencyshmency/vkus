<template>
  <div class="burger-menu-wrapper">
    <aside
      id="staggered-menu-panel"
      ref="panelRef"
      class="top-0 right-0 z-10 absolute flex flex-col bg-white backdrop-blur-[12px] p-[6em_2em_2em_2em] h-full overflow-y-auto staggered-menu-panel"
      :aria-hidden="!open"
    >
      <GlassSurface
        :width="'100%'"
        :height="'100%'"
        :displace="7"
        :borderWidth="0.07"
        :saturation="1"
        :distortionScale="-180"
        class="glass-item"
      />
      <div class="flex flex-col flex-1 gap-5 sm-panel-inner">
        <ul
          class="flex flex-col gap-2 m-0 p-0 list-none sm-panel-list"
          role="list"
          :data-numbering="displayItemNumbering || undefined"
        >
          <li
            v-if="items && items.length"
            v-for="(item, idx) in items"
            :key="item.label + idx"
            class="relative overflow-hidden leading-none sm-panel-itemWrap"
          >
            <a
              class="inline-block relative pr-[1.4em] font-semibold text-[4rem] text-black no-underline uppercase leading-none tracking-[-2px] transition-[background,color] duration-150 ease-linear cursor-pointer sm-panel-item"
              :href="item.link"
              :aria-label="item.ariaLabel"
              :data-index="idx + 1"
            >
              <span
                class="inline-block will-change-transform sm-panel-itemLabel [transform-origin:50%_100%]"
              >
                {{ item.label }}
              </span>
            </a>
          </li>
          <li
            v-else
            class="relative overflow-hidden leading-none sm-panel-itemWrap"
            aria-hidden="true"
          >
            <span
              class="inline-block relative pr-[1.4em] font-semibold text-[4rem] text-black no-underline uppercase leading-none tracking-[-2px] transition-[background,color] duration-150 ease-linear cursor-pointer sm-panel-item"
            >
              <span
                class="inline-block will-change-transform sm-panel-itemLabel [transform-origin:50%_100%]"
              >
                No items
              </span>
            </span>
          </li>
        </ul>

        <div
          v-if="displaySocials && socialItems && socialItems.length > 0"
          class="flex flex-col gap-3 mt-auto pt-8 sm-socials"
          aria-label="Social links"
        >
          <h3
            class="m-0 font-medium text-base sm-socials-title [color:var(--sm-accent,#ff0000)]"
          >
            Мы в соц.сетях
          </h3>
          <ul
            class="flex flex-row flex-wrap items-center gap-4 m-0 p-0 list-none sm-socials-list"
            role="list"
          >
            <li
              v-for="(social, i) in socialItems"
              :key="social.label + i"
              class="sm-socials-item"
            >
              <a
                :href="social.link"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-block relative py-[2px] font-medium text-[#111] text-[1.2rem] no-underline transition-[color,opacity] duration-300 ease-linear sm-socials-link"
              >
                {{ social.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { gsap } from "gsap";
import GlassSurface from "./GlassSurface.vue";
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  useTemplateRef,
  watch,
} from "vue";

export interface StaggeredMenuItem {
  label: string;
  ariaLabel: string;
  link: string;
}
export interface StaggeredMenuSocialItem {
  label: string;
  link: string;
}
export interface StaggeredMenuProps {
  position?: "left" | "right";
  colors?: string[];
  items?: StaggeredMenuItem[];
  socialItems?: StaggeredMenuSocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  className?: string;
  logoUrl?: string;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  accentColor?: string;
  changeMenuColorOnOpen?: boolean;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
}

const props = withDefaults(defineProps<StaggeredMenuProps>(), {
  position: "right",
  colors: () => ["#9EF2B2", "#27FF64"],
  items: () => [],
  socialItems: () => [],
  displaySocials: true,
  displayItemNumbering: true,
  logoUrl: "/src/assets/logos/vuebits-gh-white.svg",
  menuButtonColor: "#fff",
  openMenuButtonColor: "#fff",
  changeMenuColorOnOpen: true,
  accentColor: "#27FF64",
});

const open = ref(false);
const openRef = ref(false);
const panelRef = useTemplateRef("panelRef");
const openTlRef = ref<gsap.core.Timeline | null>(null);
const closeTweenRef = ref<gsap.core.Tween | null>(null);
const busyRef = ref(false);

const openMenu = () => {
  if (!openRef.value) {
    toggleMenu();
  }
};

const closeMenu = () => {
  if (openRef.value) {
    toggleMenu();
  }
};

const toggleMenuFromOutside = () => {
  toggleMenu();
};

defineExpose({
  openMenu,
  closeMenu,
  toggleMenuFromOutside,
  isOpen: openRef,
});

let gsapContext: gsap.Context | null = null;

const initializeGSAP = () => {
  gsapContext = gsap.context(() => {
    const panel = panelRef.value;
    if (!panel) return;

    const offscreen = props.position === "left" ? -100 : 100;
    gsap.set(panel, { xPercent: offscreen });
  });
};

const buildOpenTimeline = (): gsap.core.Timeline | null => {
  const panel = panelRef.value;
  if (!panel) return null;

  openTlRef.value?.kill();
  if (closeTweenRef.value) {
    closeTweenRef.value.kill();
    closeTweenRef.value = null;
  }

  const itemEls = Array.from(
    panel.querySelectorAll(".sm-panel-itemLabel")
  ) as HTMLElement[];
  const numberEls = Array.from(
    panel.querySelectorAll(".sm-panel-list[data-numbering] .sm-panel-item")
  ) as HTMLElement[];
  const socialTitle = panel.querySelector(
    ".sm-socials-title"
  ) as HTMLElement | null;
  const socialLinks = Array.from(
    panel.querySelectorAll(".sm-socials-link")
  ) as HTMLElement[];

  const panelStart = Number(gsap.getProperty(panel, "xPercent"));

  if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
  if (numberEls.length)
    gsap.set(numberEls, {
      ["--sm-num-opacity" as keyof Record<string, number>]: 0,
    });
  if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
  if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

  const tl = gsap.timeline({ paused: true });

  const panelDuration = 0.65;
  tl.fromTo(
    panel,
    { xPercent: panelStart },
    { xPercent: 0, duration: panelDuration, ease: "power4.out" },
    0
  );

  if (itemEls.length) {
    const itemsStartRatio = 0.15;
    const itemsStart = panelDuration * itemsStartRatio;

    tl.to(
      itemEls,
      {
        yPercent: 0,
        rotate: 0,
        duration: 1,
        ease: "power4.out",
        stagger: { each: 0.1, from: "start" },
      },
      itemsStart
    );

    if (numberEls.length) {
      tl.to(
        numberEls,
        {
          duration: 0.6,
          ease: "power2.out",
          ["--sm-num-opacity" as keyof Record<string, number>]: 1,
          stagger: { each: 0.08, from: "start" },
        },
        itemsStart + 0.1
      );
    }
  }

  if (socialTitle || socialLinks.length) {
    const socialsStart = panelDuration * 0.4;

    if (socialTitle)
      tl.to(
        socialTitle,
        { opacity: 1, duration: 0.5, ease: "power2.out" },
        socialsStart
      );
    if (socialLinks.length) {
      tl.to(
        socialLinks,
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          ease: "power3.out",
          stagger: { each: 0.08, from: "start" },
          onComplete: () => {
            gsap.set(socialLinks, { clearProps: "opacity" });
          },
        },
        socialsStart + 0.04
      );
    }
  }

  openTlRef.value = tl;
  return tl;
};

const playOpen = () => {
  if (busyRef.value) return;
  busyRef.value = true;
  const tl = buildOpenTimeline();
  if (tl) {
    tl.eventCallback("onComplete", () => {
      busyRef.value = false;
    });
    tl.play(0);
  } else {
    busyRef.value = false;
  }
};

const playClose = () => {
  openTlRef.value?.kill();
  openTlRef.value = null;

  const panel = panelRef.value;
  if (!panel) return;

  closeTweenRef.value?.kill();

  const offscreen = props.position === "left" ? -100 : 100;

  closeTweenRef.value = gsap.to(panel, {
    xPercent: offscreen,
    duration: 0.32,
    ease: "power3.in",
    overwrite: "auto",
    onComplete: () => {
      const itemEls = Array.from(
        panel.querySelectorAll(".sm-panel-itemLabel")
      ) as HTMLElement[];
      if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });

      const numberEls = Array.from(
        panel.querySelectorAll(".sm-panel-list[data-numbering] .sm-panel-item")
      ) as HTMLElement[];
      if (numberEls.length)
        gsap.set(numberEls, {
          ["--sm-num-opacity" as keyof Record<string, number>]: 0,
        });

      const socialTitle = panel.querySelector(
        ".sm-socials-title"
      ) as HTMLElement | null;
      const socialLinks = Array.from(
        panel.querySelectorAll(".sm-socials-link")
      ) as HTMLElement[];
      if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
      if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

      busyRef.value = false;
    },
  });
};

const toggleMenu = () => {
  const target = !openRef.value;
  openRef.value = target;
  open.value = target;

  if (target) {
    props.onMenuOpen?.();
    playOpen();
  } else {
    props.onMenuClose?.();
    playClose();
  }
};

onMounted(() => {
  nextTick(() => {
    initializeGSAP();
  });
});

onBeforeUnmount(() => {
  openTlRef.value?.kill();
  closeTweenRef.value?.kill();
  if (gsapContext) {
    gsapContext.revert();
  }
});
</script>

<style scoped>
.staggered-menu-panel {
  position: absolute;
  top: 0;
  right: 0;
  width: clamp(260px, 38vw, 420px);
  height: 100%;
  box-shadow: inset -2px 1px 10px -4px rgba(0, 0, 0, 0.25),
    -2px 3px 10px -4px rgba(0, 0, 0, 0.25);
  background: rgba(255, 255, 255, 0.2);
  /* backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px); */
  display: flex;
  flex-direction: column;
  padding: 10em 2em 2em 2em;
  overflow-y: auto;
  z-index: 10;
  border-radius: 20px;
}

[data-position="left"] .staggered-menu-panel {
  right: auto;
  left: 0;
}

.sm-panel-inner {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.sm-panel-list[data-numbering][data-v-400913b6] li {
  overflow: hidden;
  font-family: "Arial", sans-serif;
  font-weight: 700;
  font-size: 72px;
  line-height: 83%;
  letter-spacing: -0.03em;
  color: #272525;
  text-transform: capitalize;
}

.sm-socials {
  margin-top: auto;
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.sm-socials-title {
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
  color: var(--sm-accent, #ff0000);
}

.sm-socials-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.sm-socials-list .sm-socials-link {
  opacity: 1;
  transition: opacity 0.3s ease;
}

.sm-socials-list:hover .sm-socials-link:not(:hover) {
  opacity: 0.35;
}

.sm-socials-list:focus-within .sm-socials-link:not(:focus-visible) {
  opacity: 0.35;
}

.sm-socials-list .sm-socials-link:hover,
.sm-socials-list .sm-socials-link:focus-visible {
  opacity: 1;
}

.sm-socials-link:focus-visible {
  outline: 2px solid var(--sm-accent, #ff0000);
  outline-offset: 3px;
}

.sm-socials-link {
  font-size: 1.2rem;
  font-weight: 500;
  color: #111;
  text-decoration: none;
  position: relative;
  padding: 2px 0;
  display: inline-block;
  transition: color 0.3s ease, opacity 0.3s ease;
}

.sm-socials-link:hover {
  color: var(--sm-accent, #ff0000);
}

.sm-panel-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.sm-panel-item {
  position: relative;
  color: #000;
  font-weight: 600;
  font-size: 4rem;
  cursor: pointer;
  line-height: 1;
  letter-spacing: -2px;
  text-transform: uppercase;
  transition: background 0.25s, color 0.25s;
  display: inline-block;
  text-decoration: none;
  padding-right: 1.4em;
}

.sm-panel-itemLabel {
  display: inline-block;
  will-change: transform;
  transform-origin: 50% 100%;
}

.sm-panel-item:hover {
  color: var(--sm-accent, #00ff7b);
}

.sm-panel-list[data-numbering] {
  counter-reset: smItem;
}

.sm-panel-list[data-numbering] .sm-panel-item::after {
  counter-increment: smItem;
  content: counter(smItem, decimal-leading-zero);
  position: absolute;
  top: 0.1em;
  right: 3.2em;
  font-size: 18px;
  font-weight: 400;
  color: var(--sm-accent, #00ff7b);
  letter-spacing: 0;
  pointer-events: none;
  user-select: none;
  opacity: var(--sm-num-opacity, 0);
}

aside {
  position: relative;
  z-index: 9999;
  pointer-events: visiblePainted;
  overflow: hidden;
}

.burger-menu-wrapper {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  overflow: hidden;
  pointer-events: none;
}

.glass-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

@media (max-width: 1024px) {
  .staggered-menu-panel {
    width: 100%;
    left: 0;
    right: 0;
  }
}

@media (max-width: 640px) {
  .staggered-menu-panel {
    width: 100%;
    left: 0;
    right: 0;
  }
}
</style>
