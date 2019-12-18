<template>
  <v-row align="center" justify="center">
    Data user
  </v-row>
</template>

<script>
export default {
  middleware: 'auth',
  layout: 'dashboard',
  head(){
    return {
      title: 'Data Pengguna'
    }
  }
}
</script>

<style>

</style>
