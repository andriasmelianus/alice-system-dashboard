<template>
  <v-row align="center" justify="center">

  </v-row>
</template>

<script>
export default {
  middleware: 'auth',
  layout: 'dashboard',
  head() {
    return {
      title: 'Tentang ' + this.title
    }
  },

  data: () => ({
    title: process.env.appName
  })
}
</script>

<style>

</style>
