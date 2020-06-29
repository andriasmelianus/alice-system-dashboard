<template>
  <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark>
    <v-toolbar-title style="width: 300px">
      <v-chip class="text-h5 font-weight-light" nuxt to="/" outlined large>{{ appName }}</v-chip>
    </v-toolbar-title>

    <!-- <v-text-field
      flat
      solo-inverted
      hide-details
      prepend-inner-icon="mdi-magnify"
      label="Search"
      class="hidden-sm-and-down"
    />-->
    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>mdi-apps</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-bell</v-icon>
    </v-btn>

    <user-menu-bar></user-menu-bar>
  </v-app-bar>
</template>

<script>
import UserMenuBar from "~/components/user/menu/bar";
export default {
  components: {
    UserMenuBar
  },

  data: () => ({
    appName: process.env.appName
  })
};
</script>
