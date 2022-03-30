<template>
  <v-card :dark="$vuetify.theme.dark" flat>
    <v-toolbar flat height="90">
      <v-switch
        v-model="$vuetify.theme.dark"
        hint="Select you global side"
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
      const label = `Your side: ${this.side}`
      return label
    },
  },
}
</script>
