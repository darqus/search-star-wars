<template>
  <v-select
    :items="items"
    item-text="name"
    item-value="name"
    :menu-props="{ auto: true, offsetY: true }"
    class="select"
    :label="`Selected ${selectedApi}`"
    dense
    v-model="localSelectedName"
    @change="onSelect"
  />
</template>

<script>
export default {
  name: 'SelectControl',
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    selectedApi: {
      type: String,
      default: '',
    },
    selectedName: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      localSelectedName: this.selectedName || '',
    }
  },
  watch: {
    selectedName(val) {
      this.localSelectedName = val
    },
  },
  methods: {
    onSelect() {
      this.$emit('select', this.localSelectedName)
    },
  },
}
</script>
