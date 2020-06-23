<template>
  <v-app id="inspire">
    <!-- HEADER aplikasi -->
    <dashboard-bar></dashboard-bar>
    <!-- HEADER aplikasi -->

    <!-- Isi setiap halaman/route -->
    <v-main>
      <!-- Bagian router-view untuk setiap pages -->
      <nuxt />
    </v-main>

    <dashboard-footer></dashboard-footer>

    <!-- Snackbar (notifikasi balon) yang mampu tampil di setiap halaman melalui Vuex -->
    <global-notification></global-notification>
    <!-- Modal untuk mencegah user mengakses halaman yang tidak dapat ditutup kecuali menuju dashboard -->
    <prevent-access></prevent-access>
  </v-app>
</template>

<script>
import DashboardBar from "~/components/_dashboard/bar/default";
import DashboardFooter from "~/components/_dashboard/footer";
import GlobalNotification from "~/components/_other/global-notification";
import PreventAccess from "~/components/_other/prevent-access";
export default {
  props: {
    source: String
  },

  components: {
    DashboardBar,
    DashboardFooter,
    GlobalNotification,
    PreventAccess
  }
};
</script>
