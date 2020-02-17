<template>
  <v-footer padless color="primary lighten-1" elevation="6">
    <v-row justify="center" no-gutters>
      <v-btn text rounded color="white" class="my-1" nuxt to="/">Dashboard</v-btn>
      <v-btn text rounded color="white" class="my-1" nuxt to="/help/howto">Bantuan</v-btn>
      <v-btn text rounded color="white" class="my-1" nuxt to="/help/about">Tentang</v-btn>

      <v-col
        cols="12"
        class="text-center py-1 primary lighten-2 white--text"
      >Copyright {{ appName }} &copy; 2019</v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    appName: process.env.appName
  })
};
</script>
