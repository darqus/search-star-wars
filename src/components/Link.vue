<template>
  <a :href="link" target="_blank" v-text="text" />
</template>

<script>
export default {
  name: 'Link',
  props: {
    link: {
      type: String,
      default: '#',
    },
    text: {
      type: String,
      default: '',
    },
  },
}
</script>
