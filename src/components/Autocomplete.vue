<template>
  <v-container>
    <v-row class="text-center mt-5">
      <v-col>
        <h1
          class="display-1 font-weight-bold mb-3"
          :style="
            $vuetify.theme.dark
              ? 'text-shadow: 3px -1px 14px rgba(255, 255, 255, 0.6); color: #fff;'
              : 'text-shadow: 3px 1px 14px rgba(0, 0, 0, 0.6); color: #fff;'
          "
        >
          Search Star Wars
          <a
            :href="`${API_URL}/${selectedApi}`"
            target="_blank"
            v-text="selectedApi"
          />
          with Vuetify
        </h1>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col cols="12" xs="12" sm="4">
        <v-select
          v-model="selectedApi"
          :items="SEARCH_API_LIST"
          item-text="api"
          item-value="api"
          :label="`What you search, ${role}? May the Force be with you`"
        />
      </v-col>
      <v-col cols="12" xs="12" sm="4">
        <v-select
          v-model="selectedField"
          :items="selectedFields"
          label="Selected Field"
        />
      </v-col>
      <v-col cols="12" xs="12" sm="4">
        <v-text-field
          v-model="search"
          :label="`Search ${selectedApi}`"
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
    </v-row>
    <v-row v-if="items.length && result !== defaultResult" class="mt-5">
      <v-col cols="12" xs="12" sm="6">
        <pre v-text="result" />
      </v-col>
      <v-col cols="12" xs="12" sm="6">
        <div class="wrapper" v-if="imgURL">
          <div class="img">
            <img
              v-for="item in 2"
              :key="item"
              :src="imgURL"
              :alt="selectedApi"
              :onerror="`this.onerror=null;this.src='${IMG_PLACEHOLDER}';`"
            />
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {
  API_URL,
  RESOURCE_URL,
  IMG_PLACEHOLDER,
  SEARCH_API_LIST,
  getDataFromApi,
} from '@/utils/getDataFromApi'
import { getIDfromAPI_URL } from '@/utils/transformData'
import { createJSON } from '@/utils/createJSON'
import DropList from '@/components/DropList.vue'

const INPUT_DELAY = 500

export default {
  name: 'Autocomplete',
  components: {
    DropList,
  },
  props: {
    role: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    items: [],
    API_URL,
    IMG_PLACEHOLDER,
    SEARCH_API_LIST,
    selectedApi: SEARCH_API_LIST[0].api,
    selectedField: SEARCH_API_LIST[0].searchFields[0],
    selectedFields: SEARCH_API_LIST[0].searchFields,
    search: '',
    timeout: null,
    isLoading: false,
    isShownDropDown: false,
    defaultResult: '{}',
    imgURL: null,
  }),
  computed: {
    result() {
      const { items, selectedField, search } = this

      if (!items.length) return this.defaultResult

      const result = items.find((item) => {
        return item[selectedField] === search
      })

      if (!result) return

      this.setIMGURL(result.url)

      return createJSON(result)
    },
  },
  watch: {
    selectedApi() {
      this.setSearchField()
    },
  },
  methods: {
    setSearchField() {
      const searchField = SEARCH_API_LIST.find(
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
    setIMGURL(url) {
      const id = getIDfromAPI_URL(url)

      const imgApiPath = SEARCH_API_LIST.find(
        ({ api }) => api === this.selectedApi
      ).imgApiPath

      const imgURL = `${RESOURCE_URL}/assets/img/${imgApiPath}/${id}.jpg`

      this.imgURL = imgURL
    },
    clear() {
      this.search = ''
      this.items = []
      this.timeout = null
    },
  },
}
</script>

<style>
pre {
  max-width: 550px;
  max-height: 550px;
  overflow: auto;
}

.wrapper {
  display: grid;
  place-items: center;
  place-content: center;
  height: 100%;
  width: 100%;
}

.img {
  cursor: pointer;
  position: relative;
  width: 360px;
  height: 360px;
  opacity: 0.6;
}

.img img {
  position: absolute;
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  transition: 0.5s ease-in-out;
  box-shadow: 0 5px 8px rgba(255, 255, 255, 0.05);
  opacity: 0.5;
}

.img img:nth-child(2) {
  transform: scale(1.15);
  opacity: 0.25;
  z-index: -1;
  filter: blur(6px);
}

.img:hover img:nth-child(2) {
  transform: scale(1.05);
  filter: blur(4px);
}
</style>
