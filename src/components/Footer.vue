<template>
  <v-footer padless style="opacity: 0.4">
    <v-container>
      <v-row align="center">
        <v-col cols="12" xs="12" sm="4">
          <ThemeSwitcher class="pa-3" :label="`Toggle side: ${this.side}`" />
        </v-col>
        <v-col cols="12" xs="12" sm="4">
          <small>
            <Link
              v-for="{ link, text } in links"
              :key="text"
              :link="link"
              :text="text"
              class="px-2"
            />
          </small>
        </v-col>
        <v-col
          cols="12"
          xs="12"
          sm="4"
          :class="
            ['xs'].includes($vuetify.breakpoint.name)
              ? 'text-center'
              : 'text-right'
          "
        >
          <small> 1977 — {{ new Date().getFullYear() }} 🪐 SkyNet inc. </small>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
import { LINKS } from '@/utils/constants'
import ThemeSwitcher from '@/components/ThemeSwitcher.vue'
import Link from '@/components/Link.vue'

export default {
  name: 'Footer',
  components: {
    ThemeSwitcher,
    Link,
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
