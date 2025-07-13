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
        <v-select
          :items="items"
          item-text="name"
          item-value="name"
          :menu-props="{ auto: true, offsetY: true }"
          class="select"
          :label="`Selected ${selectedApi}`"
          dense
          v-model="selectedName"
          @change="onSelect(selectedName)"
        />
      </v-col>
      <v-col cols="12" xs="12" sm="3" style="position: relative">
        <v-text-field
          v-model="search"
          :label="`Search ${selectedApi}`"
          :loading="isLoading"
          class="text-field"
          clearable
          dense
          debounce="500"
          @input="onInput"
          @keyup="onKeyup"
        />
        <DropList
          class="drop-list"
          v-if="items.length && isShownDropDown"
          :items="items"
          :search="search"
          :selected-api="selectedApi"
          :selected-field="selectedField"
          :is-keyup-arrow-down="isKeyupArrowDown"
          @select="onSelect"
          @reset="isKeyupArrowDown = false"
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
            :search="search"
            :result="result"
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
import createJSON from '@/utils/createJSON'
import Logo from '@/components/Logo.vue'
import DropList from '@/components/DropList.vue'
import Link from '@/components/Link.vue'
import Dialog from '@/components/Dialog.vue'
import Mandala from '@/components/Mandala.vue'

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
    DropList,
    Link,
    Dialog,
    Mandala,
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
  data: () => createInitialState(),
  async mounted() {
    await this.getData()
  },
  computed: {
    result() {
      const { items, selectedField, search } = this

      if (!items.length) {
        this.clearResult()
        return ''
      }

      const foundSelected = items.find((item) => item[selectedField] === search)

      if (!foundSelected) {
        // Don't clear image URL here anymore - let it persist
        return ''
      }

      this.setImgUrl(foundSelected)

      const result = createJSON(foundSelected)

      return result
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
    onSelect(select) {
      this.isShownDropDown = false
      this.timeout = null

      // Find the selected item and set its image immediately
      const selectedItem = this.items.find(
        (item) => item[this.selectedField] === select,
      )

      if (selectedItem) {
        this.setImgUrl(selectedItem)
      }
    },
    onInput(event) {
      if (!event) return this.clearSearch()

      if (this.search && this.search.length >= 3) {
        this.isShownDropDown = true
        this.getData()
      } else {
        this.isShownDropDown = false
        this.clearSearch()
      }

      return undefined
    },
    onKeyup(event) {
      if (event.code === 'ArrowDown') {
        this.isKeyupArrowDown = true
      }
    },
    async getData() {
      this.isLoading = true
      const response = await getDataFromApi(
        this.selectedApi,
        this.search,
        this.pageSize,
        this.currentPage,
      )
      const items = response?.results
      if (items) {
        this.items = items
        this.totalPages = response.pages || 1
        if (items.length > 0) {
          this.selectedName = items[0].name
          this.onSelect(items[0].name)
        }
      }
      this.isLoading = false
    },
    onPageChange(page) {
      this.clearSearch()
      this.currentPage = page
      this.getData()
    },
    setImgUrl(item) {
      // The new API provides image path directly in the response
      if (item && item.image) {
        // Use the direct path from the API response
        this.imgURL = `${RESOURCE_URL}/${item.image}`
      } else {
        // Fallback to placeholder
        this.imgURL = IMG_PLACEHOLDER
      }
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
      // this.items = []
      this.timeout = null
      this.clearImgUrl() // Clear image when completely clearing search
    },
  },
}
</script>

<style>
@import 'form.scss';
</style>
