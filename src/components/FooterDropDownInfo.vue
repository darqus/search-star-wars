<template>
  <v-menu
    top
    offset-y
    :close-on-click="closeOnClick"
  >
    <template v-slot:activator="{ on, attrs }">
      <a
        v-bind="attrs"
        v-on="on"
        v-text="'SkyNet'"
      />
    </template>

    <v-list style="opacity: 0.5;">
      <v-list-item>
        <v-list-item-title><small v-html="info" /></v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
const INFO = [
  process.env.VUE_APP_VERSION,
  process.env.VUE_APP_BUILD_DATA
]

export default {
  name: 'FooterDropDownInfo',
  data: () => ({
    info: [`version: ${INFO[0]}`, `build: ${INFO[1]}`].join('<br>'),
  }),
}
</script>
