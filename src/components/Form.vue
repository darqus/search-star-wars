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
      <v-col cols="12" xs="12" sm="6">
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
      <!-- <v-col cols="12" xs="12" sm="4">
        <v-select
          v-model="selectedField"
          :items="selectedFields"
          :menu-props="{ auto: true, offsetY: true }"
          label="Selected Field"
          dense
        />
      </v-col> -->
      <v-col cols="12" xs="12" sm="6" style="position: relative">
        <v-text-field
          v-model="search"
          :label="`Search ${selectedApi}`"
          :loading="isLoading"
          clearable
          dense
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
        <template v-if="items.length && result !== defaultResult">
          <template v-if="imgURL">
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
            <Dialog
              class="my-5"
              :search="search"
              :result="result"
              :is-dialog-show="isDialogShow"
              @dialog="onDialog"
            />
          </template>
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

const INPUT_DELAY = 500

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
  computed: {
    result() {
      const { items, selectedField, search } = this

      if (!items.length) {
        this.clearResult()
        return ''
      }

      const foundSelected = items.find(
        (item) => item[selectedField] === search,
      )

      if (!foundSelected) {
        this.clearImgUrl()
        return ''
      }

      this.setImgUrl(foundSelected)

      const result = createJSON(foundSelected)

      return result
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
        ({ api }) => api === this.selectedApi,
      ).searchFields

      const selectedField = searchField[0]

      this.selectedField = selectedField

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
      this.timeout = setTimeout(() => this.getData(), INPUT_DELAY)

      return this.timeout
    },
    onKeyup(event) {
      if (event.code === 'ArrowDown') {
        this.isKeyupArrowDown = true
      }
    },
    async getData() {
      this.isLoading = true
      const response = await getDataFromApi(this.selectedApi, this.search)
      /* const items = IS_DEV
        ? RESULTS
        : response?.results */
      const items = response?.results
      if (items.length) {
        this.items = items
      }
      this.isLoading = false
    },
    setImgUrl(item) {
      // The new API provides image path directly in the response
      if (item && item.image) {
        // Remove "images/" prefix from the path for the /image/ endpoint
        const imagePath = item.image.replace(/^images\//, '')
        this.imgURL = `${RESOURCE_URL}/image/${imagePath}`
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
      this.items = []
      this.timeout = null
    },
  },
}
</script>

<style>
@import "form.scss"
</style>
