<template>
  <v-footer padless>
    <v-container
      class="g-grid g-align-items-center"
      :class="$vuetify.breakpoint.smAndDown ? 'g-col-initial g-gap' : 'g-col-4'"
    >
      <div
        :class="
          $vuetify.breakpoint.smAndDown
            ? 'g-jistify-self-center'
            : 'g-jistify-self-start'
        "
      >
        <ThemeSwitcher class="pa-3" :label="`Toggle side: ${this.side}`" />
      </div>
      <div
        :class="
          $vuetify.breakpoint.smAndDown
            ? 'g-jistify-self-center'
            : 'g-jistify-self-start'
        "
      >
        <Link
          v-for="{ link, text } in links"
          :key="text"
          :link="link"
          :text="text"
          class="px-2"
        />
      </div>
      <div
        :class="
          $vuetify.breakpoint.smAndDown
            ? 'g-jistify-self-center'
            : 'g-jistify-self-end'
        "
      >
        <SoundButton />
      </div>
      <div
        class="g-grid g-align-items-center"
        :class="
          $vuetify.breakpoint.smAndDown
            ? 'g-jistify-self-center'
            : 'g-jistify-self-end'
        "
      >
        <small class="">
          1977 — {{ new Date().getFullYear() }} 🪐 SkyNet inc.
        </small>
      </div>
    </v-container>
  </v-footer>
</template>

<script>
import { LINKS } from '@/utils/constants'
import ThemeSwitcher from '@/components/ThemeSwitcher.vue'
import Link from '@/components/Link.vue'
import SoundButton from '@/components/SoundButton.vue'

export default {
  name: 'Footer',
  components: {
    ThemeSwitcher,
    Link,
    SoundButton,
  },
  props: {
    side: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    links: LINKS,
  }),
}
</script>

<style>
.g-grid {
  display: grid;
}

.g-align-items-center {
  align-items: center;
}

.g-jistify-self-center {
  justify-self: center;
}

.g-jistify-self-start {
  justify-self: start;
}

.g-jistify-self-end {
  justify-self: end;
}

.g-col-2 {
  grid-template-columns: repeat(2, 1fr);
}

.g-col-4 {
  grid-template-columns: repeat(4, 1fr);
}

.g-col-initial {
  grid-template-columns: initial;
}

.g-gap {
  gap: 0.7rem;
}

.theme--dark.v-footer {
  background-color: rgba(39, 39, 39, 0.4) !important;
  color: rgba(255, 255, 255, 0.47) !important;
}

.theme--light.v-footer {
  background-color: rgba(245, 245, 245, 0.4) !important;
  color: rgba(0, 0, 0, 0.47) !important;
}
</style>
