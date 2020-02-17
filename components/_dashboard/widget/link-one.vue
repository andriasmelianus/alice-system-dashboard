<template>
  <!--
    Widget berupa link nuxt yang mengantar user pada halaman dashboard.
    Cocok digunakan pada halaman dashboard
  -->
  <v-card hover nuxt to="/" max-width="250px">
    <v-list-item>
      <v-list-item-avatar>
        <v-icon dense x-large>mdi-gauge</v-icon>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>Dashboard</v-list-item-title>
        <v-list-item-subtitle>Tampilkan Dashboard</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
export default {};
</script>
