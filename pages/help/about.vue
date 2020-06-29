<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <div style="max-width:600px;">
        <div class="text-h1 font-weight-thin">{{ title }}</div>
        <div class="text-body-2">{{ description }}</div>
        <div class="text-overline">Copyright {{ title }} &copy; 2019</div>
      </div>
    </v-row>
  </v-container>
</template>

<script>
export default {
  middleware: "auth",
  layout: "dashboard",
  head() {
    return {
      title: "Tentang"
    };
  },

  data: () => ({
    title: process.env.appName,
    description: process.env.appDescription
  })
};
</script>

<style>
</style>
