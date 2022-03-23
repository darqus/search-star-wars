<template>
  <v-card :dark="$vuetify.theme.dark" flat>
    <v-toolbar flat height="72">
      <v-switch
        v-model="$vuetify.theme.dark"
        hint="This toggles the global state of the Vuetify theme"
        inset
        :label="label"
        persistent-hint
      ></v-switch>
    </v-toolbar>
  </v-card>
</template>

<script>
export default {
  name: 'ThemeSwitcher',
  computed: {
    label() {
      const isDark = this.$vuetify.theme.dark
      const theme = isDark ? 'Dark' : 'Light'
      const label = `Vuetify Theme ${theme}`
      return label
    },
  },
}
</script>
