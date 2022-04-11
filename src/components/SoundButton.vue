<template>
  <div class="g-grid g-col-2 g-align-items-center">
    <v-btn icon @click="onToggle">
      <v-icon v-text="icon" />
    </v-btn>
    <v-checkbox dense v-model="isLoop" label="loop" class="ma-0" />
  </div>
</template>

<script>
import { AUDIO_ICONS } from '@/state/'

const sound = new Audio('snd/star-wars-theme.m4a')

export default {
  name: 'SoundButton',
  data: () => ({
    isPlayed: false,
    isLoop: false,
  }),
  computed: {
    icon() {
      return this.isPlayed ? AUDIO_ICONS.stop : AUDIO_ICONS.play
    },
  },
  mounted() {
    sound.addEventListener('ended', () => this.onToggle(), false)
  },
  watch: {
    isLoop(value) {
      sound.loop = value
    },
  },
  methods: {
    onPlaySound() {
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
