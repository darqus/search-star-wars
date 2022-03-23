<template>
  <v-container>
    <v-row class="text-center">
      <v-col
        ><h1 class="display-1 font-weight-bold mb-3">Welcome to Vuetify</h1>
      </v-col>
      <v-col>
        <v-text-field
          v-model="search"
          label="Users"
          clearable
          @input="onInput"
        ></v-text-field>
        <DropList v-if="items.length" :items="items" @select="onSelect" />
      </v-col>
      <v-col><ThemeSwitcher /></v-col>
    </v-row>
  </v-container>
</template>

<script>
import { fetchUsers } from '@/utils/fetch'
import DropList from '@/components/DropList.vue'
import ThemeSwitcher from '@/components/ThemeSwitcher.vue'

export default {
  name: 'Autocomplete',
  components: {
    DropList,
    ThemeSwitcher,
  },
  data: () => ({
    search: '',
    items: [],
  }),
  methods: {
    onSelect(select) {
      this.search = select
      this.items = []
    },
    onInput() {
      // TODO: add timeout
      this.getUsers()
    },
    async getUsers() {
      const users = await fetchUsers()
      this.items = users
    },
  },
}
</script>
