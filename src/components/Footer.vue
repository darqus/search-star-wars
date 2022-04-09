<template>
  <v-footer padless>
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
          :class="$vuetify.breakpoint.smAndDown ? 'text-center' : 'text-right'"
        >
          <SoundButton />
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
import SoundButton from '@/components/SoundButton.vue'

export default {
  name: 'Footer',
  components: {
    ThemeSwitcher,
    Link,
    SoundButton,
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
.theme--dark.v-footer {
  background-color: rgba(39, 39, 39, 0.4) !important;
  color: rgba(255, 255, 255, 0.47) !important;
}

.theme--light.v-footer {
  background-color: rgba(245, 245, 245, 0.4) !important;
  color: rgba(0, 0, 0, 0.47) !important;
}
</style>
