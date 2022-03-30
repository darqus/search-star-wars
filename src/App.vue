<template>
  <v-app :style="bg">
    <v-main>
      <Autocomplete :side="side" />
    </v-main>
  </v-app>
</template>

<script>
import Autocomplete from './components/Autocomplete'

const SIDES = {
  light: 'Jedi',
  dark: 'Sith',
}

const BGS = {
  light: 'jedi',
  dark: 'sith',
}

export default {
  name: 'App',
  components: {
    Autocomplete,
  },
  computed: {
    isDark() {
      return this.$vuetify.theme.dark
    },
    side() {
      const side = this.isDark ? SIDES.dark : SIDES.light
      return side
    },
    bg() {
      const side = this.isDark ? BGS.dark : BGS.light

      const gradient = this.isDark
        ? '(rgba(0, 20, 40, 0.95), rgba(30, 10, 20, 0.9))'
        : '(rgba(200, 220, 240, 0.95), rgba(230, 210, 220, 0.9))'

      const bg = `background-image: linear-gradient${gradient}, url("img/${side}.jpg");
      background-position: center;
      background-size: cover;`

      return bg
    },
  },
}
</script>
