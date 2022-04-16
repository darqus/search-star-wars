<template>
  <a
    :href="link"
    target="_blank"
    v-text="text"
    :style="fontSizeRem > 0 ? `font-size: ${fontSizeRem}rem;` : ''"
  />
</template>

<script>
export default {
  name: 'AppLink',
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
      default: -1,
    },
  },
}
</script>
