<template>
  <div class="d-flex justify-center">
    <v-dialog
      v-model="dialog"
      :max-width="$vuetify.breakpoint.smAndDown ? '100%' : 560"
    >
      <v-card>
        <v-card-title class="text-h5">
          {{ result?.name || result?.title || 'Details' }}
        </v-card-title>
        <v-card-text>
          <pre class="result">{{ formattedResult }}</pre>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="gray darken-1"
            text
            v-text="'OK'"
            @click="dialog = false"
            @keyup="dialog = false"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  computed: {
    formattedResult() {
      return JSON.stringify(this.result, null, 2)
    },
  },
  name: 'AppDialog',
  props: {
    result: {
      type: Object,
      default: () => {},
    },
    isDialogShow: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    dialog(value) {
      this.$emit('dialog', value)
    },
    isDialogShow(value) {
      this.dialog = value
    },
  },
  data: () => ({
    dialog: false,
  }),
}
</script>

<style>
.v-dialog {
  margin: 0 !important;
}

.result {
  max-height: clamp(30vh, 50vh, 70vh);
  overflow: auto;
}
</style>
