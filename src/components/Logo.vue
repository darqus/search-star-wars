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
@import "logo.scss"
</style>
