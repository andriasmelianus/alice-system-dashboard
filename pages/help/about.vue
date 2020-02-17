<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <div style="max-width:600px;">
        <div class="display-4 font-weight-thin">{{ title }}</div>
        <div class="font-weight-light">{{ description }}</div>
        <div class="overline">Copyright {{ title }} &copy; 2019</div>
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
