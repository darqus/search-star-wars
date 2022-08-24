<template>
  <v-footer padless>
    <v-container
      class="g-grid g-align-items-center relative"
      :class="
        $vuetify.breakpoint.smAndDown ? 'g-col-initial g-row-gap' : 'g-col-4'
      "
    >
      <SWCrawlText />
      <div
        class="g-grid"
        :class="
          $vuetify.breakpoint.smAndDown
            ? 'g-jistify-content-center'
            : 'g-jistify-content-start'
        "
      >
        <ThemeSwitcher class="pa-3" :label="`Toggle side: ${this.side}`" />
      </div>
      <div
        class="g-grid g-align-items-center"
        :class="
          $vuetify.breakpoint.smAndDown
            ? 'g-jistify-content-center'
            : 'g-jistify-content-start'
        "
      >
        <div>
          <Link
            v-for="{ link, text } in links"
            :key="text"
            :link="link"
            :text="text"
            class="px-1"
            :font-size-rem="0.8"
          />
        </div>
      </div>
      <div
        class="g-grid"
        :class="
          $vuetify.breakpoint.smAndDown
            ? 'g-jistify-content-center'
            : 'g-jistify-content-end'
        "
      >
        <SoundButton />
      </div>
      <div
        class="g-grid g-align-items-center"
        :class="
          $vuetify.breakpoint.smAndDown
            ? 'g-jistify-content-center'
            : 'g-jistify-content-end'
        "
      >
        <small class>
          <span v-text="`1977 — ${new Date().getFullYear()}`" />
          <span class="ml-2">
            <span class="footer-icon">🌌</span>
            <span>&nbsp;</span>
            <FooterDropDownInfo />
            <span>&nbsp;</span>
            <span>inc.</span>
          </span>
        </small>
      </div>
    </v-container>
  </v-footer>
</template>

<script>
import { LINKS } from '@/state/'
import SWCrawlText from '@/components/SWCrawlText.vue'
import ThemeSwitcher from '@/components/ThemeSwitcher.vue'
import Link from '@/components/Link.vue'
import SoundButton from '@/components/SoundButton.vue'
import FooterDropDownInfo from '@/components/FooterDropDownInfo.vue'

export default {
  name: 'AppFooter',
  components: {
    SWCrawlText,
    ThemeSwitcher,
    Link,
    SoundButton,
    FooterDropDownInfo,
  },
  props: {
    side: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    links: LINKS,
  }),
}
</script>

<style>
@import "footer.scss";
</style>
