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
      <v-col cols="12" xs="12" sm="3">
        <v-select
          v-model="selectedApi"
          :items="API_LIST"
          item-text="api"
          item-value="api"
          :label="`What you search, ${side}? May the Force be with you`"
        ></v-select>
      </v-col>
      <v-col cols="12" xs="12" sm="3">
        <v-select
          v-model="selectedField"
          :items="selectedFields"
          label="Selected Field"
        ></v-select>
      </v-col>
      <v-col cols="12" xs="12" sm="3">
        <v-text-field
          v-model="search"
          :label="`Set ${selectedApi}`"
          :loading="isLoading"
          clearable
          @input="onInput"
        />
        <DropList
          v-if="items.length && isShownDropDown"
          :items="items"
          :search="search"
          :selected-api="selectedApi"
          :selected-field="selectedField"
          @select="onSelect"
        />
      </v-col>
      <v-col cols="12" xs="12" sm="3">
        <ThemeSwitcher :side="side" />
      </v-col>
    </v-row>
    <v-row class="mt-5" v-if="items.length && result !== defaultResult">
      <v-col>
        <pre v-text="result" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { URL, API_LIST, getDataFromApi } from '@/utils/getDataFromApi'
import { createJSON } from '@/utils/createJSON'
import DropList from '@/components/DropList.vue'
import ThemeSwitcher from '@/components/ThemeSwitcher.vue'

const INPUT_DELAY = 500

export default {
  name: 'Autocomplete',
  components: {
    DropList,
    ThemeSwitcher,
  },
  props: {
    side: String,
  },
  data: () => ({
    items: [],
    URL,
    API_LIST,
    selectedApi: API_LIST[0].api,
    selectedField: API_LIST[0].searchFields[0],
    selectedFields: API_LIST[0].searchFields,
    search: '',
    timeout: null,
    isLoading: false,
    isShownDropDown: false,
    defaultResult: '{}',
  }),
  computed: {
    result() {
      const { items, selectedField, search } = this

      if (!items.length) return this.defaultResult

      const result = items.find((item) => {
        return item[selectedField] === search
      })

      return createJSON(result)
    },
  },
  methods: {
    setSearchField() {
      const searchField = API_LIST.find(
        ({ api }) => api === this.selectedApi
      ).searchFields

      this.selectedField = searchField[0]
      this.selectedFields = searchField

      this.clear()
    },
    onSelect(select) {
      this.search = select
      this.isShownDropDown = false
      this.timeout = null
    },
    onInput(event) {
      if (!event) return this.clear()

      this.isShownDropDown = true

      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.getData()
      }, INPUT_DELAY)
    },
    async getData() {
      this.isLoading = true
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
  watch: {
    selectedApi() {
      this.setSearchField()
    },
  },
}
</script>
