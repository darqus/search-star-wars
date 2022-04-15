<template>
  <div class="d-flex justify-center">
    <v-dialog
      v-model="dialog"
      :max-width="$vuetify.breakpoint.smAndDown ? '100%' : 560"
    >
      <v-card>
        <v-card-title class="text-h5" v-text="search" />
        <v-card-text>
          <pre class="result" v-text="result" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="gray darken-1" text @click="dialog = false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    search: {
      type: String,
      default: '',
    },
    result: {
      type: String,
      default: '',
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

.theme--dark.v-card {
  color: #fff;
  background-color: rgb(30 30 30 / 0.4) !important;
}

.theme--light.v-card {
  color: rgb(0 0 0 / 87%);
  background-color: rgb(255 255 255 / 0.4) !important;
}
</style>
