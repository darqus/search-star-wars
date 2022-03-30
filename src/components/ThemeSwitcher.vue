<template>
  <v-card :dark="$vuetify.theme.dark" flat>
    <v-toolbar flat height="90">
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
  props: {
    side: String,
  },
  computed: {
    label() {
      const label = `Vuetify Theme ${this.side}`
      return label
    },
  },
}
</script>
