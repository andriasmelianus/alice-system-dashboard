<template>
  <v-row
    align="center"
    justify="center"
  >
    <chart1 />
  </v-row>
</template>

<script>
import Chart1 from '~/components/report/chart/chart1'
export default {
  middleware: 'auth',
  layout: 'dashboard',
  head() {
    return {
      title: 'Dashboard'
    }
  },

  components: {
    Chart1
  }
}
</script>

<style>

</style>
