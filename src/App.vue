<template>
  <v-app :style="bg">
    <v-main>
      <Form :role="role" />
    </v-main>
    <Footer :side="side" />
  </v-app>
</template>

<script>
import { THEMES, SIDES, ROLES, BGS } from './utils/constants'
import { getItem, setItem } from '@/utils/persistanceStorage'
import { getBrowserTheme } from '@/utils/getBrowserTheme'
import Form from './components/Form'
import Footer from '@/components/Footer.vue'

const IS_THEME_DARK = 'isThemeDark'

export default {
  name: 'App',
  components: {
    Form,
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
  created() {
    const isLSDark = getItem(IS_THEME_DARK)

    if (isLSDark === null) {
      const browserTheme = getBrowserTheme()
      const isBrowserThemeDark = browserTheme === THEMES.dark
      this.$vuetify.theme.dark = isBrowserThemeDark
    } else {
      this.$vuetify.theme.dark = isLSDark
    }
  },
  watch: {
    isDark(value) {
      setItem(IS_THEME_DARK, value)
    },
  },
}
</script>
