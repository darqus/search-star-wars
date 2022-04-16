<template>
  <div class="swct-mask" :style="color">
    <div class="swct-container">
      <div class="swct-text -js-stop" v-text="text" />
    </div>
  </div>
</template>

<script>
import SWCTEXT from '@/state/swctext'

export default {
  name: 'SWCrawlText',
  data: () => ({
    text: SWCTEXT,
  }),
  computed: {
    isDark() {
      return this.$vuetify.theme.dark
    },
    color() {
      const color = this.isDark
        ? 'hsla(60, 100%, 50%, 0.308)'
        : 'hsla(0, 0%, 0%, 0.308)'

      return `color: ${color}`
    },
  },
}
</script>

<style>
.swct-mask {
  position: relative;
  height: clamp(40vh, 50vh, 60vh);
  transform: perspective(150px) rotateX(20deg);
  transform-origin: 50% 100%;
}

.swct-container {
  position: absolute;
  top: -90vh;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  font-size: 4vh;
  text-align: justify;
}

.swct-text {
  padding-top: 5vh;
  animation: autoscroll 2000s linear;
}

.swct-text.js-stop {
  animation: initial;
}

@keyframes autoscroll {
  to {
    margin-top: -3000vh;
  }
}

.theme--dark ::selection {
  color: hsl(60deg 100% 50% / 0.708);
}

.theme--light ::selection {
  color: hsl(60deg 100% 30% / 0.708);
}
</style>
