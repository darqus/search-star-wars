<template>
  <v-card v-if="filteredItems.length && search">
    <v-list>
      <v-list-item-group>
        <v-list-item
          v-for="(item, i) in filteredItems"
          :key="i"
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
import { findMatch } from '@/utils/findMatch'
import HighlightSearch from './HighlightSearch.vue'

const LIMIT = 5

export default {
  name: 'DropList',
  components: {
    HighlightSearch,
  },
  props: {
    items: Array,
    selectedApi: String,
    selectedField: String,
    search: String,
  },
  computed: {
    filteredItems() {
      const { items, selectedField, search } = this
      return items.filter((item, idx) => {
        const result =
          item[selectedField].toLowerCase().startsWith(search.toLowerCase()) &&
          idx < LIMIT

        return result
      })
    },
  },
  methods: {
    getSearch(string) {
      return findMatch(string, this.search)
    },
  },
}
</script>
