<template>
  <v-container>
    <v-row class="text-center">
      <v-col
        ><h1 class="display-1 font-weight-bold mb-3">Welcome to Vuetify</h1>
      </v-col>
      <v-col>
        <v-text-field
          v-model="search"
          label="Set user"
          :loading="isLoading"
          clearable
          @input="onInput"
        ></v-text-field>
        <DropList
          v-if="items.length"
          :items="items"
          :search="search"
          @select="onSelect"
        />
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
    timeout: null,
    inputDelay: 500,
    isLoading: false,
  }),
  methods: {
    onSelect(select) {
      this.search = select
      this.items = []
    },
    onInput(event) {
      if (!event) return this.clear()

      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.getUsers()
      }, this.inputDelay)
    },
    async getUsers() {
      this.isLoading = true
      const users = await fetchUsers()
      this.items = users
      this.isLoading = false
    },
    clear() {
      this.search = ''
      this.items = []
      this.timeout = null
    },
  },
}
</script>
