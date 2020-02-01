<template>
  <v-container fluid class="fill-height">
    <v-row justify="center" align="center">
      <v-col class="text-center">
        <div class="display-2">Dalam Pembangunan</div>
        <p
          class="caption"
        >Mohon maaf, halaman ini masih belum dapat diakses karena masih dalam masa pembangunan.</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  middleware: "auth",
  layout: "dashboard",
  head() {
    return {
      title: "<<< under construction >>>"
    };
  }
};
</script>

<style>
</style>
