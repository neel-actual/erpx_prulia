<template>
  <v-container v-if="currentBanner">
    <v-row class="dusk"
      ><v-img
        max-height="450px"
        position="start center"
        :src="currentBanner.image"
    /></v-row>
    <v-row class="primary">
      <v-col cols="12" class="pb-0 white--text">
        <h2>{{ currentBanner.banner_name }}</h2>
      </v-col>
    </v-row>
    <v-row justify="center" class="vanilla pb-12">
      <v-col>
        <v-fade-transition>
          <div
            style="width: 100%"
            v-if="currentBanner.content"
            v-html="currentBanner.content"
          ></div>
        </v-fade-transition>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import isEqual from 'lodash/isEqual'

export default {
  name: 'SmartPartnerDetails',
  computed: {
    ...mapGetters('smartPartners', ['all']),
    currentBanner() {
      return this.all.find(banner =>
        isEqual(this.$route.params.id, banner.name)
      )
    }
  },
  mounted() {
    if (!this.loaded) {
      this.$store.dispatch('smartPartners/load')
    }
  }
}
</script>

<style scoped></style>
