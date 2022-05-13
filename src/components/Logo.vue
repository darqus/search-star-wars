<template>
  <svg
    width="161.58"
    height="77.265"
    version="1.1"
    viewBox="0 0 72.026 34.441"
    xmlns="http://www.w3.org/2000/svg"
    class="logo"
    :class="$vuetify.theme.dark ? 'dark' : 'light'"
  >
    <g transform="translate(87.836 -91.787)">
      <path :d="logoSvgPath" />
    </g>
  </svg>
</template>

<script>
import logoSvgPath from '@/state/svgPaths'

export default {
  name: 'AppLogo',
  data: () => ({
    logoSvgPath,
  }),
}
</script>

<style>
.logo {
  filter: invert(0.12) sepia(0.5) drop-shadow(0 10px 8px rgba(0, 0, 0, 0.5));
  transform: scale(0.65);
}

.logo.dark {
  filter: invert(0.12) sepia(0.5)
    drop-shadow(0 10px 8px rgba(255, 255, 255, 0.4));
}

.logo.light {
  filter: invert(0.12) sepia(0.5) drop-shadow(0 10px 8px rgba(0, 0, 0, 0.5));
}

.logo path {
  fill: #fff;
}
</style>
