<template>
  <!-- <v-card elevation="0" class="text-center" :dark="$vuetify.theme.dark" flat> -->
  <v-switch class="my-0" v-model="$vuetify.theme.dark" :label="label" />
  <!-- </v-card> -->
</template>

<script>
export default {
  name: 'ThemeSwitcher',
  props: {
    label: {
      type: String,
      default: '',
    },
  },
}
</script>

<style>
.v-messages {
  display: none;
}
</style>
