<template>
  <v-snackbar bottom right :value="updateExists" :timeout="-1" color="primary">
    An update is available
    <v-btn text @click="refreshApp">Update</v-btn>
  </v-snackbar>
</template>

<script>
import update from '@/mixins/update'

export default {
  name: 'Refresh',
  mixins: [update],
}
</script>
