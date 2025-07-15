<template>
  <div style="position: relative">
    <v-text-field
      v-model="localSearch"
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
      :search="localSearch"
      :selected-api="selectedApi"
      :selected-field="'name'"
      :is-keyup-arrow-down="false"
      @select="onSelect"
      @reset="() => {}"
    />
  </div>
</template>

<script>
import DropList from '@/components/DropList.vue'

export default {
  name: 'SearchField',
  components: { DropList },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    selectedApi: {
      type: String,
      default: '',
    },
    isLoading: Boolean,
    search: {
      type: String,
      default: '',
    },
    isShownDropDown: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      localSearch: this.search || '',
    }
  },
  watch: {
    search(val) {
      this.localSearch = val
    },
  },
  methods: {
    onInput(event) {
      this.localSearch = event
      this.$emit('search-input', this.localSearch)
    },
    onKeyup() {
      // Можно добавить обработку стрелок, если потребуется
    },
    onSelect(name) {
      this.$emit('select', name)
    },
  },
}
</script>
