<template>
  <v-card>
    <v-list>
      <v-list-item-group>
        <v-list-item
          @click="$emit('select', item.name)"
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-item-content>
            <v-list-item-title v-text="item.name"></v-list-item-title>
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
  },
  /* data: () => ({
    items: [
      {
        text: 'Inbox',
      },
      {
        text: 'Star',
      },
      {
        text: 'Send',
      },
      {
        text: 'Drafts',
      },
    ],
  }), */
}
</script>
