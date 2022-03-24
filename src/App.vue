<template>
  <v-app>
    <v-main>
      <Autocomplete />
    </v-main>
  </v-app>
</template>

<script>
import Autocomplete from './components/Autocomplete'

export default {
  name: 'App',
  components: {
    Autocomplete,
  },
}
</script>
