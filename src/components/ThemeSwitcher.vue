<template>
  <v-switch dense class="my-0" v-model="$vuetify.theme.dark" :label="label" />
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
