<template>
  <v-list-item-title>
    <span v-text="search[0]" v-if="search[0]" />
    <span
      :class="
        $vuetify.theme.dark
          ? 'light-blue darken-1'
          : 'light-blue lighten-3'
      "
      v-text="search[1]"
    />
    <span v-text="search[2]" />
  </v-list-item-title>
</template>

<script>
export default {
  name: 'HighlightSearch',
  props: {
    search: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
