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
    side() {
      const isDark = this.$vuetify.theme.dark
      const side = isDark ? SIDES.dark : SIDES.light
      return side
    },
    bg() {
      const isDark = this.$vuetify.theme.dark
      const side = isDark ? BGS.dark : BGS.light

      const gradient = isDark
        ? 'background-image: linear-gradient(rgba(0, 20, 40, 0.95), rgba(30, 10, 20, 0.9))'
        : 'background-image: linear-gradient(rgba(200, 220, 240, 0.95), rgba(230, 210, 220, 0.9))'

      const bg = `${gradient}, url("img/${side}.jpg"); background-position: center; background-size: cover;`
      return bg
    },
  },
}
</script>
