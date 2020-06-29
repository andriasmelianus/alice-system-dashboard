<template>
  <v-card max-width="400" nuxt to="/company">
    <v-sheet
      class="v-sheet--offset mx-auto"
      color="orange"
      elevation="10"
      max-width="calc(100% - 32px)"
    >
      <v-sparkline :labels="labels" :value="value" color="white" line-width="2" padding="16"></v-sparkline>
    </v-sheet>

    <v-card-text class="pt-0">
      <div class="title font-weight-light mb-2">Perusahaan</div>

      <v-icon class="mr-2" small>mdi-clock</v-icon>
      <span class="text-caption grey--text font-weight-light">
        Total Penghasilan Perusahaan:
        <strong>Rp1.811.000</strong>
      </span>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    labels: ["Mei", "Jun", "Jul", "Agu", "Sep", "Nov"],
    value: [5, 10, 1, 9, 0, 1]
  })
};
</script>

<style>
.v-sheet--offset {
  top: -18px;
  position: relative;
}
</style>
