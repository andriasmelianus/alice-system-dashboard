<template>
  <v-app id="inspire">
    <!-- HEADER aplikasi -->
    <dashboard-bar></dashboard-bar>
    <!-- HEADER aplikasi -->

    <!-- Isi setiap halaman/route -->
    <v-content>
      <!-- Bagian router-view untuk setiap pages -->
      <nuxt />
    </v-content>

    <dashboard-footer></dashboard-footer>

    <global-notification></global-notification>
  </v-app>
</template>

<script>
import DashboardBar from "~/components/_dashboard/bar/default";
import DashboardFooter from "~/components/_dashboard/footer";
import GlobalNotification from "~/components/global-notification";
export default {
  props: {
    source: String
  },

  components: {
    DashboardBar,
    DashboardFooter,
    GlobalNotification
  }
};
</script>
