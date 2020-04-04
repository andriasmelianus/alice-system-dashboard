<template>
  <div>
    <div class="mt-4 mx-9">
      <div class="display-1 text-center">Manajemen Data Pengguna</div>
    </div>

    <div class="d-flex flex-wrap justify-center">
      <v-card max-width="900px" :class="componentClass">
        <v-card-title>Pengguna</v-card-title>
        <v-card-subtitle>Daftar pengguna yang dapat mengakses sistem. Anda dapat mengelola role yang melekat pada seorang user.</v-card-subtitle>

        <user-table @recordSelected="userRecordSelected"></user-table>
      </v-card>

      <v-card max-width="400px" :class="componentClass" :disabled="!roleTableEnabled">
        <v-card-title>Role</v-card-title>
        <v-card-subtitle>Role di bawah ini merupakan role yang dimiliki pengguna yang sedang dipilih pada tabel di samping. Seorang user dapat memiliki lebih dari satu role.</v-card-subtitle>

        <role-user-table :filter-details="roleFilterDetails"></role-user-table>
      </v-card>
    </div>
  </div>
</template>

<script>
import UserTable from "~/components/user/table/default";
import RoleUserTable from "~/components/role/table/role-user";
export default {
  layout: "dashboard",
  components: {
    UserTable,
    RoleUserTable
  },
  data: () => ({
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
