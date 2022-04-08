<template>
  <v-btn icon @click="toogle">
    <v-icon v-text="icon" />
  </v-btn>
</template>

<script>
import { AUDIO_ICONS } from '@/utils/constants'

const sound = new Audio('snd/star-wars-theme.m4a')

export default {
  name: 'SoundButton',
  data: () => ({
    isPlayed: true,
  }),
  created() {
    this.soundPlay()
  },
  computed: {
    icon() {
      return this.isPlayed ? AUDIO_ICONS.stop : AUDIO_ICONS.play
    },
  },
  methods: {
    soundPlay() {
      sound.play()
    },
    soundPause() {
      sound.pause()
    },
    toogle() {
      const { isPlayed } = this
      this.isPlayed = !isPlayed
      if (!isPlayed) {
        this.soundPlay()
      } else {
        this.soundPause()
      }
    },
  },
}
</script>

<style>
</style>
