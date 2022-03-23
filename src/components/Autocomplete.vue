<template>
  <v-container>
    <v-row class="text-center">
      <v-col></v-col>
      <v-col>
        <h1 class="display-1 font-weight-bold mb-3">Welcome to Vuetify</h1>

        <v-text-field v-model="search" label="Users" clearable></v-text-field>
      </v-col>
      <v-col></v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Autocomplete',

  data: () => ({
    search: 'Hey!',
  }),
}
</script>
