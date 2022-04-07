<template>
  <div>
    <v-container>
      <v-row align="center">
        <v-col cols="12" xs="12" sm="4">
          <Logo />
        </v-col>
        <v-col cols="12" xs="12" sm="8">
          <h1
            class="header-text"
            :style="
              $vuetify.theme.dark
                ? 'text-shadow: 3px -1px 14px rgba(255, 255, 255, 0.6); color: #fff;'
                : 'text-shadow: 3px 1px 14px rgba(0, 0, 0, 0.6); color: #fff;'
            "
          >
            Search Star Wars
            <Link :link="`${API_URL}/${selectedApi}`" :text="selectedApi" />
            in Galaxy
          </h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" xs="12" sm="4">
          <v-select
            v-model="selectedApi"
            :items="SEARCH_API_LIST"
            item-text="api"
            item-value="api"
            :label="`What you search, ${role}? May the Force be with you`"
            dense
          />
        </v-col>
        <v-col cols="12" xs="12" sm="4">
          <v-select
            v-model="selectedField"
            :items="selectedFields"
            label="Selected Field"
            dense
          />
        </v-col>
        <v-col cols="12" xs="12" sm="4">
          <v-text-field
            v-model="search"
            :label="`Search ${selectedApi}`"
            :loading="isLoading"
            clearable
            dense
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
    </v-container>

    <v-container>
      <v-row align="center" no-gutters>
        <template v-if="items.length && result !== defaultResult">
          <template v-if="imgURL">
            <div class="wrapper">
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
            <Dialog class="my-5" :search="search" :result="result" />
          </template>
        </template>
        <template v-else>
          <v-col>
            <SWCrawlText />
          </v-col>
        </template>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import {
  API_URL,
  RESOURCE_URL,
  IMG_PLACEHOLDER,
  SEARCH_API_LIST,
  getDataFromApi,
} from '@/utils/getDataFromApi'
import { getIDfromApiUrl } from '@/utils/transformData'
import { createJSON } from '@/utils/createJSON'
import Logo from '@/components/Logo.vue'
import DropList from '@/components/DropList.vue'
import Link from '@/components/Link.vue'
import SWCrawlText from '@/components/SWCrawlText.vue'
import Dialog from '@/components/Dialog.vue'

const INPUT_DELAY = 500

const createInitialState = () => ({
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
})

export default {
  name: 'Form',
  components: {
    Logo,
    DropList,
    Link,
    SWCrawlText,
    Dialog,
  },
  props: {
    role: {
      type: String,
      default: '',
    },
  },
  data: () => createInitialState(),
  computed: {
    result() {
      const { items, selectedField, search } = this

      if (!items.length) {
        this.clearResult()
        return
      }

      const result = items.find((item) => {
        return item[selectedField] === search
      })

      if (!result) {
        this.clearIMGURL()
        return
      }

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

      this.clearSearch()
    },
    onSelect(select) {
      this.search = select
      this.isShownDropDown = false
      this.timeout = null
    },
    onInput(event) {
      if (!event) return this.clearSearch()

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
      const id = getIDfromApiUrl(url)

      const imgApiPath = SEARCH_API_LIST.find(
        ({ api }) => api === this.selectedApi
      ).imgApiPath

      const imgURL = `${RESOURCE_URL}/assets/img/${imgApiPath}/${id}.jpg`

      this.imgURL = imgURL
    },
    clearIMGURL() {
      this.imgURL = null
    },
    clearResult() {
      this.defaultResult = '{}'
    },
    clearSearch() {
      this.search = ''
      this.items = []
      this.timeout = null
    },
  },
}
</script>

<style>
.header-text {
  font-size: clamp(2vw, 2.5rem, 100%);
  font-weight: 700;
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
  width: clamp(9vw, 300px, 90vw);
  height: clamp(9vw, 300px, 90vw);
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
