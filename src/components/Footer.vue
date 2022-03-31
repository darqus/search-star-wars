<template>
  <v-footer padless>
    <v-container>
      <v-row align="center">
        <v-col cols="12" xs="12" sm="6">
          <ThemeSwitcher class="pa-3" :side="side" />
        </v-col>
        <v-col
          cols="12"
          xs="12"
          sm="6"
          :class="
            ['xs'].includes($vuetify.breakpoint.name)
              ? 'text-center'
              : 'text-right'
          "
        >
          <small> {{ new Date().getFullYear() }} — Vuetify </small>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
import ThemeSwitcher from '@/components/ThemeSwitcher.vue'

export default {
  name: 'Footer',
  components: {
    ThemeSwitcher,
  },
  props: {
    side: {
      type: String,
      default: '',
    },
  },
}
</script>

<style>
</style>
