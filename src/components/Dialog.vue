<template>
  <div class="d-flex justify-center">
    <v-dialog
      v-model="dialog"
      :max-width="$vuetify.breakpointsmAndDown ? 290 : 560"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          :color="
            $vuetify.theme.dark ? 'secondary darken-1' : 'primary lighten-1'
          "
          :dark="$vuetify.theme.dark"
          v-bind="attrs"
          v-on="on"
          v-text="search"
        />
      </template>
      <v-card>
        <v-card-title class="text-h5" v-text="search" />
        <v-card-text>
          <pre v-text="result" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="gray darken-1" text @click="dialog = false"> OK </v-btn>
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
  },
  data: () => ({
    dialog: false,
  }),
}
</script>

<style>
pre {
  max-width: clamp(50vh, 60vh, 70vh);
  max-height: clamp(50vh, 60vh, 70vh);
  overflow: auto;
}
</style>
