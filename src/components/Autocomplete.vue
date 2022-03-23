<template>
  <v-container>
    <v-row class="text-center">
      <v-col
        ><h1 class="display-1 font-weight-bold mb-3">Welcome to Vuetify</h1>
      </v-col>
      <v-col>
        <v-text-field v-model="search" label="Users" clearable></v-text-field>
      </v-col>
      <v-col><ThemeSwitcher /></v-col>
    </v-row>
  </v-container>
</template>

<script>
import ThemeSwitcher from '@/components/ThemeSwitcher.vue'

export default {
  name: 'Autocomplete',
  components: {
    ThemeSwitcher,
  },
  data: () => ({
    search: 'Hey!',
  }),
}
</script>
