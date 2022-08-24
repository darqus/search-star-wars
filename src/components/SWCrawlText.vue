<template>
  <div
    class="swct-mask"
    :class="{ mobile: $vuetify.breakpoint.smAndDown }"
    :style="color"
  >
    <div class="shadow" />
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
@import "sw-crawl-text.scss"
</style>
