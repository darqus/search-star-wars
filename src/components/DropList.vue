<template>
  <v-card v-if="filteredItems.length && search">
    <v-list>
      <v-list-item-group>
        <v-list-item
          v-for="(item, i) in filteredItems"
          :key="i"
          :ref="['sa', i].join('-')"
          dense
          @click="$emit('select', item[selectedField])"
        >
          <v-list-item-content>
            <HighlightSearch :search="getSearch(item[selectedField])" />
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
import { getHighlightedStringFromPhrase, isMatchesStringFromPhrase } from '@/utils/transformData'
import HighlightSearch from './HighlightSearch.vue'

const LIMIT_AUTOCOMPLETE_ITEMS = 5

export default {
  name: 'DropList',
  components: {
    HighlightSearch,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    selectedApi: {
      type: String,
      default: '',
    },
    selectedField: {
      type: String,
      default: '',
    },
    search: {
      type: String,
      default: '',
    },
    isKeyupArrowDown: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    filteredItems() {
      const { items, selectedField, search } = this

      return items
        .filter((item) => isMatchesStringFromPhrase(item[selectedField], search))
        .filter((it, idx) => idx < LIMIT_AUTOCOMPLETE_ITEMS)
    },
  },
  watch: {
    isKeyupArrowDown() {
      this.onDropDown()
    },
  },
  methods: {
    getSearch(phrase) {
      return getHighlightedStringFromPhrase(phrase, this.search)
    },
    onDropDown() {
      this.$nextTick(() => {
        this.$refs['sa-0'][0].$el.focus()
        this.$emit('reset')
      })
    },
  },
}
</script>
