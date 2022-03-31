<template>
  <!-- <v-card elevation="0" class="text-center" :dark="$vuetify.theme.dark" flat> -->
  <v-switch class="my-0" v-model="$vuetify.theme.dark" :label="label" />
  <!-- </v-card> -->
</template>

<script>
export default {
  name: 'ThemeSwitcher',
  props: {
    side: {
      type: String,
      default: '',
    },
  },
  computed: {
    label() {
      const label = `Your side: ${this.side}`
      return label
    },
  },
}
</script>

<style>
.v-messages {
  display: none;
}
</style>
