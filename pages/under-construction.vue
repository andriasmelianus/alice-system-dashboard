<template>
  <v-row justify="center">
    <h3>Segera datang...</h3>
    <p>Mohon maaf, halaman ini masih belum dapat diakses karena masih dalam masa pembuatan.</p>
  </v-row>
</template>

<script>
export default {
  middleware:'auth',
  layout: 'dashboard',
  head() {
    return {
      title: '<<< under construction >>>'
    }
  }
}
</script>

<style>

</style>
