<template>
  <v-dialog v-model="show" width="520" persistent>
    <v-card>
      <v-card-title class="text-h6 font-weight-light red--text">Tidak Punya Hak</v-card-title>
      <v-card-text class="font-weight-light">
        Entah apa yang merasuki Anda!
        <br />Mohon maaf, tapi Anda tidak memiliki hak untuk mengakses halaman ini.
        Segera kembali ke dashboard Anda dan buka halaman yang sesuai dengan akses yang diberikan kepada Anda.
      </v-card-text>

      <v-card-actions>
        <v-btn color="success" @click="backToDashboard" nuxt to="/">Keluarkan saya dari sini!</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  computed: {
    show: {
      get() {
        return this.$store.state.preventAccess.isShown;
      },
      set(isShown) {
        this.$store.commit("preventAccess/hide");
      }
    }
  },

  methods: {
    backToDashboard() {
      this.$store.commit("preventAccess/hide");
    }
  }
};
</script>
