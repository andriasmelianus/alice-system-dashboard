<template>

</template>

<script>
export default {
  middleware: 'auth',
  beforeMount(){
    this.$auth.logout();
  }
}
</script>

<style>

</style>
