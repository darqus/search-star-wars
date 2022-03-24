<template>
  <v-card v-if="filteredItems.length">
    <v-list>
      <v-list-item-group>
        <v-list-item
          @click="$emit('select', name)"
          v-for="({ name }, i) in filteredItems"
          :key="i"
        >
          <v-list-item-content>
            <v-list-item-title v-text="name"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: 'DropList',
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
}
</script>
