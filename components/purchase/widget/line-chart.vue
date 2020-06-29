<template>
  <v-card max-width="400" nuxt to="/purchase">
    <v-sheet
      class="v-sheet--offset mx-auto"
      color="green"
      elevation="10"
      max-width="calc(100% - 32px)"
    >
      <v-sparkline :labels="labels" :value="value" color="white" line-width="2" padding="16"></v-sparkline>
    </v-sheet>

    <v-card-text class="pt-0">
      <div class="text-subtitle-1 font-weight-light mb-2">Pembelian</div>

      <v-icon class="mr-2" small>mdi-clock</v-icon>
      <span class="text-caption grey--text font-weight-light">
        Total pembelian bulan ini:
        <strong>Rp12.380.000</strong>
      </span>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    labels: ["Mei", "Jun", "Jul", "Agu", "Sep", "Nov"],
    value: [67, 102, 91, 30, 5, 10]
  })
};
</script>

<style>
.v-sheet--offset {
  top: -18px;
  position: relative;
}
</style>
