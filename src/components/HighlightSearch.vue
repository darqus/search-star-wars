<template>
  <v-list-item-title>
    <span class="light-blue darken-1" v-text="search[0]"></span>
    <span v-text="search[1]"></span>
  </v-list-item-title>
</template>

<script>
export default {
  name: 'HighlightSearch',
  props: {
    search: Array,
  },
}
</script>

<style>
</style>
