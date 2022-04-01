<template>
  <v-app :style="bg">
    <v-main>
      <Autocomplete :role="role" />
    </v-main>
    <Footer :side="side" />
  </v-app>
</template>

<script>
import Autocomplete from './components/Autocomplete'
import Footer from '@/components/Footer.vue'
import { SIDES, ROLES, BGS } from './utils/constants'

export default {
  name: 'App',
  components: {
    Autocomplete,
    Footer,
  },
  computed: {
    isDark() {
      return this.$vuetify.theme.dark
    },
    side() {
      const side = this.isDark ? SIDES.dark : SIDES.light
      return side
    },
    role() {
      const role = this.isDark ? ROLES.dark : ROLES.light
      return role
    },
    bg() {
      const currentBg = this.isDark ? BGS.dark : BGS.light

      const currentGradient = this.isDark
        ? '(rgba(0, 20, 40, 0.95), rgba(30, 10, 20, 0.9))'
        : '(rgba(200, 220, 240, 0.95), rgba(230, 210, 220, 0.9))'

      const bg = `background-image: linear-gradient${currentGradient}, url("img/${currentBg}.jpg");
      background-position: center;
      background-size: cover;`

      return bg
    },
  },
}
</script>
