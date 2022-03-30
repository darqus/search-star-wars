<template>
  <v-container>
    <v-row class="text-center mt-5">
      <v-col>
        <h1 class="display-1 font-weight-bold mb-3">
          Search Star Wars
          <a
            :href="`${URL}/${selectedApi}`"
            target="_blank"
            v-text="selectedApi"
          ></a>
          with Vuetify
        </h1>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col cols="12" xs="12" sm="4">
        <v-select
          v-model="selectedApi"
          :items="API_LIST"
          label="What you search, Jedi? May the Force be with you"
        ></v-select>
      </v-col>
      <v-col cols="12" xs="12" sm="4">
        <v-text-field
          v-model="search"
          :label="`Set ${selectedApi}`"
          :loading="isLoading"
          clearable
          @input="onInput"
        />
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
import { URL, API_LIST, getDataFromApi } from '@/utils/fetch'
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
    URL,
    API_LIST,
    selectedApi: API_LIST[0],
    timeout: null,
    inputDelay: 500,
    isLoading: false,
  }),
  methods: {
    onSelect(select) {
      this.search = select
      this.items = []
      this.timeout = null
    },
    onInput(event) {
      if (!event) return this.clear()

      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.getData()
      }, this.inputDelay)
    },
    async getData() {
      this.isLoading = true
      console.log(this.selectedApi)
      const response = await getDataFromApi(this.selectedApi)
      const items = response?.results
      if (items.length) {
        this.items = items
      }
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
