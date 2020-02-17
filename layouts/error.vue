<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <div style="max-width: 600px;">
        <!-- 404 Error -->
        <div v-if="error.statusCode === 404" class="text-center">
          <div class="display-3">{{ pageNotFound }}</div>
          <div
            class="caption"
          >Halaman yang anda cari tidak dapat ditemukan. Mohon periksa kembali link yang Anda masukkan.</div>
        </div>
        <!-- Other Errro -->
        <div class="text-center" v-else>
          <div class="display-3">{{ otherError }}</div>
          <div class="caption">
            Ada kesalahan teknis pada halaman ini.
            <br />Tidak ada yang dapat Anda lakukan kecuali melaporkan kejadian ini kepada pemilik website.
          </div>
        </div>

        <div class="d-flex flex-wrap justify-center">
          <dashboard-link class="ma-2 align-self-start"></dashboard-link>
          <logout-link class="ma-2 align-self-start"></logout-link>
        </div>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import DashboardLink from "~/components/_dashboard/widget/link-one";
import LogoutLink from "~/components/_other/widget/link-to-logout";
export default {
  layout: "dashboard",
  components: {
    DashboardLink,
    LogoutLink
  },

  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title
    };
  },
  data() {
    return {
      pageNotFound: ".:: 404 ::.",
      otherError: ".:: Kesalahan Teknis ::."
    };
  }
};
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
