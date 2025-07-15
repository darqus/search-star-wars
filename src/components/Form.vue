<template>
  <v-container>
    <v-row align="center">
      <v-col cols="12" xs="12" sm="4">
        <Logo />
      </v-col>
      <v-col cols="12" xs="12" sm="8">
        <h1 class="header-text" :class="$vuetify.theme.dark ? 'dark' : 'light'">
          <span v-text="HEADER_NAME_SHORT" />
          <span>&nbsp;</span>
          <Link :link="`${API_URL}/${selectedApi}`" :text="selectedApi" />
          <span>&nbsp;</span>
          <span v-text="HEADER_NAME_POSTFIX" />
        </h1>
      </v-col>
    </v-row>

    <v-row style="position: relative; z-index: 2">
      <v-col cols="12" xs="12" sm="3">
        <v-select
          v-model="selectedApi"
          :items="SEARCH_API_LIST"
          :menu-props="{ auto: true, offsetY: true }"
          item-text="api"
          item-value="api"
          :label="`What you search, ${role}? May the Force be with you`"
          dense
        />
      </v-col>
      <v-col cols="12" xs="12" sm="3" style="position: relative">
        <v-pagination
          v-model="currentPage"
          :length="totalPages"
          :total-visible="7"
          :loading="isLoading"
          @input="onPageChange"
          circle
        />
      </v-col>
      <v-col cols="12" xs="12" sm="3" style="position: relative">
        <SelectControl
          :items="items"
          :selected-api="selectedApi"
          :selected-name="selectedName"
          @select="onSelectFromSelect"
        />
      </v-col>
      <v-col cols="12" xs="12" sm="3" style="position: relative">
        <SearchField
          :items="searchResults"
          :selected-api="selectedApi"
          :is-loading="isSearchLoading"
          :search="search"
          :is-shown-drop-down="isShownDropDown"
          @search-input="onSearchInput"
          @select="onSelectFromSearch"
        />
      </v-col>
    </v-row>

    <v-row style="position: relative">
      <v-col>
        <template v-if="imgURL && imgURL !== IMG_PLACEHOLDER">
          <div class="wrapper">
            <div class="img" role="img" :aria-label="selectedApi">
              <a
                href
                @click.prevent="isDialogShow = !isDialogShow"
                @keyup="isDialogShow = !isDialogShow"
              >
                <img
                  v-for="item in 2"
                  :key="item"
                  :src="imgURL"
                  :alt="selectedApi"
                  :onerror="`this.onerror=null;this.src='${IMG_PLACEHOLDER}';`"
                />
              </a>
            </div>
          </div>
        </template>
        <template v-if="items.length && result !== defaultResult">
          <Dialog
            class="my-5"
            :result="selectedItem || {}"
            :is-dialog-show="isDialogShow"
            @dialog="onDialog"
          />
        </template>
        <template v-if="!$vuetify.breakpoint.smAndDown">
          <Mandala :side="side" />
          <Mandala :side="side" :class-name="'right'" />
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import { IS_DEV } from '@/state'
// import RESULTS from '@/state/fixtures'
import {
  API_URL,
  RESOURCE_URL,
  IMG_PLACEHOLDER,
  SEARCH_API_LIST,
  getDataFromApi,
} from '@/utils/getDataFromApi'

import Logo from '@/components/Logo.vue'
// DropList теперь используется только внутри SearchField.vue
import Link from '@/components/Link.vue'
import Dialog from '@/components/Dialog.vue'
import Mandala from '@/components/Mandala.vue'
import SearchField from './SearchField.vue'
import SelectControl from './SelectControl.vue'

const createInitialState = () => ({
  items: [],
  API_URL,
  HEADER_NAME_SHORT: process.env.VUE_APP_NAME_SHORT,
  HEADER_NAME_POSTFIX: process.env.VUE_APP_NAME_POSTFIX,
  IMG_PLACEHOLDER,
  SEARCH_API_LIST,
  selectedApi: SEARCH_API_LIST[0].api,
  selectedField: SEARCH_API_LIST[0].searchFields[0],
  search: '',
  timeout: null,
  isLoading: false,
  isShownDropDown: false,
  isKeyupArrowDown: false,
  defaultResult: '{}',
  imgURL: IMG_PLACEHOLDER,
  isDialogShow: false,
  currentPage: 1,
  totalPages: 1,
  pageSize: 20,
  selectedName: '',
})

export default {
  name: 'AppForm',
  components: {
    Logo,
    Link,
    Dialog,
    Mandala,
    SearchField,
    SelectControl,
  },
  props: {
    role: {
      type: String,
      default: '',
    },
    side: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    ...createInitialState(),
    selectedItem: null,
    searchResults: [], // результаты поиска
    isSearchLoading: false, // состояние загрузки поиска
    isShownDropDown: false, // состояние показа выпадающего списка
  }),
  async mounted() {
    await this.getData()
  },
  computed: {
    result() {
      const { items, selectedItem, searchResults } = this
      if (!items.length && !searchResults.length) {
        this.clearResult()
        return ''
      }
      // Показываем выбранный элемент, если есть
      return selectedItem || ''
    },
  },
  watch: {
    selectedApi(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.currentPage = 1
        this.setSearchField()
        this.getData()
      }
    },
  },
  methods: {
    setSearchField() {
      const searchField = SEARCH_API_LIST.find(
        ({ api }) => api === this.selectedApi,
      ).searchFields
      const selectedField = searchField[0]
      this.selectedField = selectedField
      this.clearSearch()
    },
    onSelectFromSelect(name) {
      this.selectedName = name
      this.selectedItem = this.items.find((item) => item[this.selectedField] === name)
      this.imgURL = this.selectedItem?.image ? `${RESOURCE_URL}/${this.selectedItem.image}` : IMG_PLACEHOLDER
    },
    async onSearchInput(value) {
      this.search = value
      if (!value || value.length < 3) {
        this.searchResults = []
        this.isShownDropDown = false
        this.isSearchLoading = false
        return
      }
      this.isSearchLoading = true
      try {
        const response = await getDataFromApi(
          this.selectedApi,
          value,
          5, // ограничиваем до 5 результатов для дропа
          1,
        )
        this.searchResults = response?.results || []
        this.isShownDropDown = this.searchResults.length > 0
      } catch (e) {
        this.searchResults = []
        this.isShownDropDown = false
      } finally {
        this.isSearchLoading = false
      }
    },
    onSelectFromSearch(name) {
      this.selectedName = name
      this.selectedItem = this.searchResults.find((item) => item[this.selectedField] === name)
      this.imgURL = this.selectedItem?.image ? `${RESOURCE_URL}/${this.selectedItem.image}` : IMG_PLACEHOLDER
      this.isShownDropDown = false
    },
    async getData() {
      this.isLoading = true
      const response = await getDataFromApi(
        this.selectedApi,
        '',
        this.pageSize,
        this.currentPage,
      )
      const items = response?.results
      if (items) {
        this.items = items
        this.totalPages = response.pages || 1
        if (items.length > 0 && this.search === '') {
          this.selectedName = items[0].name
          this.onSelectFromSelect(items[0].name)
        }
      }
      this.isLoading = false
    },
    onPageChange(page) {
      this.clearSearch()
      this.currentPage = page
      this.getData()
    },
    onDialog(value) {
      this.isDialogShow = value
    },
    clearImgUrl() {
      this.imgURL = IMG_PLACEHOLDER
    },
    clearResult() {
      this.defaultResult = '{}'
    },
    clearSearch() {
      this.search = ''
      this.searchResults = []
      this.isShownDropDown = false
      this.isSearchLoading = false
      this.clearImgUrl()
    },
  },
}
</script>

<style>
@import 'form.scss';
</style>
