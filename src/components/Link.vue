<template>
  <a
    :href="link"
    target="_blank"
    v-text="text"
    :style="`font-size: ${fontSizeRem}rem;`"
  />
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
    fontSizeRem: {
      type: Number,
      default: 1,
    },
  },
}
</script>
