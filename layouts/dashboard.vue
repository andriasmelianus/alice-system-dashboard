<template>
  <v-app id="inspire">
    <!-- NAVIGASI aplikasi -->
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <alice-navigation></alice-navigation>
    </v-navigation-drawer>
    <!-- NAVIGASI aplikasi -->


    <!-- HEADER aplikasi -->
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
    >
      <!--
        Section ini tidak dapat dipisahkan dengan layout/dashboard,
        karena section ini berfungsi sebagai switch tampil/sembunyi menu.
      -->
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-4"
      >
        <span class="hidden-sm-and-down">Alice System</span>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
        class="hidden-sm-and-down"
      />
      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>

      <user-menu></user-menu>

    </v-app-bar>
    <!-- HEADER aplikasi -->


    <!-- Isi setiap halaman/route -->
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <!-- Bagian router-view untuk setiap pages -->
        <nuxt />
      </v-container>
    </v-content>


    <!-- <v-btn
      bottom
      color="pink"
      dark
      fab
      fixed
      right
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn> -->
  </v-app>
</template>

<script>
  import UserMenu from '~/components/_dashboard/header/user-menu'
  import AliceNavigation from '~/components/_dashboard/navigation/index'
  export default {
    props: {
      source: String,
    },

    components: {
      UserMenu,
      AliceNavigation
    },
    data: () => ({
      appName: process.env.appName,
      drawer: true,
    }),
  }
</script>
