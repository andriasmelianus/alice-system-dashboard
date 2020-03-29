<template>
  <v-card>
    <v-card-title>Tambah Pengguna Baru</v-card-title>
    <v-card-subtitle>Pengguna yang anda tambahkan akan dapat mengakses menu-menu yang ada sesuai dengan role dan permission yang dimilikinya.</v-card-subtitle>

    <v-card-text>
      <v-form @submit.prevent="submitForm">
        <v-text-field
          v-model="record.username"
          :error-messages="recordError.username"
          @change="getUserNameByUsername"
          label="Username"
        ></v-text-field>

        <v-text-field v-model="userName" disabled label="Nama Pengguna"></v-text-field>

        <v-text-field v-model="record.title" label="Jabatan" :error-messages="recordError.title"></v-text-field>

        <v-btn type="submit" color="success">Tambahkan</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { userForm } from "~/components/user/_mixin/form-company-user";
export default {
  mixins: [userForm],

  data: () => ({
    userName: ""
  }),

  methods: {
    getUserNameByUsername() {
      let vm = this;
      vm.recordError = Object.assign({}, vm.recordError, vm.defaultRecordError);
      vm.$axios
        .$get(vm.$store.getters.apiUrl("/auth/user-by-username"), {
          params: {
            username: vm.record.username
          }
        })
        .then(function(result) {
          vm.userName = result.name;
          vm.record.user_id = result.id;
        })
        .catch(function(error) {
          vm.recordError = Object.assign(
            {},
            vm.recordError,
            error.response.data.error
          );
          vm.$store.commit("globalNotification/show", {
            color: "error",
            message: error
          });
        });
    }
  }
};
</script>
