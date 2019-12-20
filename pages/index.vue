<template>
  <!-- <v-container class="fill-height" fluid> -->
  <v-container fluid>
    <v-row align="center" justify="center" dense>
      <v-col cols="4">
        <sale-chart></sale-chart>
      </v-col>

      <v-col cols="4">
        <purchase-chart></purchase-chart>
      </v-col>

      <v-col cols="4">
        <npl-chart></npl-chart>
      </v-col>

      <!-- <v-col cols="4">
        <chart1 height="130px" />
      </v-col> -->

    </v-row>

    <v-row >
      <v-col cols="8" sm="6">
        <customer-card></customer-card>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
import SaleChart from '~/components/_dashboard/chart/sale'
import PurchaseChart from '~/components/_dashboard/chart/purchase'
import NplChart from '~/components/_dashboard/chart/npl'
import Chart1 from '~/components/report/chart/chart1'

import CustomerCard from '~/components/_dashboard/card/customer'
export default {
  middleware: 'auth',
  layout: 'dashboard',
  head() {
    return {
      title: 'Dashboard'
    }
  },

  components: {
    SaleChart,
    PurchaseChart,
    NplChart,
    Chart1,

    CustomerCard
  }
}
</script>
