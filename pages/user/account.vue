<template>
  <v-row align="center" justify="center">
    User Account
  </v-row>
</template>

<script>
export default {
  middleware:'auth',
  layout: 'dashboard',
  head(){
    return {
      title: 'Akun Saya'
    }
  }
}
</script>

<style>

</style>
