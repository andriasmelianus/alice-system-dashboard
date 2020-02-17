<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Data Pengguna</v-card-title>
          <v-card-subtitle>Pada halaman ini Anda dapat mengelola data pengguna yang terdaftar pada perusahaan yang sedang aktif terpilih.</v-card-subtitle>

          <v-card-text>
            <v-btn color="success">Tambah</v-btn>
            <v-btn color="warning" v-if="userDataSelected.length > 0">Ubah</v-btn>
            <v-btn color="error" v-if="userDataSelected.length > 0">Hapus</v-btn>
          </v-card-text>

          <v-data-table
            show-select
            single-select
            v-model="userDataSelected"
            :headers="userDataHeaders"
            :items="userData"
          ></v-data-table>
        </v-card>
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
      title: "Data Pengguna"
    };
  },

  mounted() {},

  data: () => ({
    userDataHeaders: [
      { text: "Pengguna", value: "name" },
      { text: "Username", value: "username" },
      { text: "Username", value: "username" }
    ],
    userData: undefined,
    userDataSelected: []
  })
};
</script>

<style>
</style>
