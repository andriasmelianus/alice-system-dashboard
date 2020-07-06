<template>
  <div>
    <page-title>Manajemen Data Pengguna</page-title>

    <div class="d-flex flex-wrap">
      <v-card max-width="800px" :class="componentClass">
        <!-- JUDUL CARD -->
        <v-card-title>Pengguna</v-card-title>
        <!-- SUB-JUDUL CARD -->
        <v-card-subtitle>Anda dapat mengelola data pengguna yang terdapat pada perusahaan Anda. Halaman ini memungkinkan Anda untuk menambah, mengubah dan menghapus data pengguna. Selain itu Anda juga dapat mereset password pengguna apabila pengguna yang bersangkutan lupa password.</v-card-subtitle>

        <user-table @recordSelected="userRecordSelected"></user-table>
      </v-card>

      <v-card max-width="400px" :class="componentClass" :disabled="!roleTableEnabled">
        <v-card-title>Role</v-card-title>
        <v-card-subtitle>Role menentukan peran seorang pengguna dan hak-haknya di dalam sistem. Mohon berhati-hati dalam menambahkan role kepada pengguna untuk menghindari pemberian hak yang seharusnya tidak dimiliki seorang pengguna.</v-card-subtitle>

        <role-user-table :filter-details="roleFilterDetails"></role-user-table>
      </v-card>
    </div>
  </div>
</template>

<script>
import { permissionCheck } from "~/components/_mixin/permission-check";
import PageTitle from "~/components/_dashboard/title";
import UserTable from "~/components/user/table/default";
import RoleUserTable from "~/components/role/table/role-user";
export default {
  middleware: "auth",
  mixins: [permissionCheck],
  layout: "dashboard",
  head() {
    return {
      title: "Data Pengguna"
    };
  },
  components: {
    PageTitle,
    UserTable,
    RoleUserTable
  },

  mounted() {},

  data: () => ({
    permissionRequired: "read-user",
    componentClass: "my-2 mx-1 align-self-start",

    roleTableEnabled: false,
    roleFilterDetails: {}
  }),

  methods: {
    userRecordSelected(context) {
      let vm = this;
      if (context.value) {
        vm.roleFilterDetails = Object.assign({}, vm.roleFilterDetails, {
          column: "user_id",
          value: context.item.id
        });
        vm.roleTableEnabled = true;
        return;
      }
      vm.roleTableEnabled = false;
      vm.roleFilterDetails = {};
    }
  }
};
</script>

<style>
</style>
