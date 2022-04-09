<template>
  <v-btn icon @click="onToggle" x-large>
    <v-icon v-text="icon" />
  </v-btn>
</template>

<script>
import { AUDIO_ICONS } from '@/utils/constants'

const sound = new Audio('snd/star-wars-theme.m4a')

export default {
  name: 'SoundButton',
  data: () => ({
    isPlayed: false,
  }),
  computed: {
    icon() {
      return this.isPlayed ? AUDIO_ICONS.stop : AUDIO_ICONS.play
    },
  },
  mounted() {
    sound.addEventListener('ended', () => this.onToggle(), false)
  },
  methods: {
    onPlaySound(loop = false) {
      sound.loop = loop
      sound.play()
    },
    onPauseSound() {
      sound.pause()
    },
    onToggle() {
      const { isPlayed } = this
      this.isPlayed = !isPlayed
      if (!isPlayed) {
        this.onPlaySound()
      } else {
        this.onPauseSound()
      }
    },
  },
}
</script>
