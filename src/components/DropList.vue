<template>
  <v-card v-if="filteredItems.length && search">
    <v-list>
      <v-list-item-group>
        <v-list-item
          v-for="({ name }, i) in filteredItems"
          :key="i"
          @click="$emit('select', name)"
        >
          <v-list-item-content>
            <HighlightSearch :search="getSearch(name)" />
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
import { findMatch } from '@/utils/findMatch'
import HighlightSearch from './HighlightSearch.vue'

export default {
  name: 'DropList',
  components: {
    HighlightSearch,
  },
  props: {
    items: Array,
    search: String,
  },
  data: () => ({
    limit: 5,
  }),
  computed: {
    filteredItems() {
      return this.items.filter(
        ({ name }, idx) =>
          name.toLowerCase().startsWith(this.search.toLowerCase()) &&
          idx < this.limit
      )
    },
  },
  methods: {
    getSearch(string) {
      return findMatch(string, this.search)
    },
  },
}
</script>
